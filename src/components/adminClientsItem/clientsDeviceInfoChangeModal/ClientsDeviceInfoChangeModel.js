import React, { useState } from 'react';
import '../clientsItemModal/clientsItemModal.scss';
import { BACKEND_URL, fetchForAdminWithUpdateToast } from '../../../functions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
    Backdrop,
    Box,
    Modal,
    Fade,
    FormControl,
    Select,
    MenuItem,
} from '@material-ui/core';
import { FaBuilding } from 'react-icons/fa';
import { setClientData } from '../../../redux/actions/clientActions';
import * as authorizationn from '../../authorization.json';

const authorization = authorizationn.default;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1000px',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function ClientsDeviceInfoChangeModel(props) {
    const {
        clientData,
        clientDivisionData,
        setClientData,
        isClientDeviceModalOpen,
        setIsClientDeviceModalOpen,
        deviceId,
        decodedToken,
    } = props;

    const [deviceSendInfo, setDeviceSendInfo] = useState({
        divisionId: clientDivisionData[0].id,
    });
    const onSaveButtonClick = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/devices/${deviceId}`,
                method: 'PUT',
                body: JSON.stringify(deviceSendInfo),
                notifyMessage: 'Saving ...',
                updateMessage: 'Saved',
            },
            (data) => {
                if (data !== 'err') {
                    let temp = clientData.devices;
                    temp = temp.map((cl) => {
                        if (cl.id === deviceId) {
                            let obj = cl;
                            cl.divisionId = deviceSendInfo.divisionId;
                            return obj;
                        } else {
                            return cl;
                        }
                    });
                    setClientData({ ...clientData, devices: [...temp] });
                }
            }
        );
    };

    return (
        <div>
            <Modal
                className="client-modal client-device-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isClientDeviceModalOpen}
                onClose={() => setIsClientDeviceModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isClientDeviceModalOpen}>
                    <Box sx={style}>
                        <div className="client-body">
                            <div className="client-one-row">
                                <div className="left">
                                    <FaBuilding className="employee-icon" />
                                    <span>Bölüm</span>
                                </div>
                                <div className="right">
                                    <FormControl className="form-control">
                                        <Select
                                            code="demo-simple-select-outlined"
                                            value={deviceSendInfo.divisionId}
                                            displayEmpty
                                            label="Bölüm"
                                            onChange={(e) =>
                                                setDeviceSendInfo({
                                                    divisionId: e.target.value,
                                                })
                                            }
                                        >
                                            {clientDivisionData.map(
                                                (div, i) => {
                                                    return (
                                                        <MenuItem
                                                            value={div.id}
                                                            key={div.id}
                                                        >
                                                            {div.name}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="buttons ">
                            <Button
                                onClick={() => {
                                    onSaveButtonClick();
                                    setIsClientDeviceModalOpen(false);
                                }}
                                className="save-button"
                                disabled={
                                    authorization[decodedToken.role].includes(
                                        'updateClient'
                                    )
                                        ? false
                                        : true
                                }
                            >
                                OK
                            </Button>
                            <Button
                                onClick={() =>
                                    setIsClientDeviceModalOpen(false)
                                }
                                className="cancel-button"
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
        clientDivisionData: state.clientDivisionData.clientDivisionData,
        clientData: state.clientData,
        decodedToken: state.decodedToken.decodedToken,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClientData: (data) => dispatch(setClientData(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientsDeviceInfoChangeModel);
