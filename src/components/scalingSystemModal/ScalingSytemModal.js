import React from 'react';
import './scalingSystemModal.scss';
import Button from '@material-ui/core/Button';
import { fetchForAdminWithUpdateToast, BACKEND_URL } from '../../functions';
import { Backdrop, Box, Modal, Fade } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import { RiSpace } from 'react-icons/ri';
import { setScalingSystemItemSendInfo } from '../../redux/actions/scalingSystemActions';
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

function ScalingSystemModal(props) {
    const {
        isScalingSystemModalOpen,
        setIsScalingSystemModalOpen,
        setScalingSystemItemSendInfo,
        scalingSystemItemSendInfo,
        fetchScalingSystemsInfo,
    } = props;

    const handleSaveButton = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/barcodeScaleSystems/${
                    scalingSystemItemSendInfo.id
                        ? scalingSystemItemSendInfo.id
                        : ''
                }`,
                body: JSON.stringify(scalingSystemItemSendInfo),
                notifyMessage: 'Kaydediliyor ...',
                updateMessage: 'Kaydedildi',
                method: scalingSystemItemSendInfo.id ? 'PUT' : 'POST',
            },
            (data) => {
                if (data !== 'err') {
                    fetchScalingSystemsInfo();
                    setIsScalingSystemModalOpen(false);
                }
            }
        );
    };

    const oneRow = (leftIcon, leftValue, rightValue) => {
        return (
            <div className="system-modal-one-row">
                <div className="left">
                    {leftIcon}
                    <span>{leftValue}</span>
                </div>
                <div className="right">
                    <input
                        type="number"
                        value={scalingSystemItemSendInfo[rightValue]}
                        onChange={(e) => {
                            setScalingSystemItemSendInfo({
                                ...scalingSystemItemSendInfo,
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
                className="scaling-system-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isScalingSystemModalOpen}
                onClose={() => setIsScalingSystemModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isScalingSystemModalOpen}>
                    <Box sx={style}>
                        <span className="close">
                            <FaTimes
                                onClick={() =>
                                    setIsScalingSystemModalOpen(false)
                                }
                            />
                        </span>
                        {oneRow(
                            <RiSpace className="system-icon" />,
                            'Ön basamak',
                            'barcodePrefix'
                        )}
                        {oneRow(
                            <RiSpace className="system-icon" />,
                            'Ürün kodu basamak',
                            'productIdentityLength'
                        )}
                        {oneRow(
                            <RiSpace className="system-icon" />,
                            'Miktar basamak',
                            'scalingLength'
                        )}
                        {oneRow(
                            <RiSpace className="system-icon" />,
                            'Kontrol basamak',
                            'divider'
                        )}

                        <div className="buttons-system">
                            <Button
                                className="save-button-system"
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
        scalingSystemItemSendInfo: state.scalingSystemItemSendInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setScalingSystemItemSendInfo: (info) =>
            dispatch(setScalingSystemItemSendInfo(info)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ScalingSystemModal);
