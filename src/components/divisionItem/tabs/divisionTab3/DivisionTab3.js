import React from 'react';
import {
    Button,
    Checkbox,
    Chip,
    FormControlLabel,
    MenuItem,
    Select,
} from '@mui/material';
import {
    AiOutlineFieldNumber,
    AiOutlineInbox,
    AiOutlineUser,
} from 'react-icons/ai';
import { BiCoinStack } from 'react-icons/bi';
import { FaWarehouse } from 'react-icons/fa';
import { GiShoppingBag } from 'react-icons/gi';
import { ImHome3 } from 'react-icons/im';
import { connect } from 'react-redux';
import {
    setDivisionItemSendInfo,
    setIsDivisionClientModalOpen,
    setWarehouseChip,
} from '../../../../redux/actions/divisionActions';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import '../divisionTabs.scss';
import './divisionTab3.scss';

function Tab3({
    divisionItemSendInfo,
    setDivisionItemSendInfo,
    warehouseSend,
    setWarehouseSend,
    divisionWarehouses,
    warehouseChip,
    setWarehouseChip,
    divisionTypes,
    discountCards,
    setIsDivisionClientModalOpen,
    clientChip,
    discountExpenseCards,
}) {
    const handleWarehouseChangeCheckbox = (e) => {
        var indexx = e.target.name.split(',');
        var tempWarehouseSend = warehouseSend;
        tempWarehouseSend[indexx[0]][indexx[1]] = e.target.checked;
        setWarehouseSend([...tempWarehouseSend]);
        let tempWareChip = warehouseChip;
        let matchIndex = '';
        tempWareChip.forEach((w, i) => {
            if (Number(w.nr) === Number(indexx[1])) {
                matchIndex = i;
            }
        });
        tempWareChip.some((ch) => ch.name === indexx[2]);
        if (e.target.checked && matchIndex === '') {
            tempWareChip.push({
                name: indexx[2],
                nr: indexx[1],
                isComplect: false,
            });
        } else {
            tempWareChip.splice(matchIndex, 1);
        }
        setWarehouseChip(tempWareChip);
    };
    const handleWarehouseChipDelete = (warehousee) => {
        var tempWarehouseSend = warehouseSend;
        tempWarehouseSend = tempWarehouseSend.map((ws, i) => {
            if (Object.keys(ws)[0] === warehousee.nr) {
                let obj = {};
                obj[warehousee.name] = false;
                obj['isComplect'] = false;
                return obj;
            } else {
                return ws;
            }
        });
        setWarehouseSend(tempWarehouseSend);
        var tempWarehouseChip = warehouseChip;

        tempWarehouseChip = tempWarehouseChip.filter((cw) => cw !== warehousee);
        setWarehouseChip(tempWarehouseChip);
    };
    const handleIsComplectCheckbox = (e) => {
        let tempWarehouseChip = warehouseChip;
        tempWarehouseChip[e.target.name].isComplect = e.target.checked;
        warehouseSend[e.target.name].isComplect = e.target.checked;
        setWarehouseChip([...tempWarehouseChip]);
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

    const divisionSelectOneRow = (
        leftIcon,
        leftName,
        selectOptions,
        type,
        optionValue,
        optionName
    ) => {
        return (
            <div className="division-one-row">
                <div className="left">
                    {leftIcon}
                    <span>{leftName}</span>
                </div>
                <div className="right">
                    {selectOptions.length && (
                        <Select
                            code="demo-simple-select-outlined"
                            value={divisionItemSendInfo[type]}
                            onChange={(e) =>
                                setDivisionItemSendInfo({
                                    ...divisionItemSendInfo,
                                    [type]: e.target.value,
                                })
                            }
                        >
                            <MenuItem disabled value="null">
                                <em>Saýla</em>
                            </MenuItem>
                            {selectOptions.map((option) => {
                                return (
                                    <MenuItem
                                        value={
                                            optionValue
                                                ? option[optionValue]
                                                : option
                                        }
                                        key={
                                            optionValue
                                                ? option[optionName]
                                                : option
                                        }
                                    >
                                        {optionValue
                                            ? option[optionName]
                                            : option}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    )}
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
            {divisionSelectOneRow(
                <ImHome3 className="division-icon" />,
                'Bölüm görnüşi',
                divisionTypes,
                'type'
            )}

            {divisionSelectOneRow(
                <AiOutlineInbox className="division-icon" />,
                'Haryda Görä Arzanladyş Karty',
                discountCards,
                'discountForProductId',
                'id',
                'name'
            )}
            {divisionSelectOneRow(
                <BiCoinStack className="division-icon" />,
                'Teňňe Tegelekleme Arzanladyş Karty',
                discountCards,
                'discountForReceiptId',
                'id',
                'name'
            )}
            {divisionSelectOneRow(
                <AiOutlineUser className="division-icon" />,
                'Müşderä Görä Arzanladyş Karty',
                discountCards,
                'discountForClientId',
                'id',
                'name'
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
            <div className="division-one-row">
                <div className="left">
                    <FaWarehouse className="division-icon" />
                    <span>Depolar</span>
                </div>
                <div className="right">
                    <Select
                        multiple
                        code="demo-simple-select-outlined"
                        value={['Depolar']}
                        displayEmpty
                        label="Depolar"
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Placeholder</em>;
                            }
                            return selected.join(', ');
                        }}
                    >
                        {divisionWarehouses.length ? (
                            divisionWarehouses.map((ware, i) => {
                                let nr = ware.nr;
                                return (
                                    <div className="one-group" key={i}>
                                        <MenuItem>
                                            <FormControlLabel
                                                onChange={(e) =>
                                                    handleWarehouseChangeCheckbox(
                                                        e
                                                    )
                                                }
                                                id="group"
                                                control={
                                                    <Checkbox
                                                        className="main-group"
                                                        onChange={(e) =>
                                                            handleWarehouseChangeCheckbox(
                                                                e
                                                            )
                                                        }
                                                        checked={
                                                            warehouseSend[i][nr]
                                                        }
                                                        name={
                                                            i +
                                                            ',' +
                                                            nr +
                                                            ',' +
                                                            ware.name
                                                        }
                                                    />
                                                }
                                                label={`${ware.name} (${ware.nr})`}
                                            />
                                        </MenuItem>
                                    </div>
                                );
                            })
                        ) : (
                            <div>loading</div>
                        )}
                    </Select>
                </div>
            </div>
            <div className="division-chips">
                {warehouseChip.map((wr, i) => {
                    return (
                        <Chip
                            key={wr.name}
                            className="chip"
                            variant="outlined"
                            color="secondary"
                            onDelete={() => handleWarehouseChipDelete(wr)}
                            label={
                                <div className="warehouse-chip">
                                    <span>{`${wr.name} (${wr.nr})`}</span>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                className="main-group"
                                                onChange={(e) =>
                                                    handleIsComplectCheckbox(e)
                                                }
                                                checked={wr.isComplect}
                                                name={i}
                                            />
                                        }
                                        label={'Komplekt'}
                                    />
                                </div>
                            }
                        />
                    );
                })}
            </div>
            {divisionWarehouses.length ? (
                <div className="division-one-row">
                    <div className="left">
                        <ImHome3 className="division-icon" />
                        <span>Kayit Deposu</span>
                    </div>
                    <div className="right">
                        <Select
                            displayEmpty
                            code="demo-simple-select-outlined"
                            value={divisionItemSendInfo?.defaultWarehouse}
                            onChange={(e) =>
                                setDivisionItemSendInfo({
                                    ...divisionItemSendInfo,
                                    defaultWarehouse: e.target.value,
                                })
                            }
                        >
                            <MenuItem disabled value="null">
                                <em>Saýla</em>
                            </MenuItem>
                            {warehouseChip?.map((ware) => {
                                return (
                                    <MenuItem value={ware.nr} key={ware.name}>
                                        {`${ware.name} (${ware.nr})`}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        divisionItemSendInfo: state.divisionItemSendInfo,
        divisionData: state.divisionData.divisionData,
        warehouseChip: state.warehouseChip.warehouseChip,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setDivisionItemSendInfo: (info) =>
            dispatch(setDivisionItemSendInfo(info)),
        setIsDivisionClientModalOpen: (open) =>
            dispatch(setIsDivisionClientModalOpen(open)),
        setWarehouseChip: (open) => dispatch(setWarehouseChip(open)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab3);
