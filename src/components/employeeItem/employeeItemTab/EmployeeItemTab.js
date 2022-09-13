import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './employeeItemTab.scss';
import { useParams } from 'react-router-dom';
import EmployeeTab1 from './employeeTabs/employeeTab1/EmployeeTab1';
import EmployeeTab2 from './employeeTabs/employeeTab2/EmployeeTab2';
import {
    BACKEND_URL,
    fetchEmployeesInfo,
    fetchForAdmin,
} from '../../../functions';
import { connect } from 'react-redux';
import {
    setStockPermissions,
    setStockPermissionsSend,
} from '../../../redux/actions/employeeActions';

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function EmployeeItemTab(props) {
    const { id } = useParams();

    const {
        setDivisionCheckbox,
        employeesData,
        divisionCheckbox,
        employeeItemSendInfo,
        employeeImageRef,
        employeeImage,
        employeeImageChange,
        employeePassword,
        setEmployeePassword,
        addEmployeeImageClickReferencing,
        handleEmployeeImageDeleteButton,
        setStockPermissions,
        setStockPermissionsSend,
        stockPermissions,
    } = props;
    const [tabValue, setTabValue] = useState(0);
    const [divisionInfo, setDivisionInfo] = useState([]);
    const [tigerEmployees, setTigerEmployees] = useState([]);
    const [chipDivisionNames, setChipDivisionNames] = useState([]);

    useEffect(() => {
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
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/employees/${id}/stockPermission`,
                method: 'GET',
            },
            (data) => {
                let tempStockPermissions = {
                    data: data,
                    noData: data.length ? false : true,
                    isError: false,
                };
                setStockPermissionsSend(tempStockPermissions);
                setStockPermissions(tempStockPermissions);
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
        employeeItemSendInfo?.divisions?.forEach((d, i) => {
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
    }, [employeeItemSendInfo.divisions, divisionInfo]);

    const handleTabChange = (event, value) => {
        setTabValue(value);
    };

    return (
        <div className="employee-item-tab">
            <AppBar position="static" color="default">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons={true}
                >
                    <Tab label={<span>Maglumat</span>} />
                    <Tab label={<span>Stoklara yetki</span>} />
                </Tabs>
            </AppBar>
            {tabValue === 0 && (
                <TabContainer>
                    <EmployeeTab1
                        divisionCheckbox={divisionCheckbox}
                        setDivisionCheckbox={setDivisionCheckbox}
                        chipDivisionNames={chipDivisionNames}
                        setChipDivisionNames={setChipDivisionNames}
                        employeeImageRef={employeeImageRef}
                        employeeImage={employeeImage}
                        employeeImageChange={employeeImageChange}
                        tigerEmployees={tigerEmployees}
                        employeePassword={employeePassword}
                        setEmployeePassword={setEmployeePassword}
                        addEmployeeImageClickReferencing={
                            addEmployeeImageClickReferencing
                        }
                        handleEmployeeImageDeleteButton={
                            handleEmployeeImageDeleteButton
                        }
                        divisionInfo={divisionInfo}
                    />
                </TabContainer>
            )}
            {tabValue === 1 && (
                <TabContainer>
                    <EmployeeTab2 />
                </TabContainer>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        employeeData: state.employeeData.employeeData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        employeesData: state.employeesData,
        stockPermissions: state.stockPermissions,
        employeeItemSendInfo: state.employeeItemSendInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStockPermissions: (data) => dispatch(setStockPermissions(data)),
        setStockPermissionsSend: (data) =>
            dispatch(setStockPermissionsSend(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItemTab);
