import React, { useState, useEffect } from 'react';
import './employeeModal.scss';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import {
    BACKEND_URL,
    fetchWithoutParams,
    fetchEmployeesInfo,
    fetchForAdminWithUpdateToast,
} from '../../functions';
import {
    setEmployeesData,
    setEmployeeSendInfo,
} from '../../redux/actions/employeeActions';
import { connect } from 'react-redux';

import {
    Backdrop,
    Box,
    Modal,
    Fade,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import SearchComponent from '../searchComponent/SearchComponent';
import { setIsEmployeeModalOpen } from '../../redux/actions';
import { Checkbox } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1000px',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function EmployeeModal(props) {
    const {
        isEmployeeModalOpen,
        setIsEmployeeModalOpen,
        employeesData,
        employeeSendInfo,
        setEmployeeSendInfo,
        setEmployeesData,
        isError,
        employeeType,
        employees,
        setEmployees,
        renderedIn = '',
        stockPermissions,
    } = props;
    const { noData, data, isEnd } = employeesData;

    const [searchValue, setSearchValue] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
        fetchEmployeesInfo(true, {
            ...employeeSendInfo,
            limit: 1000,
            offset: 0,
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (data.length) {
            let temp = [];
            data.forEach((emp) => {
                temp.push({
                    fullName: emp.fullName,
                    selected: false,
                    id: emp.id,
                });
            });
            setSelectedEmployees(temp);
        }
    }, [employeesData]);

    useEffect(() => {
        let tempFilteredEmployees = [];
        tempFilteredEmployees = data.filter((emp) => emp.role === employeeType);
        setFilteredEmployees([...tempFilteredEmployees]);
    }, [employeesData, employeeType]);

    const onSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const onSearchIconClick = () => {
        setEmployeesData({ ...employeesData, data: [] });
        let menuSend = employeeSendInfo;
        menuSend.search = searchValue;
        menuSend.offset = 0;
        menuSend.limit = 1000;
        setEmployeeSendInfo(menuSend);
        if (!isError) {
            fetchEmployeesInfo(true, menuSend);
        }
    };

    const handleChange = (e) => {
        switch (employeeType) {
            case 'assigned':
                setEmployees({
                    ...employees,
                    assigned: {
                        id: e.target.value,
                        name: e.target.name,
                    },
                });
                break;
            case 'picker':
                setEmployees({
                    ...employees,
                    picker: {
                        id: e.target.value,
                        name: e.target.name,
                    },
                });
                break;
            case 'operator':
                setEmployees({
                    ...employees,
                    operator: {
                        id: e.target.value,
                        name: e.target.name,
                    },
                });
                break;
            case 'deliverer':
                setEmployees({
                    ...employees,
                    deliverer: {
                        id: e.target.value,
                        name: e.target.name,
                    },
                });
                break;
            default:
                return null;
        }
    };
    const handleOkButton = () => {
        if (renderedIn === 'employee') {
            const depoSend = [];
            stockPermissions.forEach((stock, i) => {
                depoSend.push({
                    nr: stock.nr,
                    type: stock.type,
                    priority: i + 1,
                });
            });
            let tempSelectedEmployees = [];
            selectedEmployees.forEach((emp) => {
                if (emp.selected) {
                    tempSelectedEmployees.push(emp.id);
                }
            });

            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/employees/stockPermission`,
                    notifyMessage: 'Kopyalanyar...',
                    updateMessage: 'Kopyalandy',
                    body: {
                        employeeIds: tempSelectedEmployees,
                        permissions: depoSend,
                    },
                },
                (data) => {
                    console.log(data);
                }
            );
        } else {
            var agreed = window.confirm(
                `Siz hakykatdan hem ${
                    employeeType === 'deliverer'
                        ? 'gowşuryjy'
                        : employeeType === 'assigned'
                        ? 'bellenen'
                        : employeeType === 'picker'
                        ? 'ýygnayjy'
                        : 'operator'
                } işgäri üýtgetmek isleýäňizmi?`
            );
            if (agreed) {
                fetchWithoutParams(
                    {
                        url: `${BACKEND_URL}/admin/orders/${props.orderId}/employee/${employees[employeeType].id}/${employeeType}`,
                        method: 'PUT',
                    },
                    (data) => {
                        if (data !== 'err') {
                            toast.success('Işgär üýtgedildi', {
                                autoClose: 2000,
                            });
                        } else {
                            toast.error('something went wrong', {
                                autoClose: 2000,
                            });
                        }
                    }
                );
                setIsEmployeeModalOpen(false);
            }
        }
    };

    const handleEmployeeCheckboxChange = (e, emp, i) => {
        let tempEmployees = selectedEmployees;
        tempEmployees[i]['selected'] = e.target.checked;
        setSelectedEmployees([...tempEmployees]);
    };

    return (
        <div>
            <Modal
                className="employee-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isEmployeeModalOpen}
                onClose={() => setIsEmployeeModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isEmployeeModalOpen}>
                    <Box sx={style}>
                        <div className="modal-top">
                            <SearchComponent
                                searchValue={searchValue}
                                handleInputChange={onSearchChange}
                                onSearchIconClick={onSearchIconClick}
                            />
                        </div>

                        <div className="modal-bottom" id="modal-bottom">
                            {!data.length ? (
                                isError ? (
                                    <ErrorComponent />
                                ) : (
                                    <EmptyComponent />
                                )
                            ) : (
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Işgärler
                                    </FormLabel>
                                    {renderedIn === 'employee' ? (
                                        selectedEmployees.map((emp, i) => {
                                            return (
                                                <FormControlLabel
                                                    key={emp.id}
                                                    control={
                                                        <Checkbox
                                                            onChange={(e) =>
                                                                handleEmployeeCheckboxChange(
                                                                    e,
                                                                    emp,
                                                                    i
                                                                )
                                                            }
                                                            checked={
                                                                selectedEmployees[
                                                                    i
                                                                ]['selected']
                                                            }
                                                        />
                                                    }
                                                    label={emp.fullName}
                                                />
                                            );
                                        })
                                    ) : !filteredEmployees.length ? (
                                        isError ? (
                                            <ErrorComponent />
                                        ) : (
                                            <EmptyComponent />
                                        )
                                    ) : (
                                        <RadioGroup
                                            aria-label="gender"
                                            name="controlled-radio-buttons-group"
                                            value={Number(
                                                employees[employeeType]?.id
                                            )}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            {' '}
                                            {filteredEmployees?.map(
                                                (employee, i) => {
                                                    return (
                                                        <FormControlLabel
                                                            key={employee.id}
                                                            value={Number(
                                                                employee.id
                                                            )}
                                                            control={<Radio />}
                                                            name={
                                                                employee.fullName
                                                            }
                                                            label={`${employee.fullName}`}
                                                        />
                                                    );
                                                }
                                            )}
                                        </RadioGroup>
                                    )}
                                </FormControl>
                            )}
                        </div>
                        <div className="buttons ">
                            <Button
                                onClick={handleOkButton}
                                className="save-button"
                            >
                                OK
                            </Button>
                            <Button
                                onClick={(e) => {
                                    setIsEmployeeModalOpen(false);
                                }}
                                className="cancel-button"
                                variant="outlined"
                            >
                                Iptal
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        employeesData: state.employeesData,
        employeeSendInfo: state.employeeSendInfo,
        isError: state.isError.isError,
        isEmployeeModalOpen: state.isEmployeeModalOpen.isEmployeeModalOpen,
        stockPermissions: state.stockPermissions.stockPermissions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeeSendInfo: (info) => dispatch(setEmployeeSendInfo(info)),
        setEmployeesData: (data) => dispatch(setEmployeesData(data)),
        setIsEmployeeModalOpen: (data) =>
            dispatch(setIsEmployeeModalOpen(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeModal);
