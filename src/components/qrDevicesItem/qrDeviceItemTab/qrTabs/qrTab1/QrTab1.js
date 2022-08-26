import React from 'react';
import { connect } from 'react-redux';
import './qrTab1.scss';
import { setQrDeviceItemSendInfo } from '../../../../../redux/actions/qrDeviceActions';
import { AiOutlineSlack } from 'react-icons/ai';
import {
    BACKEND_URL,
    fetchForAdminWithUpdateToast,
} from '../../../../../functions';
import { Checkbox, FormControlLabel } from '@mui/material';
import { BsCreditCardFill } from 'react-icons/bs';
import { FaClock, FaUser } from 'react-icons/fa';

function QrTab1(props) {
    const { qrDeviceItemSendInfo, setQrDeviceItemSendInfo, qrDeviceData } =
        props;
    const qrDeviceInputRow = (rowObj) => {
        const { leftName, leftIcon, leftValue } = rowObj;
        return (
            <div className="qr-device-tab1-one-row">
                <div className="left">
                    {leftIcon}
                    <span>{leftName}</span>
                </div>
                <div className="right">{leftValue || '----'}</div>
            </div>
        );
    };
    const handleActiveChange = (e) => {
        setQrDeviceItemSendInfo({
            ...qrDeviceItemSendInfo,
            active: e.target.checked,
        });
        let menuSend = { ...qrDeviceItemSendInfo, active: e.target.checked };
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/clients/qrDevice/${qrDeviceData.id}`,
                notifyMessage: 'Status çalşylýar...',
                updateMessage: 'Status çalşyldy',
                body: menuSend,
                method: 'PUT',
            },
            (data) => {
                console.log(data);
            }
        );
    };
    return (
        <>
            <div className="qr-device-tab1-one-row">
                <div className="left">
                    <AiOutlineSlack className="qr-device-icon" />
                    <span>Aktiwlylyk</span>
                </div>
                <div className="right">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={qrDeviceItemSendInfo.active}
                                onChange={(e) => handleActiveChange(e)}
                                name="active"
                            />
                        }
                        label={qrDeviceItemSendInfo.active ? 'Aktiw' : 'Passiw'}
                    />
                </div>
            </div>
            {qrDeviceInputRow({
                leftName: 'Kart No',
                leftIcon: <BsCreditCardFill className="qr-device-icon" />,
                leftValue: qrDeviceData.cardNo,
            })}
            {qrDeviceInputRow({
                leftName: 'Müşderi',
                leftIcon: <FaUser className="qr-device-icon" />,
                leftValue: qrDeviceData.client,
            })}
            {qrDeviceInputRow({
                leftName: 'Döreden işgär',
                leftIcon: <FaUser className="qr-device-icon" />,
                leftValue: qrDeviceData.createdEmployee
                    ? qrDeviceData.createdEmployee?.firstName +
                      ' ' +
                      qrDeviceData.createdEmployee?.lastName
                    : '',
            })}
            {qrDeviceInputRow({
                leftName: 'Üýtgeden işgär',
                leftIcon: <FaUser className="qr-device-icon" />,
                leftValue: qrDeviceData.modifiedEmployee
                    ? qrDeviceData.modifiedEmployee?.firstName +
                      ' ' +
                      qrDeviceData.modifiedEmployee?.lastName
                    : '',
            })}
            {qrDeviceInputRow({
                leftName: 'Döredilen wagty',
                leftIcon: <FaClock className="qr-device-icon" />,
                leftValue: qrDeviceData.createdAt,
            })}
            {qrDeviceInputRow({
                leftName: 'Üýtgedilen wagty',
                leftIcon: <FaClock className="qr-device-icon" />,
                leftValue: qrDeviceData.updatedAt,
            })}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        qrDeviceItemSendInfo: state.qrDeviceItemSendInfo,
        qrDeviceData: state.qrDeviceData.qrDeviceData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setQrDeviceItemSendInfo: (data) =>
            dispatch(setQrDeviceItemSendInfo(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QrTab1);
