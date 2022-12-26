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
    setEmployeeEmptyValues,
    setEmployeeItemSendInfo,
    setEmployeesData,
} from '../../redux/actions/employeeActions';
import { connect } from 'react-redux';
import CircleImageComponent from '../circleImageComponent/CircleImageComponent';
import TopButtons from '../topButtons/TopButtons';
import { useMediaQuery } from 'react-responsive';
import EmployeeItemTab from './employeeItemTab/EmployeeItemTab';
import EmployeeModal from '../employeeModal/EmployeeModal';

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
        stockPermissions,
        setEmployeeEmptyValues,
    } = props;

    const [employeeImage, setEmployeeImage] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
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
                if (data.divisions && data.divisions.length) {
                    data.divisions = data.divisions.map((d) => {
                        return { value: d.id, label: d.name };
                    });
                }
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
                    qrClientCardShareAccess,
                    syncAccess,
                    productAnalyzeAccess,
                    barcodePrintAccess,
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
                    qrClientCardShareAccess,
                    syncAccess,
                    productAnalyzeAccess,
                    barcodePrintAccess,
                };
                setEmployeeItemSendInfo(tempSendInfo);
            }
        );
    };

    useEffect(() => {
        if (id && id !== '0') {
            setEmployeeItemSendInfo({
                id: '',
                role: '',
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                phoneNumber: '',
                divisions: '',
                active: true,
                syncAccess: false,
                productAnalyzeAccess: false,
                qrClientCardShareAccess: false,
                barcodePrintAccess: false,
                tigerEmployeeId: 'def',
            });
            fetchEmployeeId();
        }
        return () => {
            setEmployeeEmptyValues([]);
        };
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
    const emptyTranslate = (emptyValue) => {
        switch (emptyValue) {
            case 'role':
                return 'Wezipesi';
            case 'firstName':
                return 'Ady';
            case 'lastName':
                return 'Familýasy';
            case 'userName':
                return 'Ulanyjy ady';
            case 'email':
                return 'E-poçta';
            case 'phoneNumber':
                return 'Telefon nomeri';
            case 'divisions':
                return 'Bölümi';
            default:
                return emptyValue;
        }
    };
    const onEmployeeSaveClick = () => {
        console.log(employeeItemSendInfo);
        var tempEmployeeSendInfo = { ...employeeItemSendInfo };
        if (tempEmployeeSendInfo.divisions)
            tempEmployeeSendInfo.divisions = tempEmployeeSendInfo.divisions.map(
                (div) => {
                    return div.value;
                }
            );
        let emptyArrVal = [
            'role',
            'firstName',
            'lastName',
            'userName',
            'email',
            'phoneNumber',
            'divisions',
        ];
        emptyArrVal = emptyArrVal.filter((val) =>
            val === 'divisions'
                ? !employeeItemSendInfo.divisions.length
                : employeeItemSendInfo[val] === ''
        );
        setEmployeeEmptyValues(emptyArrVal);
        if (emptyArrVal.length) {
            notification(
                `Boş ýerleri dolduruň : ${emptyArrVal
                    .map((v) => emptyTranslate(v))
                    .join(', ')}`
            );
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
                    formData.append(key, `[${tempEmployeeSendInfo[key]}]`);
                } else {
                    formData.append(key, employeeItemSendInfo[key]);
                }
            }
            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/employees/${
                        id === '0' ? '' : id
                    }`,
                    notifyMessage: 'Çalışan bilgileri kaydediliyor...',
                    updateMessage: 'Çalışan bilgileri kaydedildi',
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
        stockPermissions.forEach((stock, i) => {
            depoSend.push({ nr: stock.nr, type: stock.type, priority: i + 1 });
        });
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/employees/${id}/stockPermission`,
                notifyMessage: 'Yetkiler kaydediliyor...',
                updateMessage: 'Yetkiler kaydedildi',
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
            <EmployeeModal renderedIn="employee" />

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
        stockPermissions: state.stockPermissions.stockPermissions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeesData: (data) => dispatch(setEmployeesData(data)),
        setEmployeeData: (value) => dispatch(setEmployeeData(value)),
        setEmployeeEmptyValues: (value) =>
            dispatch(setEmployeeEmptyValues(value)),
        setEmployeeItemSendInfo: (value) =>
            dispatch(setEmployeeItemSendInfo(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItem);
