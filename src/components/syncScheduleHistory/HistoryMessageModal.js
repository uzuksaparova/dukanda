import React from 'react';

import { Backdrop, Box, Modal, Fade } from '@material-ui/core';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: '90vh',
    overflow: 'auto',
    padding: '15px',
};

function HistoryMessageModal(props) {
    const { isHistoryMessageModalOpen, setIsHistoryMessageModalOpen } = props;

    return (
        <div>
            <Modal
                className="device-modal"
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
                    <Box sx={style}>
                        <pre>{JSON.stringify(props.info, null, 2)}</pre>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default HistoryMessageModal;
