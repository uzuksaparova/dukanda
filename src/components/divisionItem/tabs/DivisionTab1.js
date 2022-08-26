import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { AiOutlineSlack, AiOutlineQrcode } from 'react-icons/ai';
import { BiExclude, BiRename } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { connect } from 'react-redux';
import { setDivisionItemSendInfo } from '../../../redux/actions/divisionActions';
import DivisionQR from '../divisionQR/DivisionQR';
import './divisionTabs.scss';

function Tab1({ divisionItemSendInfo, setDivisionItemSendInfo }) {
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
        <div>
            <div className="division-one-row">
                <div className="left">
                    <AiOutlineSlack className="division-icon" />
                    <span>Aktiw</span>
                </div>
                <div className="right">
                    <FormControlLabel
                        onChange={(e) =>
                            setDivisionItemSendInfo({
                                ...divisionItemSendInfo,
                                active: e.target.checked,
                            })
                        }
                        control={
                            <Checkbox
                                checked={divisionItemSendInfo.active}
                                onChange={(e) =>
                                    setDivisionItemSendInfo({
                                        ...divisionItemSendInfo,
                                        active: e.target.checked,
                                    })
                                }
                                name="active"
                            />
                        }
                        label="Aktiw"
                    />
                </div>
            </div>
            {divisionTabRow(
                <BiExclude className="division-icon" />,
                'Kody',
                'code',
                'Kody'
            )}
            {divisionTabRow(
                <BiRename className="division-icon" />,
                'Ady',
                'name',
                'Ady'
            )}
            {divisionTabRow(
                <MdLocationOn className="division-icon" />,
                'Salgysy',
                'address',
                'Salgysy'
            )}
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
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tab1);
