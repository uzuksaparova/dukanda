import React from 'react';
import EmptyComponent from '../../../../emptyComponent/EmptyComponent';
import { deepOrange } from '@material-ui/core/colors';
import { RichTextField } from 'mui-quill';
import {
    BACKEND_URL,
    roleTranslator,
    commentTypeTranslator,
    deleteForAdmin,
} from '../../../../../functions';
import { Link } from 'react-router-dom';
import { Avatar, Box, IconButton } from '@material-ui/core';
import { setClientData } from '../../../../../redux/actions/clientActions';
import { connect } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import * as authorizationn from '../../../../authorization.json';
import AddItemComponent from '../../../../addItemComponent/AddItemComponent';
import './clientTab3.scss';

const authorization = authorizationn.default;

function ClientTab3(props) {
    const {
        clientData,
        setIsClientsCommentModalOpen,
        setClientData,
        decodedToken,
    } = props;

    const onClickHandler = () => {
        setIsClientsCommentModalOpen(true);
    };
    const handleDeleteComment = (id) => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/clients/comment/${id}`,
                notifyMessage: 'Bellik pozulýar',
                updateMessage: 'Bellik pozuldy',
            },
            (data) => {
                var tempo = clientData.comments;
                var tempoFilter = tempo.filter((temp) => temp.id !== id);
                setClientData({
                    ...clientData,
                    comments: [...tempoFilter],
                });
            }
        );
    };
    return (
        <>
            <div className="client-comments">
                {clientData?.comments.length ? (
                    clientData.comments.map((cd, i) => {
                        return (
                            <div className="comment-item" key={cd.id}>
                                <div className="comment-header">
                                    <div className="comment-profile">
                                        <Avatar
                                            sx={{
                                                bgcolor: deepOrange[500],
                                                width: 15,
                                                height: 15,
                                            }}
                                            alt={cd?.employee?.userName?.toUpperCase()}
                                            src={`${BACKEND_URL}/images/employees/${cd?.employee?.image}`}
                                        />
                                        <div className="profile-right">
                                            <div>
                                                {cd.employee?.firstName +
                                                    ' ' +
                                                    cd.employee?.lastName}
                                            </div>
                                            <div className="comment-bottom">
                                                {roleTranslator(
                                                    cd?.employee?.role
                                                )}
                                                <Box
                                                    className="client-username"
                                                    component={Link}
                                                    to={{
                                                        pathname: `/employees/${cd.employee.id}`,
                                                    }}
                                                >
                                                    @{cd?.employee?.userName}
                                                </Box>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-item-right">
                                        <div className="comment-type">
                                            {
                                                commentTypeTranslator(
                                                    cd.commentType
                                                ).translation
                                            }
                                        </div>
                                        {cd.employee.id === decodedToken.id ? (
                                            <IconButton
                                                className="first-button"
                                                disabled={
                                                    authorization[
                                                        decodedToken.role
                                                    ].includes('updateClient')
                                                        ? false
                                                        : true
                                                }
                                                onClick={() =>
                                                    handleDeleteComment(cd.id)
                                                }
                                            >
                                                <RiDeleteBin6Line className="table-icon" />
                                            </IconButton>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="comment-body">
                                    <RichTextField
                                        disabled
                                        value={cd.comment
                                            .replace(/&lt;/g, '<')
                                            .replace(/&gt;/g, '>')}
                                        variant="outlined"
                                        options={{
                                            toolbar: false,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <EmptyComponent />
                )}
            </div>
            <AddItemComponent
                disabledValue="updateClient"
                onClickHandler={onClickHandler}
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        decodedToken: state.decodedToken.decodedToken,
        clientData: state.clientData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setClientData: (data) => dispatch(setClientData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientTab3);
