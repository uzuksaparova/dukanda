import React, { useState, useRef } from 'react';
import './dukandaVersionControlModal.scss';
import { Backdrop, Box, Modal, Fade } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { VscVersions } from 'react-icons/vsc';
import { ImBoxAdd } from 'react-icons/im';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import {
    BACKEND_URL,
    fetchDukandaVersionControlInfo,
    fetchForAdminWithUpdateToast,
} from '../../functions';
import Cookies from 'js-cookie';
import { BsFileEarmarkCodeFill } from 'react-icons/bs';

function DukandaVersionControlModal(props) {
    const {
        isDvcItemModalOpen,
        setIsDvcItemModalOpen,
        versionSendInfo,
        setVersionSendInfo,
    } = props;
    const appInput = useRef(null);

    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

    var token = Cookies.get('admin_token');
    var bearer = 'Bearer ' + token;

    const style = {
        position: 'absolute ',
        top: '50% ',
        left: '50% ',
        transform: 'translate(-50%, -50%) ',
        bgcolor: 'background.paper',
        boxShadow: 24,
    };

    const versionAddOneRow = (leftIcon, leftName, rowType) => {
        return (
            <div className="version-add-one-row">
                <div className="version-one-row-left">
                    {leftIcon}
                    <span>{leftName}</span>
                </div>
                <div className="version-one-row-right">
                    <input
                        type="text"
                        placeholder={leftName}
                        value={versionSendInfo[rowType]}
                        onChange={(e) =>
                            setVersionSendInfo({
                                ...versionSendInfo,
                                [rowType]: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        );
    };

    const handleAppAdd = (e) => {
        console.log(e);
        if (e.target.files[0]) {
            let file = e.target.files[0];
            setVersionSendInfo({ ...versionSendInfo, file });
        }
    };
    const addAppReferencing = () => {
        appInput.current.click();
    };

    const handleSaveButton = () => {
        const result = window.confirm(
            'Siz hakykatdan hem programma ýüklemek isleýäňizmi?'
        );
        if (result) {
            const formData = new FormData();
            formData.append('app', versionSendInfo.file);
            formData.append('version', versionSendInfo.version);
            formData.append('os', versionSendInfo.os);

            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/qrApp`,
                    body: formData,
                    headers: {
                        Authorization: bearer,
                    },
                    notifyMessage: 'Kaydediliyor...',
                    updateMessage: 'Basariyla kaydedildi',
                },
                (data) => {
                    if (data !== 'err') {
                        fetchDukandaVersionControlInfo(true);
                    }
                }
            );
        }
    };

    const options = ['android', 'ios', 'windows'];

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isDvcItemModalOpen}
                onClose={() => setIsDvcItemModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isDvcItemModalOpen}>
                    <Box sx={style} className="version-control-modal">
                        <div
                            className="close-div"
                            onClick={() => setIsDvcItemModalOpen(false)}
                        >
                            <FaTimes />
                        </div>
                        <div className="version-add">
                            {versionAddOneRow(
                                <VscVersions className="version-icon" />,
                                'Wersiyasy',
                                'version'
                            )}
                            <div className="version-add-one-row">
                                <div className="version-one-row-left">
                                    <MdOutlineSettingsSuggest className="version-icon" />
                                    <span>OS</span>
                                </div>
                                <div className="version-one-row-right">
                                    <FormControl className="form-control">
                                        <Select
                                            placeholder="Işgär saylan"
                                            code="demo-simple-select-outlined"
                                            value={versionSendInfo.os}
                                            onChange={(e) =>
                                                setVersionSendInfo({
                                                    ...versionSendInfo,
                                                    os: e.target.value,
                                                })
                                            }
                                        >
                                            {options.map((opt, i) => {
                                                return (
                                                    <MenuItem
                                                        value={opt}
                                                        key={i}
                                                        style={{
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    >
                                                        {opt}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            {versionSendInfo.file ? (
                                <div className="add-app">
                                    <BsFileEarmarkCodeFill />
                                </div>
                            ) : (
                                <div className="add-app">
                                    <input
                                        type="file"
                                        onChange={(e) => handleAppAdd(e)}
                                        style={{ display: 'none' }}
                                        ref={appInput}
                                        onClick={(e) => (e.target.value = null)}
                                    />
                                    <Button onClick={addAppReferencing}>
                                        <ImBoxAdd />
                                    </Button>
                                </div>
                            )}
                            <div className="version-buttons">
                                <Button
                                    className="save-button-version"
                                    onClick={handleSaveButton}
                                >
                                    Kaydet
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default DukandaVersionControlModal;
