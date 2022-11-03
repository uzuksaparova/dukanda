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
    setStockPermissionsEvents,
} from '../../../redux/actions/employeeActions';
import EmployeeTab3 from './employeeTabs/employeeTab3/EmployeeTab3';

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function EmployeeItemTab(props) {
    const { id } = useParams();

    const {
        employeesData,
        employeeItemSendInfo,
        employeeImageRef,
        employeeImage,
        employeeImageChange,
        employeePassword,
        setEmployeePassword,
        addEmployeeImageClickReferencing,
        handleEmployeeImageDeleteButton,
        setStockPermissions,
        setStockPermissionsEvents,
    } = props;
    const [tabValue, setTabValue] = useState(0);
    const [divisionInfo, setDivisionInfo] = useState([]);
    const [tigerEmployees, setTigerEmployees] = useState([]);

    const fetchStockPermissions = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/employees/${id}/stockPermission`,
                method: 'GET',
            },
            (data) => {
                let tempStockPermissions = {
                    noData: data.length ? false : true,
                    isError: false,
                };
                setStockPermissionsEvents(tempStockPermissions);
                setStockPermissions(
                    data.sort((a, b) => {
                        return a.type && !b.type
                            ? -1
                            : a.type && b.type
                            ? a.priority - b.priority
                            : 9999;
                    })
                );
            }
        );
    };
    const selectOptionProducer = (data, label, value) => {
        return data.map((d) => {
            return { value: d[value], label: d[label] };
        });
    };

    useEffect(() => {
        if (!employeesData?.data.length) {
            fetchEmployeesInfo(true);
        }
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/divisions`,
                method: 'GET',
            },
            (data) => {
                var tempDiv = [];
                data.forEach((div) => {
                    var obj = {};
                    obj = { value: div.id, label: div.name };
                    tempDiv.push(obj);
                });
                setDivisionInfo(tempDiv);
            }
        );
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/employees/tiger`,
                method: 'GET',
            },
            (data) => {
                data = selectOptionProducer(data, 'name', 'id');
                setTigerEmployees(data);
            }
        );
        fetchStockPermissions();

        // eslint-disable-next-line
    }, []);

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
                    <Tab label={<span>Beýleki yetkiler</span>} />
                </Tabs>
            </AppBar>
            {tabValue === 0 && (
                <TabContainer>
                    <EmployeeTab1
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
                    <EmployeeTab2
                        fetchStockPermissions={fetchStockPermissions}
                    />
                </TabContainer>
            )}
            {tabValue === 2 && (
                <TabContainer>
                    <EmployeeTab3 divisionInfo={divisionInfo} />
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
        employeeItemSendInfo: state.employeeItemSendInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStockPermissions: (data) => dispatch(setStockPermissions(data)),
        setStockPermissionsEvents: (data) =>
            dispatch(setStockPermissionsEvents(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItemTab);
