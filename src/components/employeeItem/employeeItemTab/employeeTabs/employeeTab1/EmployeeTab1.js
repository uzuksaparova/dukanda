import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AddImageComponent from '../../../../addImageComponent/AddImageComponent';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { BiRename } from 'react-icons/bi';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { FaBuilding, FaPhone, FaUser } from 'react-icons/fa';
import { RiLockPasswordFill, RiUser5Fill } from 'react-icons/ri';
import { HiMail, HiOutlineBriefcase } from 'react-icons/hi';
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
import { setEmployeeItemSendInfo } from '../../../../../redux/actions/employeeActions';

function EmployeeTab1(props) {
    const [showPassword, setShowPassword] = useState(false);

    const {
        roles,
        t,
        divisionCheckbox,
        setDivisionCheckbox,
        chipDivisionNames,
        setChipDivisionNames,
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
                                value={employeeItemSendInfo[type]}
                                onChange={(e) =>
                                    setEmployeeItemSendInfo({
                                        ...employeeItemSendInfo,
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
                            {divisionInfo.length && divisionCheckbox.length ? (
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
