import React, { useEffect, useState } from 'react';
import './deliveryTimelineModal.scss';
import Button from '@material-ui/core/Button';
import { fetchForAdminWithUpdateToast, BACKEND_URL } from '../../../functions';

import { Backdrop, Box, Modal, Fade } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { AiOutlineFieldTime, AiOutlineSlack } from 'react-icons/ai';
import { Checkbox, FormControlLabel } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function DeliveryTimelineModal(props) {
    const {
        isDeliveryTimelineModalOpen,
        setIsDeliveryTimelineModalOpen,
        deliveryTimelineSendInfo,
        fetchDeliveryTimelines,
    } = props;
    const [timelineSend, setTimelineSend] = useState({});

    useEffect(() => {
        setTimelineSend(deliveryTimelineSendInfo.timeLines[0]);
    }, [deliveryTimelineSendInfo]);

    const handleSaveButton = () => {
        let tempDelTimSendInfo = { ...deliveryTimelineSendInfo };
        tempDelTimSendInfo.timeLines[0] = timelineSend;
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/delivery/timeLines/${
                    deliveryTimelineSendInfo.id
                        ? deliveryTimelineSendInfo.id
                        : ''
                }`,
                body: JSON.stringify(tempDelTimSendInfo),
                notifyMessage: 'Saving ...',
                updateMessage: 'Saved',
                method: tempDelTimSendInfo.id ? 'PUT' : 'POST',
            },
            (data) => {
                fetchDeliveryTimelines();
                setIsDeliveryTimelineModalOpen(false);
            }
        );
    };

    const handleCloseModal = () => {
        setIsDeliveryTimelineModalOpen(false);
        setTimelineSend({
            startTime: '',
            endTime: '',
            active: true,
            disableTime: '',
        });
    };
    return (
        <div>
            <Modal
                className="delivery-timeline-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isDeliveryTimelineModalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isDeliveryTimelineModalOpen}>
                    <Box sx={style}>
                        <span className="close">
                            <FaTimes
                                onClick={() =>
                                    setIsDeliveryTimelineModalOpen(false)
                                }
                            />
                        </span>
                        <div className="delivery-timeline-modal-div">
                            <div className="delivery-timeline-one-row">
                                <div className="left">
                                    <AiOutlineSlack className="delivery-icon" />
                                    <span>Aktiw</span>
                                </div>
                                <div className="right">
                                    <FormControlLabel
                                        onChange={(e) =>
                                            setTimelineSend({
                                                ...timelineSend,
                                                active: e.target.checked,
                                            })
                                        }
                                        control={
                                            <Checkbox
                                                checked={timelineSend.active}
                                                onChange={(e) =>
                                                    setTimelineSend({
                                                        ...timelineSend,
                                                        active: e.target
                                                            .checked,
                                                    })
                                                }
                                                name="active"
                                            />
                                        }
                                        label="Aktiw"
                                    />
                                </div>
                            </div>
                            <div className="delivery-timeline-one-row">
                                <div className="left">
                                    <AiOutlineFieldTime className="delivery-icon" />
                                    <span>Başlaýan wagty</span>
                                </div>
                                <div className="right">
                                    <input
                                        style={{ width: '100px' }}
                                        type="time"
                                        className=""
                                        value={timelineSend.startTime}
                                        onChange={(e) =>
                                            setTimelineSend({
                                                ...timelineSend,
                                                startTime: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="delivery-timeline-one-row">
                                <div className="left">
                                    <AiOutlineFieldTime className="delivery-icon" />
                                    <span>Gutarýan wagty</span>
                                </div>
                                <div className="right">
                                    <input
                                        style={{ width: '100px' }}
                                        type="time"
                                        className=""
                                        value={timelineSend.endTime}
                                        onChange={(e) =>
                                            setTimelineSend({
                                                ...timelineSend,
                                                endTime: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="delivery-timeline-one-row">
                                <div className="left">
                                    <GiReceiveMoney className="delivery-icon" />
                                    <span>Öçürme wagty (minutda)</span>
                                </div>
                                <div className="right">
                                    <input
                                        type="text"
                                        value={timelineSend.disableTime}
                                        onChange={(e) =>
                                            setTimelineSend({
                                                ...timelineSend,
                                                disableTime: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="buttons-delivery">
                            <Button
                                className="save-button-delivery"
                                onClick={handleSaveButton}
                            >
                                Kaydet
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default DeliveryTimelineModal;
