import React from 'react';
import { BiMailSend } from 'react-icons/bi';
import { CgMediaLive } from 'react-icons/cg';
import { BsInstagram, BsTelegram } from 'react-icons/bs';
import { FaPhone } from 'react-icons/fa';
import { connect } from 'react-redux';
import { setDivisionItemSendInfo } from '../../../redux/actions/divisionActions';
import './divisionTabs.scss';

function Tab2({ divisionItemSendInfo, setDivisionItemSendInfo }) {
    const divisionTabRow = (leftIcon, leftName, type) => {
        return (
            <div className="division-one-row">
                <div className="left">
                    {leftIcon}
                    <span>{leftName}</span>
                </div>
                <div className="right password">
                    <input
                        key="code"
                        type="text"
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
            {divisionTabRow(
                <BsInstagram className="division-icon" />,
                'Instagram',
                'instagram'
            )}
            {divisionTabRow(
                <BsTelegram className="division-icon" />,
                'Telegram',
                'telegram'
            )}
            {divisionTabRow(
                <CgMediaLive className="division-icon" />,
                'Imo',
                'imo'
            )}
            {divisionTabRow(
                <BiMailSend className="division-icon" />,
                'Mail',
                'email'
            )}
            {divisionTabRow(
                <FaPhone className="division-icon" />,
                'Telefon nomeri',
                'phoneNumber'
            )}
            {divisionTabRow(
                <FaPhone className="division-icon" />,
                'Telefon nomeri-2',
                'phoneNumber2'
            )}
            {divisionTabRow(
                <FaPhone className="division-icon" />,
                'Telefon nomeri-3',
                'phoneNumber3'
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Tab2);
