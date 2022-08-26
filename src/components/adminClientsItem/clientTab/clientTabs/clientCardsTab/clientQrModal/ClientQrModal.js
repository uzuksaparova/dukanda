import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import './clientQrModal.scss';
import { Backdrop, Box, Modal, Fade } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import { BiRename } from 'react-icons/bi';
import { BsCreditCard2Back } from 'react-icons/bs';
import { RiDeviceLine } from 'react-icons/ri';
import { BACKEND_URL, fetchForAdmin } from '../../../../../../functions';

function ClientQrModal(props) {
    const {
        cardInfo,
        decodedToken,
        isClientQrModalOpen,
        setIsClientQrModalOpen,
        clientData,
    } = props;
    const [qrObject, setQrObject] = useState({});

    useEffect(() => {
        let bodySend = {
            employeeId: decodedToken.id,
            cardNo: cardInfo?.cardNo,
            clientId: cardInfo?.clientId,
            clientCardId: cardInfo?.id,
            firmUUID: clientData?.firmUUID,
        };
        if (isClientQrModalOpen && Object.keys(cardInfo).length) {
            fetchForAdmin(
                {
                    url: `${BACKEND_URL}/admin/clients/qrDevice/qrGenerate`,
                    method: 'POST',
                    body: bodySend,
                },
                (data) => {
                    setQrObject(data.qrData);
                }
            );
        }
    }, [cardInfo]);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        padding: '15px',
    };

    const oneRow = (leftIcon, leftValue, rightValue) => {
        return (
            <div className="one-row">
                <div className="left">
                    {leftIcon} <span className="left-value">{leftValue}</span>
                </div>
                <div className="right">{rightValue}</div>
            </div>
        );
    };
    return (
        <Modal
            className="client-qr-modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isClientQrModalOpen}
            onClose={() => setIsClientQrModalOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isClientQrModalOpen}>
                <Box sx={style}>
                    <span className="close" style={{ height: '20px' }}>
                        <FaTimes
                            onClick={() => setIsClientQrModalOpen(false)}
                        />
                    </span>
                    <div className="division-qr">
                        <QRCode
                            id="qr-gen"
                            value={qrObject}
                            size={250}
                            level={'L'}
                            includeMargin={true}
                            title="Müşderi Kart QR"
                        />
                        <div className="client-qr-info">
                            {oneRow(<BiRename />, 'Ady', clientData.name)}
                            {oneRow(
                                <BsCreditCard2Back />,
                                'Kart No',
                                cardInfo.cardNo
                            )}
                            {oneRow(
                                <RiDeviceLine />,
                                'Enjam sany',
                                cardInfo?.qrCardDevices.length
                            )}
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        decodedToken: state.decodedToken.decodedToken,
        clientData: state.clientData,
    };
};
export default connect(mapStateToProps)(ClientQrModal);
