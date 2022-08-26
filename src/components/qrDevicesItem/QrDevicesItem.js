import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import './qrDevicesItem.scss';
import QrDeviceItemTab from './qrDeviceItemTab/QrDeviceItemTab';
import { BACKEND_URL, fetchForAdmin } from '../../functions';
import {
    setQrDeviceData,
    setQrDeviceItemSendInfo,
} from '../../redux/actions/qrDeviceActions';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

function QrDevicesItem(props) {
    const {
        isSidebarOpen,
        setQrDeviceData,
        qrDeviceItemSendInfo,
        setQrDeviceItemSendInfo,
        qrDeviceData,
    } = props;
    const { id } = useParams();

    useEffect(() => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/clients/qrDevice/UID/${id}`,
                method: 'GET',
            },
            (data) => {
                data.createdAt = dateFormat(data.createdAt, 'yyyy-mm-dd HH:MM');
                data.updatedAt = dateFormat(data.updatedAt, 'yyyy-mm-dd HH:MM');
                setQrDeviceData(data);
                setQrDeviceItemSendInfo({
                    ...qrDeviceItemSendInfo,
                    active: data.active,
                });
            }
        );
        // eslint-disable-next-line
    }, []);

    return (
        <div
            className={`qr-device-item ${isSidebarOpen ? 'sidebar-open' : ''}`}
        >
            <div className="top">
                <div className="left">
                    {qrDeviceData?.systemName +
                        ' ' +
                        qrDeviceData?.model +
                        ' ' +
                        qrDeviceData?.systemVersion}
                </div>
            </div>
            <div className="bottom">
                <QrDeviceItemTab />
            </div>
            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        qrDeviceItemSendInfo: state.qrDeviceItemSendInfo,
        qrDeviceData: state.qrDeviceData.qrDeviceData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setQrDeviceData: (data) => dispatch(setQrDeviceData(data)),
        setQrDeviceItemSendInfo: (info) =>
            dispatch(setQrDeviceItemSendInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QrDevicesItem);
