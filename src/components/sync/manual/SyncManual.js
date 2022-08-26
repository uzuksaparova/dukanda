import React, { useEffect, useState } from 'react';
import './syncManual.scss';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import {
    BACKEND_URL,
    fetchForAdmin,
    functionTranslator,
    fetchForAdminWithUpdateToast,
    fetchWithParams,
} from '../../../functions';
import EmptyComponent from '../../emptyComponent/EmptyComponent';
import { Button } from '@mui/material';
import TableComponent from '../../tableComponent/TableComponent';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import TopButtons from '../../topButtons/TopButtons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function SyncManual(props) {
    const [syncFunctions, setSyncFunctions] = useState([]);

    useEffect(() => {
        fetchSyncFunctions();
    }, []);

    const notification = (info) => {
        toast.info(info, {
            autoClose: false,
        });
    };
    const AllSyncInfo = () => {
        return (
            <div>
                Ähli maglumatlar sinhronlanýar. Bu proses köp wagt alyp biler.
                Sinhron maglumatlaryny{' '}
                <Link to={'/syncs/shistories'}> şu ýerden </Link>
                görüp bilersiňiz
            </div>
        );
    };

    const fetchSyncFunctions = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/sync/schedules/functions`,
                method: 'GET',
            },
            (data) => {
                let tempFunctions = [];
                data.forEach((func, i) => {
                    tempFunctions.push({
                        name: functionTranslator(func),
                        url: `${
                            func === 'itemAlternatives'
                                ? 'items/alternatives'
                                : func === 'itemUnit'
                                ? 'units/items'
                                : func
                        }`,
                        isQuickSync: true,
                    });
                });

                setSyncFunctions(tempFunctions);
            }
        );
    };

    const columns = [
        {
            id: 'name',
            label: 'Ady',
            minWidth: 200,
            align: 'left',
        },
        {
            id: 'isQuickSync',
            label: 'Çalt sinhronlamak',
            minWidth: 200,
            align: 'left',
        },
    ];
    const syncFetch = (row) => {
        let params = row.isQuickSync ? { isQuickSync: row.isQuickSync } : null;
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/sync/${row.url}`,
                params,
                notifyMessage: 'Güncelleniyor lütfen bekleyiniz',
                updateMessage: 'Başarıyla güncellendi',
            },
            (data) => {
                console.log(data);
            }
        );
    };
    const handleRefresh = (row) => {
        if (!row.isQuickSync) {
            const result = window.confirm(
                'Hakykatdan hem sinhronlamak isleyarsinizmi?'
            );
            if (result) {
                syncFetch(row);
            }
        } else {
            syncFetch(row);
        }
    };
    const handleSyncAllClick = (isQuickSync = false) => {
        let params = isQuickSync ? { isQuickSync: true } : null;

        const result = window.confirm(
            'Siz hakykatdan hem ähli maglumatlary sinhronlamak isleyärsiňizmi? Bu proses köp wagt alyp biler, şol sebäpden iş wagty sinhronlamagy maslahat bermeýäris'
        );
        if (result) {
            notification(<AllSyncInfo />);
            fetchWithParams(
                {
                    url: `${BACKEND_URL}/admin/sync/all`,
                    params,
                },
                (data) => {
                    console.log(data);
                }
            );
        }
    };

    const tableButton = (row) => {
        return (
            <Button
                variant="contained"
                style={{ backgroundColor: '#e9601f' }}
                onClick={() => handleRefresh(row)}
            >
                Güncelle
            </Button>
        );
    };
    const handleQuickSyncChange = (e, row) => {
        let tempSyncFunctions = syncFunctions;
        tempSyncFunctions = tempSyncFunctions.map((func) => {
            if (func.name === row.name) {
                return { ...row, isQuickSync: e.target.checked };
            }
            return func;
        });
        setSyncFunctions([...tempSyncFunctions]);
    };
    const handleRowValue = (column, row) => {
        return column.id === 'isQuickSync' ? (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={row.isQuickSync}
                        name="active"
                        onChange={(e) => handleQuickSyncChange(e, row)}
                    />
                }
                label="Çalt sinhronlamak"
            />
        ) : (
            row[column.id]
        );
    };
    return (
        <>
            <div className="manual-syncs">
                <div className="refresh-buttons">
                    <TopButtons
                        disabledValue="syncAll"
                        syncAllQuick={true}
                        syncAll={true}
                        handleSyncAllClick={handleSyncAllClick}
                    />
                </div>
                <div className="manual-syncs-bottom">
                    {syncFunctions.length ? (
                        <TableComponent
                            columns={columns}
                            data={syncFunctions}
                            handleRowValue={handleRowValue}
                            buttonExist={true}
                            tableButton={tableButton}
                            lazy={false}
                            inTab={true}
                        />
                    ) : (
                        <EmptyComponent />
                    )}
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
    };
};

export default connect(mapStateToProps)(SyncManual);
