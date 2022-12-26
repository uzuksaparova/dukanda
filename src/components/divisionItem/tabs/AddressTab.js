import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { AiOutlineSlack } from 'react-icons/ai';
import { BiExclude, BiRename } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { connect } from 'react-redux';
import {
    setDivisionItemSendInfo,
    setEmptyValues,
} from '../../../redux/actions/divisionActions';
import './divisionTabs.scss';

function Tab1({
    divisionItemSendInfo,
    setDivisionItemSendInfo,
    emptyValues,
    setEmptyValues,
}) {
    const handleInputChange = (e, type) => {
        setDivisionItemSendInfo({
            ...divisionItemSendInfo,
            [type]: e.target.value,
        });
        let tempEmptyValues = emptyValues;
        tempEmptyValues = tempEmptyValues.filter((v) => v !== type);
        setEmptyValues(tempEmptyValues);
    };
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
                        onChange={(e) => handleInputChange(e, type)}
                        style={{
                            boxShadow: emptyValues.includes(type)
                                ? '0px 0px 4px 0px  red'
                                : 'unset',
                        }}
                        value={divisionItemSendInfo[type]}
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
        setEmptyValues: (info) => dispatch(setEmptyValues(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab1);
