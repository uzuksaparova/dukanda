import React, { useEffect, useState } from 'react';
import './syncScheduleHistory.scss';
import Loading from '../Loading';
import { useParams } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { HiInformationCircle } from 'react-icons/hi';
import HistoryMessageModal from './historyMessageModal/HistoryMessageModal';
import { Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    BACKEND_URL,
    deleteForAdmin,
    fetchSyncScheduleHistoryInfo,
    functionTranslator,
} from '../../functions';
import {
    setSyncHistoriesData,
    setSyncHistorySendInfo,
} from '../../redux/actions/syncActions';
import { connect } from 'react-redux';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import TableComponent from '../tableComponent/TableComponent';

const columns = [
    { id: 'status', label: 'Statusy', minWidth: 100 },
    {
        id: 'functionName',
        label: 'Funksiýa Ady',
        minWidth: 100,
        align: 'left',
    },

    {
        id: 'isQuickSync',
        label: 'Çalt sinhronlamak',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'updateCount',
        label: 'Täzelenen maglumat sany',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'insertCount',
        label: 'Täze goşulan maglumat sany',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'createdAt',
        label: 'Başlan wagty',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'updatedAt',
        label: 'Gutaran wagty',
        minWidth: 100,
        align: 'center',
    },
];

function SyncScheduleHistory(props) {
    const {
        syncHistoriesData,
        isSidebarOpen,
        setSyncHistorySendInfo,
        syncHistorySendInfo,
        setSyncHistoriesData,
        isError,
    } = props;
    const { noData, isEnd, data } = syncHistoriesData;

    const { id } = useParams();
    const [infoPassModal, setInfoPassModal] = useState({});
    const [isHistoryMessageModalOpen, setIsHistoryMessageModalOpen] =
        useState(false);

    const handleClearHistory = () => {
        const result = window.confirm(
            'Do you really want to clear the sync history?'
        );
        if (result) {
            deleteForAdmin(
                {
                    url: `${BACKEND_URL}/admin/sync/history`,
                    notifyMessage: 'Taryhlar pozulýar',
                    updateMessage: 'Taryhlar pozuldy',
                },
                (data) => {
                    setSyncHistoriesData({
                        ...syncHistoriesData,
                        data: [],
                        noData: true,
                    });
                }
            );
        }
    };

    useEffect(() => {
        let temp = syncHistorySendInfo;
        temp.scheduleId = id;
        temp.offset = 0;
        setSyncHistorySendInfo(temp);
        fetchSyncScheduleHistoryInfo(true, temp);
        // eslint-disable-next-line
    }, []);

    const tableButton = (row) => {
        return (
            <IconButton
                className="info-icon"
                onClick={() => {
                    setIsHistoryMessageModalOpen(true);
                    setInfoPassModal({
                        message: row.message,
                    });
                }}
            >
                <HiInformationCircle />
            </IconButton>
        );
    };

    const handleRowValue = (column, row, i) => {
        return column.id === 'status' ? (
            <div
                className="chip-div"
                style={{
                    backgroundColor: `${
                        row.status === 'success'
                            ? 'rgba(0, 135, 107, 0.5)'
                            : 'rgba(255, 0, 26, 0.5)'
                    }`,
                }}
            >
                <span>
                    {row.status === 'success'
                        ? 'Şowly'
                        : row.status === 'fail'
                        ? 'Şowsuz'
                        : ''}
                </span>
            </div>
        ) : column.id === 'functionName' ? (
            functionTranslator(row[column.id])
        ) : column.id === 'isQuickSync' ? (
            <div
                className="chip-div"
                style={{
                    backgroundColor: `${
                        row.isQuickSync ? 'rgb(40 195 244)' : 'rgb(255 206 0 )'
                    }`,
                }}
            >
                <span>{row.isQuickSync ? 'Hawa' : 'Yok'}</span>
            </div>
        ) : (
            row[column.id]
        );
    };
    const handleFetchMore = () => {
        fetchSyncScheduleHistoryInfo();
    };

    return (
        <div className={`sync-schedule-history`}>
            {!data.length ? (
                isError ? (
                    <ErrorComponent />
                ) : noData ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : (
                <TableComponent
                    columns={columns}
                    data={syncHistoriesData}
                    handleRowValue={handleRowValue}
                    buttonExist={true}
                    tableButton={tableButton}
                    handleFetchMore={handleFetchMore}
                />
            )}
            {!id ? (
                <div className="sync-history-delete-button">
                    <Fab
                        color="secondary"
                        aria-label="edit"
                        onClick={handleClearHistory}
                    >
                        <DeleteIcon />
                    </Fab>
                </div>
            ) : null}
            <HistoryMessageModal
                info={infoPassModal}
                isHistoryMessageModalOpen={isHistoryMessageModalOpen}
                setIsHistoryMessageModalOpen={setIsHistoryMessageModalOpen}
            />
            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        syncHistoriesData: state.syncHistoriesData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        isError: state.isError.isError,
        syncHistorySendInfo: state.syncHistorySendInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSyncHistoriesData: (data) => dispatch(setSyncHistoriesData(data)),
        setSyncHistorySendInfo: (data) =>
            dispatch(setSyncHistorySendInfo(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SyncScheduleHistory);
