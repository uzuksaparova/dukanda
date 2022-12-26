import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import { AiOutlinePrinter, AiOutlineSync } from 'react-icons/ai';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import {
    setEmployeeEmptyValues,
    setEmployeeItemSendInfo,
} from '../../../../../redux/actions/employeeActions';
import { default as ReactSelect } from 'react-select';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';
import './employeeTab3.scss';

function EmployeeTab3(props) {
    const {
        employeeItemSendInfo,
        divisionInfo,
        setEmployeeItemSendInfo,
        roles,
        employeeEmptyValues,
        setEmployeeEmptyValues,
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
        let tempEmptyValues = employeeEmptyValues;
        tempEmptyValues = tempEmptyValues.filter((v) => v !== type);
        setEmployeeEmptyValues(tempEmptyValues);
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
                    {employeeEmptyValues.includes(type) ? (
                        <span
                            style={{
                                marginTop: '5px',
                                color: 'red',
                                fontSize: 13,
                            }}
                        >
                            **{leftName} saýlanmadyk!
                        </span>
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
                        label={employeeItemSendInfo[type] ? 'Bar' : 'Ýok'}
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
            {employeeCheckboxRow(
                <FaSearch className="employee-icon" />,
                'Haryt Analizyna yetki',
                'productAnalyzeAccess'
            )}
            {employeeCheckboxRow(
                <AiOutlinePrinter className="employee-icon" />,
                'Barkod çap etmek',
                'barcodePrintAccess'
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
        employeeEmptyValues: state.employeeEmptyValues.employeeEmptyValues,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeeItemSendInfo: (info) =>
            dispatch(setEmployeeItemSendInfo(info)),
        setEmployeeEmptyValues: (info) =>
            dispatch(setEmployeeEmptyValues(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTab3);
