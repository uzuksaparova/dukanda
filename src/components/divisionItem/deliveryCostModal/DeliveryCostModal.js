import React, { useEffect } from 'react';
import './deliveryCostModal.scss';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { fetchForAdminWithUpdateToast, BACKEND_URL } from '../../../functions';
import { Backdrop, Box, Modal, Fade } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';
import { MenuItem, Select } from '@mui/material';
import { setDeliveryCostSendInfo } from '../../../redux/actions/divisionActions';
import { connect } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function DeliveryCostModal(props) {
    const {
        isDeliveryCostModalOpen,
        setIsDeliveryCostModalOpen,
        currenciesList,
        deliveryCostSendInfo,
        setDeliveryCostSendInfo,
        deliveryCost,
        setDeliveryCost,
    } = props;
    const { id } = useParams();

    useEffect(() => {
        setDeliveryCostSendInfo({ ...deliveryCostSendInfo, divisionId: id });
    }, []);

    const handleSaveButton = () => {
        if (deliveryCostSendInfo.createdAt && deliveryCostSendInfo.updatedAt) {
            delete deliveryCostSendInfo.createdAt;
            delete deliveryCostSendInfo.updatedAt;
        }
        if (deliveryCostSendInfo.divisionId === '0') {
            delete deliveryCostSendInfo.divisionId;
        }
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/delivery/${
                    deliveryCostSendInfo.id ? deliveryCostSendInfo.id : ''
                }`,
                body: JSON.stringify(deliveryCostSendInfo),
                notifyMessage: 'Saving ...',
                updateMessage: 'Saved',
                method: deliveryCostSendInfo.id ? 'PUT' : 'POST',
            },
            (data) => {
                let tempDelCost = deliveryCost;
                let inc = false;
                tempDelCost = tempDelCost.map((delcost) => {
                    if (delcost.id === deliveryCostSendInfo.id) {
                        inc = true;
                        return deliveryCostSendInfo;
                    }
                    return delcost;
                });
                if (!inc) {
                    tempDelCost.push(data.data);
                }
                setDeliveryCost([...tempDelCost]);
            }
        );
    };

    const oneRow = (leftIcon, leftValue, rightValue) => {
        return (
            <div className="delivery-cost-one-row">
                <div className="left">
                    {leftIcon}
                    <span>{leftValue}</span>
                </div>
                <div className="right">
                    <input
                        type="text"
                        value={deliveryCostSendInfo[rightValue]}
                        onChange={(e) => {
                            setDeliveryCostSendInfo({
                                ...deliveryCostSendInfo,
                                [rightValue]: e.target.value,
                            });
                        }}
                    />
                </div>
            </div>
        );
    };
    return (
        <div>
            <Modal
                className="delivery-cost-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isDeliveryCostModalOpen}
                onClose={() => setIsDeliveryCostModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isDeliveryCostModalOpen}>
                    <Box sx={style}>
                        <span className="close">
                            <FaTimes
                                onClick={() =>
                                    setIsDeliveryCostModalOpen(false)
                                }
                            />
                        </span>
                        {oneRow(
                            <FiMinimize2 className="delivery-icon" />,
                            'min. bahasy',
                            'startPoint'
                        )}
                        {oneRow(
                            <FiMaximize2 className="delivery-icon" />,
                            'max. bahasy',
                            'endPoint'
                        )}
                        {oneRow(
                            <GiReceiveMoney className="delivery-icon" />,
                            'Töleg',
                            'price'
                        )}

                        <div className="delivery-cost-one-row">
                            <div className="left">
                                <MdAttachMoney className="delivery-icon" />

                                <span>Pul birligi</span>
                            </div>
                            <div className="right">
                                <Select
                                    displayEmpty
                                    code="demo-simple-select-outlined"
                                    value={deliveryCostSendInfo.priceCurrencyId}
                                    onChange={(e) =>
                                        setDeliveryCostSendInfo({
                                            ...deliveryCostSendInfo,
                                            priceCurrencyId: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem disabled value="null">
                                        <em>Saýla</em>
                                    </MenuItem>
                                    {currenciesList?.map((card) => {
                                        return (
                                            <MenuItem
                                                value={card.id}
                                                key={card}
                                            >
                                                {card.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
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

const mapStateToProps = (state) => {
    return {
        deliveryCostSendInfo: state.deliveryCostSendInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDeliveryCostSendInfo: (info) =>
            dispatch(setDeliveryCostSendInfo(info)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryCostModal);
