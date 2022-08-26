import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../filter.scss';
import Button from '@material-ui/core/Button';
import { FiActivity } from 'react-icons/fi';
import { AiOutlineSlack } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { fetchEmployeesInfo, roleTranslator } from '../../../functions';
import {
    setEmployeesData,
    setEmployeeSendInfo,
    setRolesSend,
} from '../../../redux/actions/employeeActions';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../../redux/actions/sidebarActions';
import { connect } from 'react-redux';

function EmployeeFilter(props) {
    const {
        setIsFilterOpen,
        employeeSendInfo,
        setIsSortOpen,
        setEmployeeSendInfo,
        roles,
        rolesSend,
        setRolesSend,
        setEmployeesData,
        employeesData,
    } = props;

    const [activeEmployee, setActiveEmployee] = useState(
        employeeSendInfo.active ? employeeSendInfo.active : 'all'
    );

    const handleOkButton = () => {
        let temp = { ...employeeSendInfo };
        temp.offset = 0;
        setEmployeeSendInfo(temp);
        setEmployeesData({ ...employeesData, data: [] });
        setIsFilterOpen(false);
        fetchEmployeesInfo(true, temp);
    };

    useEffect(() => {
        setIsSortOpen(false);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        var menuSend = employeeSendInfo;
        menuSend.active = activeEmployee;
        var keys = Object.keys(rolesSend);
        var trues = Object.keys(rolesSend).filter((k) => rolesSend[k]);
        if (trues.length !== keys.length) {
            menuSend['role'] = trues;
        } else {
            menuSend['role'] = [];
        }
        setEmployeeSendInfo(menuSend);
        // eslint-disable-next-line
    }, [activeEmployee, rolesSend]);

    const handleRolesChangeCheckbox = (e, i) => {
        setRolesSend({
            ...rolesSend,
            [e.target.name]: e.target.checked,
        });
    };

    return (
        <div className="top-banner-filter admin-page-filter">
            <span className="close">
                <FaTimes onClick={() => setIsFilterOpen(false)} />
            </span>
            <div className="first one-row">
                <div className="left">
                    <FiActivity className="filter-icon" />
                    <span>Aktiwlylyk :</span>
                </div>
                <div className="right">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={activeEmployee}
                            displayEmpty
                            onChange={(e) => setActiveEmployee(e.target.value)}
                            label="Hemmesi"
                            placeholder="Hemmesi"
                        >
                            <MenuItem value={'all'}>Hemmesi</MenuItem>
                            <MenuItem value={true}>Aktiw</MenuItem>
                            <MenuItem value={false}>Passiw</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="second one-row" id="second">
                <div className="left">
                    <AiOutlineSlack className="filter-icon" />
                    <span>Rol:</span>
                </div>
                <div className="right">
                    <div className="second one-row" id="second">
                        <div className="right">
                            <FormControl className="form-control">
                                <Select
                                    multiple
                                    code="demo-simple-select-outlined"
                                    value={['Rollar']}
                                    displayEmpty
                                    label="Categories"
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Placeholder</em>;
                                        }
                                        return selected.join(', ');
                                    }}
                                >
                                    {roles?.length
                                        ? roles?.map((role, i) => {
                                              return (
                                                  <div
                                                      className="one-group"
                                                      key={i}
                                                  >
                                                      <MenuItem>
                                                          <FormControlLabel
                                                              id="group"
                                                              control={
                                                                  <Checkbox
                                                                      className="main-group"
                                                                      onChange={(
                                                                          e
                                                                      ) =>
                                                                          handleRolesChangeCheckbox(
                                                                              e,
                                                                              i
                                                                          )
                                                                      }
                                                                      checked={
                                                                          rolesSend[
                                                                              role
                                                                          ]
                                                                              ? rolesSend[
                                                                                    role
                                                                                ]
                                                                              : false
                                                                      }
                                                                      defaultValue={
                                                                          rolesSend[
                                                                              role
                                                                          ]
                                                                      }
                                                                      name={
                                                                          role
                                                                      }
                                                                  />
                                                              }
                                                              label={roleTranslator(
                                                                  role
                                                              )}
                                                          />
                                                      </MenuItem>
                                                  </div>
                                              );
                                          })
                                        : null}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter-buttons">
                <Button
                    variant="contained"
                    className="first-button"
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
        roles: state.roles.roles,
        rolesSend: state.rolesSend.rolesSend,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
        setEmployeeSendInfo: (info) => dispatch(setEmployeeSendInfo(info)),
        setEmployeesData: (data) => dispatch(setEmployeesData(data)),
        setRolesSend: (roles) => dispatch(setRolesSend(roles)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeFilter);
