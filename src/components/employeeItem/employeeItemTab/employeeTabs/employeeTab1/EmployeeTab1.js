import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AddImageComponent from '../../../../addImageComponent/AddImageComponent';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { BiRename } from 'react-icons/bi';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { FaPhone, FaUser } from 'react-icons/fa';
import { RiLockPasswordFill, RiUser5Fill } from 'react-icons/ri';
import { HiMail } from 'react-icons/hi';
import { AiFillEye, AiFillEyeInvisible, AiOutlineSlack } from 'react-icons/ai';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import { roleTranslator } from '../../../../../functions';
import { connect } from 'react-redux';
import { default as ReactSelect } from 'react-select';
import { setEmployeeItemSendInfo } from '../../../../../redux/actions/employeeActions';

function EmployeeTab1(props) {
    const [showPassword, setShowPassword] = useState(false);

    const {
        employeeItemSendInfo,
        employeeImageRef,
        employeeImage,
        employeeImageChange,
        tigerEmployees,
        employeePassword,
        setEmployeePassword,
        addEmployeeImageClickReferencing,
        handleEmployeeImageDeleteButton,
        divisionInfo,
        setEmployeeItemSendInfo,
    } = props;
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

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
                        value={employeeItemSendInfo[rowType]}
                        onChange={(e) =>
                            setEmployeeItemSendInfo({
                                ...employeeItemSendInfo,
                                [rowType]: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        );
    };
    const getDefaultValue = (defaultValue, options, multiple) => {
        if (!defaultValue) return null;

        if (!multiple) {
            return options.find(
                (option) => Number(option.value) === Number(defaultValue)
            );
        }

        return options.filter((option) =>
            defaultValue.some((dv) => dv.value === option.value)
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
                        <ReactSelect
                            defaultValue={getDefaultValue(
                                employeeItemSendInfo[type],
                                options,
                                false
                            )}
                            onChange={(e) => {
                                setEmployeeItemSendInfo({
                                    ...employeeItemSendInfo,
                                    [type]: e.value,
                                });
                            }}
                            options={options}
                            isSearchable={true}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Saýlaň..."
                        />
                    ) : null}
                </div>
            </div>
        );
    };

    return (
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
                        sx={{ height: '15px !important' }}
                        control={
                            <Checkbox
                                checked={employeeItemSendInfo.active}
                                onChange={(e) =>
                                    setEmployeeItemSendInfo({
                                        ...employeeItemSendInfo,
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
                        onChange={(e) => setEmployeePassword(e.target.value)}
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
            {employeeItemSendInfo.tigerEmployeeId !== 'def' &&
                employeeSelectRow(
                    <RiUser5Fill className="employee-icon" />,
                    'Tigerdaky Işgär',
                    tigerEmployees,
                    'tigerEmployeeId'
                )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        employeeData: state.employeeData.employeeData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        roles: state.roles.roles,
        employeesData: state.employeesData,
        employeeItemSendInfo: state.employeeItemSendInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeeItemSendInfo: (info) =>
            dispatch(setEmployeeItemSendInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTab1);
