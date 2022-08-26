import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './clientsCommentModal.scss';
import { AiOutlineComment } from 'react-icons/ai';
import Button from '@material-ui/core/Button';
import {
    fetchForAdminWithUpdateToast,
    fetchForAdmin,
    commentTypeTranslator,
    BACKEND_URL,
} from '../../../functions';

import {
    Backdrop,
    Box,
    Modal,
    Fade,
    FormControl,
    Select,
    MenuItem,
} from '@material-ui/core';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import { RichTextField } from 'mui-quill';
import { setClientData } from '../../../redux/actions/clientActions';
import { connect } from 'react-redux';
import * as authorizationn from '../../authorization.json';

const authorization = authorizationn.default;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function ClientsItemModal(props) {
    const {
        isClientsCommentModalOpen,
        setIsClientsCommentModalOpen,
        clientData,
        setClientData,
        decodedToken,
    } = props;
    const { id } = useParams();

    const [newCommentSendInfo, setNewCommentSendInfo] = useState({
        clientId: id,
        commentType: 'financial',
    });
    const [comment, setComment] = useState('');
    const [commentTypes, setCommentTypes] = useState([]);

    useEffect(() => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/clients/comment/types`,
                method: 'GET',
            },
            (data) => {
                setCommentTypes(data);
            }
        );
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setNewCommentSendInfo({
            clientId: id,
            commentType: 'financial',
        });
        setComment('');
    }, [isClientsCommentModalOpen]);
    const onSaveButtonClick = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/clients/comment`,
                body: JSON.stringify({
                    ...newCommentSendInfo,
                    comment: comment,
                }),
                notifyMessage: 'Saving ...',
                updateMessage: 'Saved',
            },
            (data) => {
                let temp = clientData;
                temp.comments.push(data);
                setClientData({ ...temp });
            }
        );
    };

    return (
        <div>
            <Modal
                className="client-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isClientsCommentModalOpen}
                onClose={() => setIsClientsCommentModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isClientsCommentModalOpen}>
                    <Box sx={style}>
                        <span className="close">
                            <FaTimes
                                onClick={() =>
                                    setIsClientsCommentModalOpen(false)
                                }
                            />
                        </span>
                        <div className="client-body">
                            <div className="client-comment-one-row">
                                <div className="left">
                                    <FaCommentDots className="employee-icon" />
                                    <span>Bellik görnüşi</span>
                                </div>
                                <div className="right">
                                    {commentTypes.length && (
                                        <FormControl className="form-control">
                                            <Select
                                                placeholder="Bellik görnüşi saylan"
                                                code="demo-simple-select-outlined"
                                                value={
                                                    newCommentSendInfo.commentType
                                                }
                                                onChange={(e) => {
                                                    setNewCommentSendInfo({
                                                        ...newCommentSendInfo,
                                                        commentType:
                                                            e.target.value,
                                                    });
                                                }}
                                                label={'Bellik görnüşi'}
                                            >
                                                {commentTypes?.map(
                                                    (comment) => {
                                                        return (
                                                            <MenuItem
                                                                value={comment}
                                                                key={comment}
                                                            >
                                                                {
                                                                    commentTypeTranslator(
                                                                        comment
                                                                    )
                                                                        .translation
                                                                }
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </FormControl>
                                    )}
                                </div>
                            </div>
                            <div className="client-comment-one-row row-with-quill">
                                <div className="left">
                                    <AiOutlineComment className="employee-icon" />
                                    <span>Bellik</span>
                                </div>
                                <div className="right">
                                    <RichTextField
                                        value={comment}
                                        onChange={(e) => {
                                            setComment(e);
                                        }}
                                        variant="outlined"
                                        options={{
                                            toolbar: true,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="buttons ">
                            <Button
                                onClick={onSaveButtonClick}
                                className="save-button"
                                disabled={
                                    authorization[decodedToken.role].includes(
                                        'updateClient'
                                    )
                                        ? false
                                        : true
                                }
                            >
                                Kaydet
                            </Button>
                            <Button
                                onClick={(e) => {
                                    setIsClientsCommentModalOpen(false);
                                }}
                                className="cancel-button"
                                variant="outlined"
                                disabled={
                                    authorization[decodedToken.role].includes(
                                        'updateClient'
                                    )
                                        ? false
                                        : true
                                }
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
        clientData: state.clientData,
        decodedToken: state.decodedToken.decodedToken,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClientData: (info) => dispatch(setClientData(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientsItemModal);
