import React from 'react';
import { Button, Chip } from '@mui/material';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { GiShoppingBag } from 'react-icons/gi';
import { connect } from 'react-redux';
import {
    setDivisionItemSendInfo,
    setIsDivisionClientModalOpen,
    setEmptyValues,
} from '../../../../redux/actions/divisionActions';
import '../divisionTabs.scss';
import './entegrasyonTab.scss';

function Tab3({
    divisionItemSendInfo,
    setDivisionItemSendInfo,
    setIsDivisionClientModalOpen,
    clientChip,
    emptyValues,
    setEmptyValues,
}) {
    const handleInputChange = (value, type) => {
        setDivisionItemSendInfo({
            ...divisionItemSendInfo,
            [type]: value,
        });
        let tempEmptyValues = emptyValues;
        tempEmptyValues = tempEmptyValues.filter((v) => v !== type);
        setEmptyValues(tempEmptyValues);
    };
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
                            handleInputChange(e.target.value, type)
                        }
                        value={divisionItemSendInfo[type]}
                        style={{
                            boxShadow: emptyValues.includes(type)
                                ? '0px 0px 4px 0px  red'
                                : 'unset',
                        }}
                    />
                    {emptyValues.includes(type) ? (
                        <span
                            style={{
                                marginTop: '5px',
                                color: 'red',
                                fontSize: 13,
                            }}
                        >
                            **{leftName} girizilmedik!
                        </span>
                    ) : null}
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
                        style={{
                            boxShadow: emptyValues.includes('clientId')
                                ? '0px 0px 4px 0px  red'
                                : 'unset',
                        }}
                    >
                        Saýla
                    </Button>
                    {emptyValues.includes('clientId') ? (
                        <span
                            style={{
                                marginTop: '5px',
                                color: 'red',
                                fontSize: 13,
                            }}
                        >
                            **Torba Cari saýlanmadyk!
                        </span>
                    ) : null}
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
        emptyValues: state.emptyValues.emptyValues,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setDivisionItemSendInfo: (info) =>
            dispatch(setDivisionItemSendInfo(info)),
        setIsDivisionClientModalOpen: (open) =>
            dispatch(setIsDivisionClientModalOpen(open)),
        setEmptyValues: (open) => dispatch(setEmptyValues(open)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab3);
