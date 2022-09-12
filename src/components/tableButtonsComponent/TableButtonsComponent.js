import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { FaEye, FaHistory, FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as authorizationn from './../authorization.json';
import './tableButtonsComponent.scss';
import { BiDevices } from 'react-icons/bi';
import { MdQrCode2 } from 'react-icons/md';
import { CgHome } from 'react-icons/cg';
import { AiOutlineDownload } from 'react-icons/ai';

const authorization = authorizationn.default;

function TableButtonsComponent(props) {
    const {
        disabledValue = '',
        handleEditClick,
        handleDeleteClick,
        handleViewClick,
        row,
        decodedToken,
        view,
        viewPath,
        history,
        historyPath,
        handleHistoryClick,
        handleQrClick,
        handleDevicesClick,
        handleStockClick,
        editPath = '',
        handleDownloadClick,
    } = props;

    return (
        <div
            className="table-buttons"
            style={{ width: handleStockClick ? '100px' : '150px' }}
        >
            {handleEditClick || editPath ? (
                <IconButton
                    className="first-button"
                    disabled={
                        disabledValue
                            ? authorization[decodedToken.role].includes(
                                  disabledValue
                              )
                                ? false
                                : true
                            : false
                    }
                    onClick={() =>
                        editPath ? console.log('') : handleEditClick(row)
                    }
                    component={editPath ? Link : ''}
                    to={editPath}
                >
                    <FaPencilAlt className="table-icon" />
                </IconButton>
            ) : null}
            {handleDownloadClick ? (
                <IconButton
                    className="first-button"
                    disabled={
                        disabledValue
                            ? authorization[decodedToken.role].includes(
                                  disabledValue
                              )
                                ? false
                                : true
                            : false
                    }
                    onClick={() => handleDownloadClick(row)}
                >
                    <AiOutlineDownload className="table-icon" />
                </IconButton>
            ) : null}
            {handleDeleteClick ? (
                <IconButton
                    disabled={
                        disabledValue
                            ? authorization[decodedToken.role].includes(
                                  disabledValue
                              )
                                ? false
                                : true
                            : false
                    }
                    className="second-button"
                    onClick={() => handleDeleteClick(row.id)}
                    style={{
                        borderRadius: `${
                            view || history ? '0' : '0 3px 3px 0'
                        }`,
                    }}
                >
                    <RiDeleteBin6Line className="table-icon" />
                </IconButton>
            ) : null}
            {handleStockClick ? (
                <IconButton
                    disabled={
                        authorization[decodedToken.role].includes(
                            'seeProductStock'
                        )
                            ? false
                            : true
                    }
                    className="second-button"
                    onClick={() => handleStockClick(row.id)}
                    style={{
                        borderRadius: `${
                            view || history ? '0' : '0 3px 3px 0'
                        }`,
                    }}
                >
                    <CgHome className="table-icon" />
                </IconButton>
            ) : null}

            {history ? (
                historyPath ? (
                    <IconButton
                        disabled={
                            disabledValue
                                ? authorization[decodedToken.role].includes(
                                      disabledValue
                                  )
                                    ? false
                                    : true
                                : false
                        }
                        className="second-button"
                        component={Link}
                        to={historyPath}
                    >
                        <FaHistory className="table-icon" />
                    </IconButton>
                ) : (
                    <IconButton
                        disabled={
                            disabledValue
                                ? authorization[decodedToken.role].includes(
                                      disabledValue
                                  )
                                    ? false
                                    : true
                                : false
                        }
                        className="second-button"
                        onClick={() => handleHistoryClick(row.id)}
                    >
                        <FaHistory className="table-icon" />
                    </IconButton>
                )
            ) : null}
            {view ? (
                viewPath ? (
                    <IconButton
                        disabled={
                            disabledValue
                                ? authorization[decodedToken.role].includes(
                                      disabledValue
                                  )
                                    ? false
                                    : true
                                : false
                        }
                        className="third-button"
                        component={Link}
                        to={viewPath}
                    >
                        <FaEye className="table-icon" />
                    </IconButton>
                ) : (
                    <IconButton
                        disabled={
                            disabledValue
                                ? authorization[decodedToken.role].includes(
                                      disabledValue
                                  )
                                    ? false
                                    : true
                                : false
                        }
                        className="third-button"
                        onClick={() => handleViewClick(row)}
                    >
                        <FaEye className="table-icon" />
                    </IconButton>
                )
            ) : null}
            {handleDevicesClick ? (
                <Tooltip
                    title="Kart enjamlary"
                    placement="bottom"
                    className="tooltip"
                >
                    <IconButton
                        className="first-button"
                        disabled={
                            disabledValue
                                ? authorization[decodedToken.role].includes(
                                      disabledValue
                                  )
                                    ? false
                                    : true
                                : false
                        }
                        onClick={() => handleDevicesClick(row)}
                        component={row.qrCardDevices.length ? Link : ''}
                        to={`/qrDevices`}
                    >
                        <BiDevices className="table-icon" />
                    </IconButton>
                </Tooltip>
            ) : null}
            {handleQrClick ? (
                <Tooltip
                    title="Kart qr kody"
                    placement="bottom"
                    className="tooltip"
                >
                    <IconButton
                        disabled={
                            authorization[decodedToken.role].includes(
                                disabledValue
                            ) &&
                            decodedToken.role !== 'operator' &&
                            decodedToken.role !== 'moderator'
                                ? false
                                : true
                        }
                        className="second-button"
                        onClick={() => handleQrClick(row)}
                        style={{
                            borderRadius: `${
                                view || history ? '0' : '0 3px 3px 0'
                            }`,
                        }}
                    >
                        <MdQrCode2 className="table-icon" />
                    </IconButton>
                </Tooltip>
            ) : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        decodedToken: state.decodedToken.decodedToken,
    };
};
export default connect(mapStateToProps)(TableButtonsComponent);
