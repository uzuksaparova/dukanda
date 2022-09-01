import React, { useEffect } from 'react';
import './qrDevices.scss';
import Loading from '../Loading';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { fetchQrDevicesInfo } from '../../functions';
import { connect } from 'react-redux';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import TableComponent from '../tableComponent/TableComponent';
import {
    setQrDevicesData,
    setQrDeviceSendInfo,
} from '../../redux/actions/qrDeviceActions';

const columns = [
    {
        id: 'qrDeviceInfo',
        label: 'Enjam maglumat',
        minWidth: 170,
        align: 'left',
    },
    { id: 'cardNo', label: 'Kart no', minWidth: 170, align: 'left' },
    {
        id: 'client',
        label: 'Müşderi',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'createdEmployee',
        label: 'Döreden işgär',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'modifiedEmployee',
        label: 'Üýtgeden işgär',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'sync',
        label: 'Sinhronlanan',
        minWidth: 100,
        align: 'left',
    },

    {
        id: 'createdAt',
        label: 'Döredilen wagty',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'updatedAt',
        label: 'Üýtgedilen wagty',
        minWidth: 170,
        align: 'left',
    },
];

function QrDevices(props) {
    const { qrDevicesData, isError } = props;
    const { noData, data } = qrDevicesData;

    useEffect(() => {
        if (!qrDevicesData.data.length) {
            fetchQrDevicesInfo(true);
        }
        // eslint-disable-next-line
    }, []);

    const clientDetector = (cid) => {
        return cid?.name;
    };

    const handleSyncCell = (row) => {
        return (
            <div
                className="qr-sync"
                style={{
                    backgroundColor: row.sync
                        ? 'rgba(0, 135, 107, 0.5)'
                        : 'rgba(255, 0, 26, 0.5)',
                }}
            >
                <span>{row.sync ? 'Hawa' : 'Yok'}</span>
            </div>
        );
    };

    const handleRowValue = (column, row, i) => {
        return column.id === 'qrDeviceInfo'
            ? (row?.systemName ? row.systemName : '-') +
                  ' ' +
                  (row.model ? row.model : '-') +
                  ' ' +
                  (row.systemVersion ? row.systemVersion : '-')
            : column.id === 'createdEmployee'
            ? row.createdEmployee
                ? row?.createdEmployee?.firstName +
                  ' ' +
                  row?.createdEmployee?.lastName
                : ''
            : column.id === 'modifiedEmployee'
            ? row.modifiedEmployee
                ? row?.modifiedEmployee?.firstName +
                  ' ' +
                  row?.modifiedEmployee?.lastName
                : ''
            : column.id === 'client'
            ? clientDetector(row?.clientCard?.client)
            : column.id === 'sync'
            ? handleSyncCell(row)
            : row[column.id]
            ? row[column.id]
            : '- - - -';
    };
    const handleFetchMore = () => {
        fetchQrDevicesInfo();
    };
    return (
        <div className="qr-devices">
            {!data?.length ? (
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
                    data={qrDevicesData}
                    handleRowValue={handleRowValue}
                    handleFetchMore={handleFetchMore}
                    rowPath="qrDevices"
                    isRowClickable={true}
                    rowPathType="UID"
                />
            )}
            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        qrDevicesData: state.qrDevicesData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        isError: state.isError.isError,
        sidebarSearchValue: state.sidebarSearchValue.sidebarSearchValue,
        qrDeviceSendInfo: state.qrDeviceSendInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setQrDevicesData: (value) => dispatch(setQrDevicesData(value)),
        setQrDeviceSendInfo: (value) => dispatch(setQrDeviceSendInfo(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QrDevices);
