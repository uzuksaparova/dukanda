import React from 'react';
import { AiOutlineQrcode } from 'react-icons/ai';
import { FaDownload } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { connect } from 'react-redux';
import { setDivisionItemSendInfo } from '../../../../redux/actions/divisionActions';
import DivisionQR from '../../divisionQR/DivisionQR';
import OfflineQrDownload from '../../offlineQrDownload/OfflineQrDownload';
import '../divisionTabs.scss';

function DivisionTab3({ divisionItemSendInfo, setDivisionItemSendInfo }) {
    const divisionTabRow = (leftIcon, leftName, type, placeholder) => {
        return (
            <div className="division-one-row">
                <div className="left">
                    {leftIcon}
                    <span>{leftName}</span>
                </div>
                <div className="right ">
                    <input
                        key="code"
                        type="text"
                        placeholder={placeholder}
                        onChange={(e) =>
                            setDivisionItemSendInfo({
                                ...divisionItemSendInfo,
                                [type]: e.target.value,
                            })
                        }
                        value={divisionItemSendInfo[type]}
                    />
                </div>
            </div>
        );
    };
    return (
        <>
            {divisionTabRow(
                <MdLocationOn className="division-icon" />,
                'QR local server url',
                'QRLocalServerUrl',
                'http://172.16.3.1:8066'
            )}
            <div className="division-one-row">
                <div className="left">
                    <AiOutlineQrcode className="division-icon" />
                    <span>QR kody</span>
                </div>
                <div className="right division-qr-tab">
                    <DivisionQR />
                </div>
            </div>
            <div className="division-one-row">
                <div className="left">
                    <FaDownload className="division-icon" />
                    <span>QR programmasyny ýüklemek</span>
                </div>
                <div className="right division-qr-tab">
                    <OfflineQrDownload />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        divisionItemSendInfo: state.divisionItemSendInfo,
        divisionData: state.divisionData.divisionData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setDivisionItemSendInfo: (info) =>
            dispatch(setDivisionItemSendInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DivisionTab3);
