import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../filter.scss';
import Button from '@material-ui/core/Button';
import { FiActivity } from 'react-icons/fi';
import { FaBuilding, FaTimes } from 'react-icons/fa';
import { Checkbox, FormControlLabel } from '@mui/material';
import { BiLogInCircle } from 'react-icons/bi';
import {
    fetchForAdmin,
    BACKEND_URL,
    fetchClientsInfo,
} from '../../../functions';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../../redux/actions/sidebarActions';
import {
    setClientsData,
    setClientSendInfo,
} from '../../../redux/actions/clientActions';
import { connect } from 'react-redux';

function ClientFilter(props) {
    const {
        clientsData,
        clientSendInfo,
        setIsSortOpen,
        setClientSendInfo,
        setIsFilterOpen,
        setClientsData,
    } = props;

    const [divisionInfo, setDivisionInfo] = useState([]);
    const [divisionCheckbox, setDivisionCheckbox] = useState([]);

    const handleOkButton = () => {
        setIsFilterOpen(false);
        setClientsData({ ...clientsData, data: [] });
        var menuSend = clientSendInfo;
        var trues = [];
        divisionCheckbox.forEach((w, i) => {
            if (Object.values(w)[0]) {
                trues.push(Number(Object.keys(w)[0]));
            }
        });
        if (trues.length === divisionInfo.length) {
            delete menuSend.divisionIds;
        } else {
            menuSend.divisionIds = trues;
        }
        menuSend.offset = 0;
        setClientSendInfo(menuSend);
        fetchClientsInfo(true, menuSend);
    };

    useEffect(() => {
        setIsSortOpen(false);
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

    const handleDivisionChange = (e) => {
        var indexx = e.target.name.split(' ');
        var tempDivisionCheckbox = divisionCheckbox;
        tempDivisionCheckbox[indexx[0]][indexx[1]] = e.target.checked;
        setDivisionCheckbox([...tempDivisionCheckbox]);
    };

    return (
        <div className="top-banner-filter admin-page-filter">
            <span className="close">
                <FaTimes
                    onClick={() => {
                        setIsFilterOpen(false);
                    }}
                />
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
                            value={clientSendInfo.login}
                            displayEmpty
                            onChange={(e) =>
                                setClientSendInfo({
                                    ...clientSendInfo,
                                    login: e.target.value,
                                })
                            }
                            label="Hemmesi"
                            placeholder="Hemmesi"
                        >
                            <MenuItem value={''}>Hemmesi</MenuItem>
                            <MenuItem value={true}>Bar</MenuItem>
                            <MenuItem value={false}>Yok</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="second one-row">
                <div className="left">
                    <FiActivity className="filter-icon" />
                    <span>Aktiwlylyk :</span>
                </div>
                <div className="right">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={clientSendInfo.active}
                            displayEmpty
                            onChange={(e) =>
                                setClientSendInfo({
                                    ...clientSendInfo,
                                    active: e.target.value,
                                })
                            }
                            label="Aktiw"
                            placeholder="Aktiw"
                        >
                            <MenuItem value={true}>Aktiw</MenuItem>
                            <MenuItem value={false}>Passiw</MenuItem>
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
        clientSendInfo: state.clientSendInfo,
        clientsData: state.clientsData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
        setClientSendInfo: (info) => dispatch(setClientSendInfo(info)),
        setClientsData: (data) => dispatch(setClientsData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientFilter);
