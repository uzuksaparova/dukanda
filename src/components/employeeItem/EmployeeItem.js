import React, { useEffect, useState, useRef } from 'react';
import './employeeItem.scss';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import {
    BACKEND_URL,
    deleteForAdmin,
    fetchForAdmin,
    fetchForAdminWithUpdateToast,
    notification,
    roleTranslator,
} from '../../functions';
import {
    setEmployeeData,
    setEmployeeItemSendInfo,
    setEmployeesData,
} from '../../redux/actions/employeeActions';
import { connect } from 'react-redux';
import CircleImageComponent from '../circleImageComponent/CircleImageComponent';
import TopButtons from '../topButtons/TopButtons';
import { useMediaQuery } from 'react-responsive';
import EmployeeItemTab from './employeeItemTab/EmployeeItemTab';

var token = Cookies.get('admin_token');
var bearer = 'Bearer ' + token;

function EmployeeItem(props) {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });
    const addEmployeeImageClickReferencing = () => {
        employeeImageRef.current.click();
    };

    const { id } = useParams();
    const {
        setEmployeeData,
        employeeData,
        isSidebarOpen,
        setEmployeesData,
        employeesData,
        employeeItemSendInfo,
        setEmployeeItemSendInfo,
        stockPermissionsSend,
    } = props;

    const [employeeImage, setEmployeeImage] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [divisionCheckbox, setDivisionCheckbox] = useState([]);
    const employeeImageRef = useRef(null);

    const fetchEmployeeId = (iddd = id, add) => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/employees/${iddd}`,
                method: 'GET',
            },
            (data) => {
                setEmployeeData({ ...data });
                setEmployeeImage({ local: false, image: data.image, send: '' });
                const {
                    id,
                    role,
                    firstName,
                    lastName,
                    userName,
                    email,
                    phoneNumber,
                    divisions,
                    active,
                    tigerEmployeeId,
                } = data;
                var tempSendInfo = {
                    id,
                    role,
                    firstName,
                    lastName,
                    userName,
                    email,
                    phoneNumber,
                    divisions,
                    active,
                    tigerEmployeeId,
                };
                setEmployeeItemSendInfo(tempSendInfo);
                if (add === 'add') {
                    setEmployeesData({
                        ...employeesData,
                        data: [...employeesData.data, data],
                    });
                }
                if (add === 'update') {
                    var tempAdminEmployeeInfo = employeesData.data;
                    tempAdminEmployeeInfo = tempAdminEmployeeInfo.map((emp) => {
                        if (emp.id === employeeItemSendInfo.id) {
                            return data;
                        } else {
                            return emp;
                        }
                    });
                    setEmployeesData({
                        ...employeesData,
                        data: tempAdminEmployeeInfo,
                    });
                }
            }
        );
    };

    useEffect(() => {
        id && id !== '0' && fetchEmployeeId();
    }, []);

    const employeeImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setEmployeeImage({
                local: true,
                send: url,
                image: file,
            });
        }
    };

    const onEmployeeSaveClick = () => {
        var trues = [];
        divisionCheckbox.forEach((w, i) => {
            if (Object.values(w)[0]) {
                trues.push(Number(Object.keys(w)[0]));
            }
        });
        var tempEmployeeSendInfo = employeeItemSendInfo;
        tempEmployeeSendInfo.divisions = trues;
        setEmployeeItemSendInfo({ ...tempEmployeeSendInfo });
        const {
            role,
            firstName,
            lastName,
            userName,
            email,
            phoneNumber,
            divisions,
        } = employeeItemSendInfo;
        if (
            !role ||
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !userName ||
            !divisions.length
        ) {
            notification('Açar sözünden başgasynyň doldurulmagy hökmany');
        } else {
            const formData = new FormData();
            if (employeeImage.local) {
                formData.append('image', employeeImage.image);
            }
            if (employeePassword !== '') {
                formData.append('userPassword', employeePassword);
            }
            for (var key in employeeItemSendInfo) {
                if (key === 'divisions') {
                    formData.append(key, `[${employeeItemSendInfo[key]}]`);
                } else {
                    formData.append(key, employeeItemSendInfo[key]);
                }
            }
            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/employees/${
                        id === '0' ? '' : id
                    }`,
                    notifyMessage: 'Saving...',
                    updateMessage: 'Saved',
                    body: formData,
                    headers: {
                        Authorization: bearer,
                    },
                    method: id === '0' ? 'POST' : 'PUT',
                },
                (data) => {
                    if (data !== 'err') {
                        if (!employeeItemSendInfo.id) {
                            fetchEmployeeId(data.data.id, 'add');
                        } else {
                            fetchEmployeeId(employeeItemSendInfo.id, 'update');
                        }
                    }
                }
            );
        }
        const depoSend = [];
        stockPermissionsSend.data.forEach((stock) => {
            depoSend.push({ nr: stock.nr, type: stock.type });
        });
        console.log(depoSend);
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/employees/${id}/stockPermission`,
                notifyMessage: 'Saving...',
                updateMessage: 'Saved',
                body: depoSend,
                headers: {
                    Authorization: bearer,
                },
                method: 'PUT',
            },
            (data) => {
                console.log('saved');
            }
        );
    };

    const handleResetClick = () => {
        setEmployeeImage({ local: true, image: '', send: '' });

        if (employeeItemSendInfo.id) {
            fetchEmployeeId(employeeItemSendInfo.id);
        } else {
            setEmployeeItemSendInfo({
                id: '',
                role: '',
                firstName: '',
                lastName: '',
                userName: '',
                userPassword: '',
                email: '',
                phoneNumber: '',
                divisions: [],
                active: true,
            });
        }
        setEmployeePassword('');
    };

    const handleEmployeeImageDeleteButton = () => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/employees/${employeeItemSendInfo.id}`,
                notifyMessage: 'Ulanyjy suraty pozulýar',
                updateMessage: 'Ulanyjy suraty pozuldy',
            },
            (data) => {
                var tempo = employeeImage;
                tempo.image = '';
                setEmployeeImage({ local: false, image: data.image, send: '' });

                var tempAdminEmployeeInfo = employeesData.data;
                tempAdminEmployeeInfo.forEach((emp, i) => {
                    if (emp.id === employeeItemSendInfo.id) {
                        tempAdminEmployeeInfo[i]['image'] = null;
                    }
                });
                setEmployeesData({
                    ...employeesData,
                    data: tempAdminEmployeeInfo,
                });
            }
        );
    };

    return (
        <div
            className={`employee-info
                ${isSidebarOpen ? ' sidebar-open ' : ''}`}
        >
            <div className="employee-header">
                {isMobileScreen ? null : (
                    <CircleImageComponent
                        imageObj={employeeImage}
                        handleImageChange={employeeImageChange}
                        handleImageDeletion={handleEmployeeImageDeleteButton}
                        imageRef={employeeImageRef}
                        disabledValue="updateEmployee"
                        type="employees"
                        handleButtonClick={addEmployeeImageClickReferencing}
                    />
                )}
                <div className="right-header">
                    <div className="top">{employeeData.fullName}</div>
                    <div className="bottom">
                        {roleTranslator(employeeData.role)}
                    </div>
                </div>
                <TopButtons
                    disabledValue="updateEmployee"
                    handleSaveButton={onEmployeeSaveClick}
                    handleResetButton={handleResetClick}
                    cancelPath="/employees"
                />
            </div>
            <EmployeeItemTab
                setDivisionCheckbox={setDivisionCheckbox}
                divisionCheckbox={divisionCheckbox}
                employeeImageRef={employeeImageRef}
                employeeImage={employeeImage}
                employeeImageChange={employeeImageChange}
                employeePassword={employeePassword}
                setEmployeePassword={setEmployeePassword}
                addEmployeeImageClickReferencing={
                    addEmployeeImageClickReferencing
                }
                handleEmployeeImageDeleteButton={
                    handleEmployeeImageDeleteButton
                }
            />

            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        employeeData: state.employeeData.employeeData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        employeesData: state.employeesData,
        employeeItemSendInfo: state.employeeItemSendInfo,
        stockPermissionsSend: state.stockPermissionsSend,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeesData: (data) => dispatch(setEmployeesData(data)),
        setEmployeeData: (value) => dispatch(setEmployeeData(value)),
        setEmployeeItemSendInfo: (value) =>
            dispatch(setEmployeeItemSendInfo(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItem);
