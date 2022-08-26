import React, { useEffect } from 'react';
import './syncSchedule.scss';
import Loading from '../../Loading';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
    BACKEND_URL,
    deleteForAdmin,
    fetchSyncSchedulesInfo,
} from '../../../functions';
import {
    setSyncScheduleData,
    setSyncSchedulesData,
} from '../../../redux/actions/syncActions';
import { setSidebarSearchValue } from '../../../redux/actions/sidebarActions';
import { connect } from 'react-redux';
import TableButtonsComponent from '../../tableButtonsComponent/TableButtonsComponent';
import ErrorComponent from '../../errorComponent/ErrorComponent';
import EmptyComponent from '../../emptyComponent/EmptyComponent';
import AddItemComponent from '../../addItemComponent/AddItemComponent';
import TableComponent from '../../tableComponent/TableComponent';

const columns = [
    { id: 'name', label: 'Ady', minWidth: 100 },
    {
        id: 'description',
        label: 'Beýany',
        minWidth: 100,
        align: 'left',
    },

    {
        id: 'repetitionType',
        label: 'Gaytalanmagy',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'startDate',
        label: 'Başlanýan wagty',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'endDate',
        label: 'Gutarýan wagty',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'active',
        label: 'Status',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'nextRunTime',
        label: 'Indiki işlemeli wagty',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'lastRunTime',
        label: 'Iň soňky işlän wagty',
        minWidth: 100,
        align: 'left',
    },
];

function SyncSchedule(props) {
    const history = useHistory();

    const {
        syncSchedulesData,
        setSyncScheduleData,
        setSidebarSearchValue,
        setSyncSchedulesData,
        isError,
    } = props;
    const { data: scheduleData, noData } = syncSchedulesData;

    useEffect(() => {
        setSidebarSearchValue('');
        if (!scheduleData.length) {
            fetchSyncSchedulesInfo();
        }
        // eslint-disable-next-line
    }, []);

    const handleSynScheduleAdd = () => {
        setSyncScheduleData({
            id: '',
            code: '',
            name: '',
            tm_code: '',
            tr_code: '',
            ru_code: '',
            en_code: '',
            tm_name: '',
            tr_name: '',
            en_name: '',
            ru_name: '',
        });
    };

    const displayWeekDays = (weekDays) => {
        let wd = [];
        weekDays.forEach((day) => {
            switch (day) {
                case 0:
                    wd.push('ýekşenbe');
                    break;
                case 1:
                    wd.push('duşenbe');
                    break;
                case 2:
                    wd.push('sişenbe');
                    break;
                case 3:
                    wd.push('çarşenbe');
                    break;
                case 4:
                    wd.push('penşenbe');
                    break;
                case 5:
                    wd.push('anna');
                    break;
                case 6:
                    wd.push('şenbe');
                    break;
                default:
                    return null;
            }
        });
        return (
            <div>
                {wd.map((d, i) => {
                    return (
                        <span className="week-days" key={d}>
                            {d}
                            {i === wd.length - 1 ? '' : ', '}
                        </span>
                    );
                })}
            </div>
        );
    };

    const handleDeleteSchedule = (id) => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/sync/schedules/${id}`,
                notifyMessage: 'Schedule pozulýar',
                updateMessage: 'Schedule pozuldy',
            },
            (data) => {
                var tempo = scheduleData;
                var tempoFilter = tempo.filter((temp) => temp.id !== id);
                setSyncSchedulesData({
                    ...syncSchedulesData,
                    data: tempoFilter,
                });
            }
        );
    };
    const handleEditClick = (row) => {
        history.push(`/syncs/sschedules/${row.id}`);
    };

    const handleActiveCell = (row) => {
        return (
            <div
                className="chip-div"
                style={{
                    backgroundColor: `${
                        row.active
                            ? 'rgba(0, 135, 107, 0.5)'
                            : 'rgba(255, 0, 26, 0.5)'
                    }`,
                }}
            >
                <span>{row.active ? 'aktiw' : 'passiw'}</span>
            </div>
        );
    };

    const handleRepetitionTypeCell = (row) => {
        return (
            <>
                {row.repetitionType === 'daysOfWeek' ? (
                    <div
                        style={{
                            padding: '7px',
                        }}
                    >
                        Hepdäniň günleri:
                        <br />
                        {displayWeekDays(row.weekDays)}
                    </div>
                ) : row.repetitionType === 'daysOfMonth' ? (
                    <div
                        style={{
                            padding: '7px',
                        }}
                    >
                        Aýyň günleri:
                        <br />
                        {row.dates.map((d, i) => {
                            return (
                                <span key={d}>
                                    {d}
                                    {i === row.dates.length - 1 ? '' : ', '}
                                </span>
                            );
                        })}
                    </div>
                ) : row.repetitionType === 'onceExecution' ? (
                    <div
                        style={{
                            padding: '7px',
                        }}
                    >
                        Bir gezek: <br />
                        {row.onceDateTime}
                    </div>
                ) : (
                    <div
                        style={{
                            padding: '7px',
                        }}
                    >
                        Her gün
                    </div>
                )}
                <div className="date-display">
                    {row?.hours?.length &&
                        row.hours?.map((hour) => (
                            <div
                                key={hour}
                                className="chip-div"
                                style={{
                                    backgroundColor: 'rgba(189, 189, 189, 0.5)',
                                    color: 'rgba(0, 0, 0, 0.5)',
                                    fontWeight: 'bolder',
                                }}
                            >
                                <span>{`${
                                    hour < 10 ? '0' + Number(hour) : hour
                                }:${
                                    row?.minute < 10
                                        ? '0' + Number(row?.minute)
                                        : row?.minute
                                }`}</span>
                            </div>
                        ))}
                </div>
            </>
        );
    };

    const handleRowValue = (column, row) => {
        return column.id === 'repetitionType'
            ? handleRepetitionTypeCell(row)
            : column.id === 'active'
            ? handleActiveCell(row)
            : row[column.id];
    };

    const tableButton = (row) => {
        return (
            <TableButtonsComponent
                disabledValue="updateSyncSchedule"
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteSchedule}
                row={row}
                history={true}
                historyPath={`/syncs/sschedules/histories/${row.id}`}
            />
        );
    };

    return (
        <div className={`sync-schedules`}>
            {!scheduleData.length ? (
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
                    data={scheduleData}
                    handleRowValue={handleRowValue}
                    buttonExist={true}
                    tableButton={tableButton}
                    lazy={false}
                />
            )}

            <AddItemComponent
                disabledValue="updateSyncSchedule"
                onClickHandler={handleSynScheduleAdd}
                pathname={`/syncs/sschedules/0`}
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
        syncSchedulesData: state.syncSchedulesData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        isError: state.isError.isError,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSyncScheduleData: (data) => dispatch(setSyncScheduleData(data)),
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
        setSyncSchedulesData: (data) => dispatch(setSyncSchedulesData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncSchedule);
