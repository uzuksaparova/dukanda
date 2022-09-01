import React from 'react';
import { Button, Chip } from '@mui/material';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { GiShoppingBag } from 'react-icons/gi';
import { connect } from 'react-redux';
import {
    setDivisionItemSendInfo,
    setIsDivisionClientModalOpen,
} from '../../../../redux/actions/divisionActions';
import '../divisionTabs.scss';
import './entegrasyonTab.scss';

function Tab3({
    divisionItemSendInfo,
    setDivisionItemSendInfo,
    setIsDivisionClientModalOpen,
    clientChip,
}) {
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
        <div className="tab3">
            {divisionTabRow(
                <AiOutlineFieldNumber className="division-icon" />,
                'NR',
                'nr'
            )}

            <div className="division-one-row">
                <div className="left">
                    <GiShoppingBag className="division-icon" />
                    <span>Torba Cari</span>
                </div>
                <div className="right">
                    <Button
                        className="save-button"
                        variant="outlined"
                        onClick={() => {
                            setIsDivisionClientModalOpen(true);
                        }}
                    >
                        Saýla
                    </Button>
                </div>
            </div>
            {clientChip ? (
                <div className="division-chips">
                    <Chip
                        className="chip"
                        variant="outlined"
                        color="secondary"
                        label={clientChip}
                    />
                </div>
            ) : null}
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
        setIsDivisionClientModalOpen: (open) =>
            dispatch(setIsDivisionClientModalOpen(open)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab3);
