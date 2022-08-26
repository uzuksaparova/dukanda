import React from 'react';
import './historyMessageModal.scss';
import { Backdrop, Box, Modal, Fade } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';

function HistoryMessageModal(props) {
    const { isHistoryMessageModalOpen, setIsHistoryMessageModalOpen } = props;

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isHistoryMessageModalOpen}
                onClose={() => setIsHistoryMessageModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isHistoryMessageModalOpen}>
                    <Box className="history-message-modal">
                        <span className="close">
                            <FaTimes
                                onClick={() =>
                                    setIsHistoryMessageModalOpen(false)
                                }
                            />
                        </span>
                        <pre>{JSON.stringify(props.info, null, 2)}</pre>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default HistoryMessageModal;
