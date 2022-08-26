import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../filter.scss';
import Button from '@material-ui/core/Button';
import { FaBuilding, FaTimes } from 'react-icons/fa';
import { Checkbox, FormControlLabel } from '@mui/material';
import { BiLogInCircle } from 'react-icons/bi';
import {
    BACKEND_URL,
    fetchForAdmin,
    fetchDevicesInfo,
} from '../../../functions';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../../redux/actions/sidebarActions';
import {
    setClientsData,
    setClientSendInfo,
    setIsClientFilterOpen,
} from '../../../redux/actions/clientActions';
import { connect } from 'react-redux';
import { setDevicesData } from '../../../redux/actions/deviceActions';

function DeviceFilter(props) {
    const {
        setIsFilterOpen,
        deviceSendInfo,
        setDeviceSendInfo,
        setDevicesData,
        devicesData,
    } = props;

    const [deviceFilter, setDeviceFilter] = useState({
        login: deviceSendInfo.login ? deviceSendInfo.login : '',
        divisionIds: deviceSendInfo.divisionIds
            ? deviceSendInfo.divisionIds
            : [],
    });
    const [divisionInfo, setDivisionInfo] = useState([]);
    const [divisionCheckbox, setDivisionCheckbox] = useState([]);

    const handleOkButton = () => {
        setDevicesData({ ...devicesData, data: [] });
        var menuSend = deviceSendInfo;
        if (menuSend.divisionIds.length === divisionInfo.length) {
            delete menuSend.divisionIds;
        }
        menuSend.offset = 0;
        setDeviceSendInfo(menuSend);
        setIsFilterOpen(false);
        fetchDevicesInfo(true, menuSend);
    };

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
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        var menuSend = deviceSendInfo;
        menuSend.login = deviceFilter.login;
        var trues = [];
        divisionCheckbox.forEach((w, i) => {
            if (Object.values(w)[0]) {
                trues.push(Number(Object.keys(w)[0]));
            }
        });
        menuSend.divisionIds = trues;
        setDeviceSendInfo(menuSend);
        // eslint-disable-next-line
    }, [deviceFilter]);

    const handleDivisionChange = (e) => {
        var indexx = e.target.name.split(' ');
        var tempDivisionCheckbox = divisionCheckbox;
        tempDivisionCheckbox[indexx[0]][indexx[1]] = e.target.checked;
        setDeviceFilter({
            ...deviceFilter,
            divisionIds: [...tempDivisionCheckbox],
        });
    };

    return (
        <div className="top-banner-filter admin-page-filter">
            <span className="close">
                <FaTimes onClick={() => setIsFilterOpen(false)} />
            </span>
            <div className="first one-row">
                <div className="left">
                    <BiLogInCircle className="filter-icon" />
                    <span>Login :</span>
                </div>
                <div className="right">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={deviceFilter.login}
                            displayEmpty
                            onChange={(e) =>
                                setDeviceFilter({
                                    ...deviceFilter,
                                    login: e.target.value,
                                })
                            }
                            label="Hemmesi"
                            placeholder="Hemmesi"
                        >
                            <MenuItem value={''}>Hemmesi</MenuItem>
                            <MenuItem value={'true'}>Bar</MenuItem>
                            <MenuItem value={'false'}>Yok</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="second one-row">
                <div className="left">
                    <FaBuilding className="filter-icon" />
                    <span>Bölümler :</span>
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
                                                            defaultValue={
                                                                divisionCheckbox[
                                                                    i
                                                                ][div.id]
                                                            }
                                                            name={
                                                                i + ' ' + div.id
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
        deviceSendInfo: state.deviceSendInfo,
        devicesData: state.devicesData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
        setDeviceSendInfo: (info) => dispatch(setClientSendInfo(info)),
        setDevicesData: (data) => dispatch(setDevicesData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceFilter);
