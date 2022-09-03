import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './clientCardCounterModal.scss';
import { Backdrop, Box, Modal, Fade } from '@material-ui/core';
import ReactCountdownClock from 'react-countdown-clock';
import { FaTimes } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { Button } from '@mui/material';

function ClientCardCounterModal(props) {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });
    const [isCountingFinished, setIsCountingFinished] = useState(false);

    const {
        isClientCardCounterModalOpen,
        setIsClientCardCounterModalOpen,
        qrGenerator,
    } = props;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        padding: '15px',
        maxWidth: '350px',
    };

    const handleCounterComplete = () => {
        setIsCountingFinished(true);
        // setIsClientCardCounterModalOpen(false);
        // qrGenerator();
    };

    useEffect(() => {
        !isClientCardCounterModalOpen && setIsCountingFinished(false);
    }, [isClientCardCounterModalOpen]);

    const handleOkClick = () => {
        setIsClientCardCounterModalOpen(false);
        qrGenerator();
    };

    return (
        <Modal
            className="client-qr-modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isClientCardCounterModalOpen}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            onClose={() => setIsClientCardCounterModalOpen(false)}
        >
            <Fade in={isClientCardCounterModalOpen}>
                <Box sx={style}>
                    <span className="close" style={{ height: '20px' }}>
                        <FaTimes
                            onClick={() =>
                                setIsClientCardCounterModalOpen(false)
                            }
                        />
                    </span>
                    <div className="client-card-counter-modal">
                        <ReactCountdownClock
                            seconds={30}
                            color="#e9601f"
                            alpha={0.9}
                            size={isMobileScreen ? 200 : 280}
                            onComplete={handleCounterComplete}
                            showMilliseconds={false}
                        />
                        <div className="card-counter-writings">
                            Müşderiniň indirim karty öňden hem birnäçe enjamlara
                            baglanan siz hakykatdan hem QR okatmak
                            isleýärsiňizmi?
                        </div>

                        <div className="buttons ">
                            <Button
                                onClick={handleOkClick}
                                className="save-button"
                                disabled={!isCountingFinished}
                            >
                                Hawa
                            </Button>
                            <Button
                                onClick={() =>
                                    setIsClientCardCounterModalOpen(false)
                                }
                                className="save-button"
                            >
                                Ýok
                            </Button>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        clientData: state.clientData,
    };
};
export default connect(mapStateToProps)(ClientCardCounterModal);
