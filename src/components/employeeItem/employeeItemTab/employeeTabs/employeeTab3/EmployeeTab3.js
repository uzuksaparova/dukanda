import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import { AiOutlineSync } from 'react-icons/ai';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { setEmployeeItemSendInfo } from '../../../../../redux/actions/employeeActions';
import { default as ReactSelect } from 'react-select';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { HiOutlineBriefcase } from 'react-icons/hi';
import './employeeTab3.scss';

function EmployeeTab3(props) {
    const {
        employeeItemSendInfo,
        divisionInfo,
        setEmployeeItemSendInfo,
        roles,
    } = props;

    const getDefaultValue = (defaultValue, options, multiple) => {
        if (!defaultValue) return null;

        if (!multiple) {
            return options.find((option) => option.value === defaultValue);
        }

        return options.filter((option) =>
            defaultValue.some((dv) => dv.value === option.value)
        );
    };

    const handleSelectChange = (e, type) => {
        if (type === 'role') {
            setEmployeeItemSendInfo({
                ...employeeItemSendInfo,
                [type]: e.value,
            });
        } else {
            setEmployeeItemSendInfo({
                ...employeeItemSendInfo,
                [type]: e,
            });
        }
    };

    const employeeSelectRow = (
        leftIcon,
        leftName,
        options,
        type,
        multiple = false
    ) => {
        return (
            <div className="employee-tab3-one-row">
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
                                multiple
                            )}
                            onChange={(e) => {
                                handleSelectChange(e, type);
                            }}
                            options={options}
                            isSearchable={true}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Saýlaň..."
                            isMulti={multiple}
                        />
                    ) : null}
                </div>
            </div>
        );
    };

    const employeeCheckboxRow = (leftIcon, leftName, type) => {
        return (
            <div className="employee-tab3-one-row">
                <div className="left" style={{ minWidth: '270px !important' }}>
                    {leftIcon}
                    <span>{leftName}</span>
                </div>
                <div className="right">
                    {console.log(employeeItemSendInfo)}
                    <FormControlLabel
                        sx={{ height: '15px !important' }}
                        control={
                            <Checkbox
                                checked={employeeItemSendInfo[type]}
                                onChange={(e) =>
                                    setEmployeeItemSendInfo({
                                        ...employeeItemSendInfo,
                                        [type]: e.target.checked,
                                    })
                                }
                            />
                        }
                        label={leftName}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="employee-body employee-tab3">
            {employeeCheckboxRow(
                <MdOutlineQrCodeScanner className="employee-icon" />,
                'Qr müşderi karty paýlaşmak',
                'qrClientCardShareAccess'
            )}
            {employeeCheckboxRow(
                <AiOutlineSync className="employee-icon" />,
                'Sinhronlamak',
                'syncAccess'
            )}
            {employeeSelectRow(
                <HiOutlineBriefcase className="employee-icon" />,
                'Rol',
                roles,
                'role',
                false
            )}
            {employeeSelectRow(
                <FaBuilding className="employee-icon" />,
                'Bölüm',
                divisionInfo,
                'divisions',
                true
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTab3);
