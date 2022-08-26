import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FaTimes } from 'react-icons/fa';
import '../sort.scss';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../../redux/actions/sidebarActions';
import {
    setEmployeesData,
    setEmployeeSendInfo,
} from '../../../redux/actions/employeeActions';
import { connect } from 'react-redux';
import { fetchEmployeesInfo } from '../../../functions';
import { employeesData } from '../../../redux/reducers/employeeReducer';

function EmployeeSort(props) {
    const {
        setIsSortOpen,
        employeeSendInfo,
        setIsFilterOpen,
        setEmployeesData,
        setEmployeeUpdateInfo,
    } = props;

    const [sortNameControl, setSortNameControl] = useState(
        employeeSendInfo.order ? employeeSendInfo.order : 'userName'
    );

    const [sortOrderControl, setSortOrderControl] = useState(
        employeeSendInfo.orderType ? employeeSendInfo.orderType : 'asc'
    );

    const handleSortNameChange = (event) => {
        setSortNameControl(event.target.value);
        var sortCopy = employeeSendInfo;
        sortCopy.order = event.target.value;
        setEmployeeUpdateInfo({
            ...sortCopy,
        });
    };

    useEffect(() => {
        setIsFilterOpen(false);
        // eslint-disable-next-line
    }, []);

    const handleSortOrderControl = (e) => {
        setSortOrderControl(e.target.value);
        var sortCopy = employeeSendInfo;
        sortCopy.orderType = e.target.value;
        setEmployeeUpdateInfo({
            ...sortCopy,
        });
    };

    const handleOkButton = () => {
        setEmployeesData({ ...employeesData, data: [] });
        setIsSortOpen(false);
        fetchEmployeesInfo(true);
    };

    return (
        <div className="admin-page-sort">
            <span className="close">
                <FaTimes onClick={() => setIsSortOpen(false)} />
            </span>
            <div className="one-row">
                <div className="left">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={sortNameControl}
                            displayEmpty
                            onChange={(e) => handleSortNameChange(e)}
                            label="Ady"
                            placeholder="Ady"
                        >
                            <MenuItem value={'firstName'}>Ady</MenuItem>
                            <MenuItem value={'lastName'}>Familyasy</MenuItem>
                            <MenuItem value={'userName'}>Ulanyjy ady</MenuItem>
                            <MenuItem value={'role'}>Rol</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="right">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={sortOrderControl}
                            displayEmpty
                            onChange={(e) => handleSortOrderControl(e)}
                            label="Artýan"
                            placeholder="Artýan"
                        >
                            <MenuItem value={'asc'}>Artýan</MenuItem>
                            <MenuItem value={'desc'}>Kemelýän</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="buttons">
                <Button
                    variant="contained"
                    className="ok-button"
                    onClick={handleOkButton}
                >
                    ok
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        employeeSendInfo: state.employeeSendInfo,
        employeesData: state.employeesData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
        setEmployeeSendInfo: (info) => dispatch(setEmployeeSendInfo(info)),
        setEmployeesData: (data) => dispatch(setEmployeesData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSort);
