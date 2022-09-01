import React, { useEffect, useState, useRef } from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import './employeeItem.scss';
import { FaBuilding, FaPhone, FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { HiMail, HiOutlineBriefcase } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { BiRename } from 'react-icons/bi';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { AiOutlineSlack } from 'react-icons/ai';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import Chip from '@material-ui/core/Chip';
import { RiUser5Fill } from 'react-icons/ri';
import {
    BACKEND_URL,
    fetchForAdmin,
    fetchForAdminWithUpdateToast,
    notification,
    deleteForAdmin,
    roleTranslator,
    fetchEmployeesInfo,
} from '../../functions';
import {
    setEmployeeData,
    setEmployeesData,
} from '../../redux/actions/employeeActions';
import { connect } from 'react-redux';
import CircleImageComponent from '../circleImageComponent/CircleImageComponent';
import TopButtons from '../topButtons/TopButtons';
import { useMediaQuery } from 'react-responsive';
import AddImageComponent from '../addImageComponent/AddImageComponent';

var token = Cookies.get('admin_token');
var bearer = 'Bearer ' + token;

function EmployeeItem(props) {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

    const { id } = useParams();
    const {
        roles,
        setEmployeeData,
        employeeData,
        isSidebarOpen,
        setEmployeesData,
        employeesData,
    } = props;

    const [employeeInfoSend, setEmployeeInfoSend] = useState({
        id: '',
        role: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        divisions: [],
        active: true,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [divisionInfo, setDivisionInfo] = useState([]);
    const [employeeImage, setEmployeeImage] = useState('');
    const [employeePassword, setEmployeePassword] = useState('');
    const [divisionCheckbox, setDivisionCheckbox] = useState([]);
    const [chipDivisionNames, setChipDivisionNames] = useState([]);
    const [tigerEmployees, setTigerEmployees] = useState([]);
    const employeeImageRef = useRef(null);

    const addEmployeeImageClickReferencing = () => {
        employeeImageRef.current.click();
    };

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
                setEmployeeInfoSend(tempSendInfo);
                if (add === 'add') {
                    setEmployeesData({
                        ...employeesData,
                        data: [...employeesData.data, data],
                    });
                }
                if (add === 'update') {
                    var tempAdminEmployeeInfo = employeesData.data;
                    tempAdminEmployeeInfo = tempAdminEmployeeInfo.map((emp) => {
                        if (emp.id === employeeInfoSend.id) {
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
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/divisions`,
                method: 'GET',
            },
            (data) => {
                var tempDiv = [];
                data.forEach((div) => {
                    var obj = {};
                    obj[div.id] = false;
                    tempDiv.push(obj);
                });
                setDivisionCheckbox(tempDiv);
                setDivisionInfo(data);
            }
        );
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/employees/tiger`,
                method: 'GET',
            },
            (data) => {
                setTigerEmployees(data);
            }
        );
        if (!employeesData?.data.length) {
            fetchEmployeesInfo(true);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let tempDiv = divisionCheckbox;
        var chipNames = [];
        employeeInfoSend?.divisions?.forEach((d, i) => {
            chipNames.push(d.name);
            tempDiv.forEach((t, i) => {
                if (Number(d.id) === Number(Object.keys(t)[0])) {
                    t[d.id] = true;
                }
            });
        });
        setChipDivisionNames(chipNames);
        setDivisionCheckbox([...tempDiv]);
        // eslint-disable-next-line
    }, [employeeInfoSend.divisions, divisionInfo]);

    const handleEmployeeImageDeleteButton = () => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/employees/${employeeInfoSend.id}`,
                notifyMessage: 'Ulanyjy suraty pozulýar',
                updateMessage: 'Ulanyjy suraty pozuldy',
            },
            (data) => {
                var tempo = employeeImage;
                tempo.image = '';
                setEmployeeImage({ local: false, image: data.image, send: '' });

                var tempAdminEmployeeInfo = employeesData.data;
                tempAdminEmployeeInfo.forEach((emp, i) => {
                    if (emp.id === employeeInfoSend.id) {
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
        var tempEmployeeSendInfo = employeeInfoSend;
        tempEmployeeSendInfo.divisions = trues;
        setEmployeeInfoSend({ ...tempEmployeeSendInfo });
        const {
            role,
            firstName,
            lastName,
            userName,
            email,
            phoneNumber,
            divisions,
        } = employeeInfoSend;
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
            for (var key in employeeInfoSend) {
                if (key === 'divisions') {
                    formData.append(key, `[${employeeInfoSend[key]}]`);
                } else {
                    formData.append(key, employeeInfoSend[key]);
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
                        if (!employeeInfoSend.id) {
                            fetchEmployeeId(data.data.id, 'add');
                        } else {
                            fetchEmployeeId(employeeInfoSend.id, 'update');
                        }
                    }
                }
            );
        }
    };

    const handleResetClick = () => {
        setEmployeeImage({ local: true, image: '', send: '' });

        if (employeeInfoSend.id) {
            fetchEmployeeId(employeeInfoSend.id);
        } else {
            setEmployeeInfoSend({
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

    const handleDivisionChange = (e) => {
        var indexx = e.target.name.split(' ');
        var tempDivisionCheckbox = divisionCheckbox;
        tempDivisionCheckbox[indexx[0]][indexx[1]] = e.target.checked;
        setDivisionCheckbox([...tempDivisionCheckbox]);
        let tempChipIds = chipDivisionNames;
        e.target.checked
            ? !tempChipIds.includes(indexx[2]) && tempChipIds.push(indexx[2])
            : tempChipIds.splice(tempChipIds.indexOf(indexx[2]), 1);

        setChipDivisionNames(tempChipIds);
    };

    const employeeInputRow = (rowObj) => {
        const { leftName, leftIcon, rowType, inputType = 'text' } = rowObj;
        return (
            <div className="employee-one-row">
                <div className="left">
                    {leftIcon}
                    <span>{leftName}</span>
                </div>
                <div className="right">
                    <input
                        type={inputType}
                        placeholder={leftName}
                        value={employeeInfoSend[rowType]}
                        onChange={(e) =>
                            setEmployeeInfoSend({
                                ...employeeInfoSend,
                                [rowType]: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        );
    };

    const employeeSelectRow = (leftIcon, leftName, options, type) => {
        return (
            <div className="employee-one-row">
                <div className="left">
                    {leftIcon}
                    <span>{leftName}</span>
                </div>
                <div className="right">
                    {options.length ? (
                        <FormControl className="form-control">
                            <Select
                                placeholder="Işgär saylan"
                                code="demo-simple-select-outlined"
                                value={employeeInfoSend[type]}
                                onChange={(e) =>
                                    setEmployeeInfoSend({
                                        ...employeeInfoSend,
                                        [type]: e.target.value,
                                    })
                                }
                            >
                                {options.map((opt, i) => {
                                    return (
                                        <MenuItem
                                            value={
                                                type === 'role'
                                                    ? opt
                                                    : Number(opt.id)
                                            }
                                            key={i}
                                        >
                                            {type === 'role'
                                                ? roleTranslator(opt)
                                                : opt.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    ) : null}
                </div>
            </div>
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
                    <div className="bottom">{employeeData.role}</div>
                </div>
                <TopButtons
                    disabledValue="updateEmployee"
                    handleSaveButton={onEmployeeSaveClick}
                    handleResetButton={handleResetClick}
                    cancelPath="/employees"
                />
            </div>
            <div className="employee-body">
                {isMobileScreen ? (
                    <AddImageComponent
                        imageObj={employeeImage}
                        handleImageChange={employeeImageChange}
                        handleImageDeletion={handleEmployeeImageDeleteButton}
                        imageRef={employeeImageRef}
                        disabledValue="updateEmployee"
                        type="employees"
                        handleButtonClick={addEmployeeImageClickReferencing}
                    />
                ) : null}
                <div className="employee-one-row">
                    <div className="left">
                        <AiOutlineSlack className="employee-icon" />
                        <span>Aktiw</span>
                    </div>
                    <div className="right">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={employeeInfoSend.active}
                                    onChange={(e) =>
                                        setEmployeeInfoSend({
                                            ...employeeInfoSend,
                                            active: e.target.checked,
                                        })
                                    }
                                    name="active"
                                />
                            }
                            label="Aktiw"
                        />
                    </div>
                </div>
                {employeeInputRow({
                    leftName: 'Ady',
                    leftIcon: <BiRename className="employee-icon" />,
                    rowType: 'firstName',
                })}
                {employeeInputRow({
                    leftName: 'Familýasy',
                    leftIcon: <FaUser className="employee-icon" />,
                    rowType: 'lastName',
                })}
                {employeeInputRow({
                    leftName: 'Ulanyjy ady',
                    leftIcon: <FaUser className="employee-icon" />,
                    rowType: 'userName',
                })}
                {employeeInputRow({
                    leftName: 'E-mail',
                    leftIcon: <HiMail className="employee-icon" />,
                    rowType: 'email',
                    type: 'e-mail',
                })}
                {employeeInputRow({
                    leftName: 'Telefon',
                    leftIcon: <FaPhone className="employee-icon" />,
                    rowType: 'phoneNumber',
                    type: 'tel',
                })}

                <div className="employee-one-row">
                    <div className="left">
                        <RiLockPasswordFill className="employee-icon" />
                        <span>Açar sözi</span>
                    </div>
                    <div className="right password">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Açar sözi"
                            onChange={(e) =>
                                setEmployeePassword(e.target.value)
                            }
                            value={employeePassword}
                        />
                        <div className="info">
                            <IconButton
                                onClick={() =>
                                    setShowPassword(showPassword ? false : true)
                                }
                                className="password-eye"
                            >
                                {showPassword ? (
                                    <AiFillEyeInvisible />
                                ) : (
                                    <AiFillEye />
                                )}
                            </IconButton>
                            <Tooltip
                                title="Parolynyzy girizmeseniz parolynyz uytgemez"
                                placement="right"
                                className="tooltip"
                            >
                                <span>
                                    <BsFillInfoCircleFill />
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                {employeeSelectRow(
                    <RiUser5Fill className="employee-icon" />,
                    'Tigerdaky Işgär',
                    tigerEmployees,
                    'tigerEmployeeId'
                )}
                {employeeSelectRow(
                    <HiOutlineBriefcase className="employee-icon" />,
                    'Rol',
                    roles,
                    'role'
                )}

                <div className="employee-one-row">
                    <div className="left">
                        <FaBuilding className="employee-icon" />
                        <span>Bölüm</span>
                    </div>
                    <div className="right">
                        <FormControl className="form-control">
                            <Select
                                multiple
                                code="demo-simple-select-outlined"
                                value={['Bölüm']}
                                displayEmpty
                                label="Bölüm"
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>Placeholder</em>;
                                    }
                                    return selected.join(', ');
                                }}
                            >
                                {divisionInfo.length ? (
                                    divisionInfo.map((div, i) => {
                                        return (
                                            <div className="one-group" key={i}>
                                                <MenuItem>
                                                    <FormControlLabel
                                                        id="group"
                                                        control={
                                                            <Checkbox
                                                                className="main-group"
                                                                onChange={(e) =>
                                                                    handleDivisionChange(
                                                                        e
                                                                    )
                                                                }
                                                                checked={
                                                                    divisionCheckbox[
                                                                        i
                                                                    ][div.id]
                                                                }
                                                                name={
                                                                    i +
                                                                    ' ' +
                                                                    div.id +
                                                                    ' ' +
                                                                    div.name
                                                                }
                                                            />
                                                        }
                                                        label={div.name}
                                                    />
                                                </MenuItem>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>loading</div>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="chip-display">
                    {chipDivisionNames?.map((id) => {
                        return (
                            <Chip
                                key={id}
                                className="chip"
                                variant="outlined"
                                color="secondary"
                                label={id}
                            />
                        );
                    })}
                </div>
            </div>
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
        roles: state.roles.roles,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeesData: (data) => dispatch(setEmployeesData(data)),
        setEmployeeData: (value) => dispatch(setEmployeeData(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItem);
