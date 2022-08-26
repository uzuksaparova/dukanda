import React from 'react';
import { GiBowlSpiral } from 'react-icons/gi';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { RiRulerLine } from 'react-icons/ri';
import { FaLayerGroup, FaExchangeAlt } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineSlack } from 'react-icons/ai';
import { setProductItemSendInfo } from '../../../../../redux/actions/productActions';
import Button from '@material-ui/core/Button';
import { BACKEND_URL } from '../../../../../functions';

import { connect } from 'react-redux';
import '../../cardTab.scss';
import ProductUnitTab from './ProductUnitTab';

function ProductTab1(props) {
    const {
        productData,
        productItemSendInfo,
        TabContainer,
        setProductItemSendInfo,
    } = props;

    const handleQrDownload = () => {
        window.location.replace(
            `${BACKEND_URL}/admin/items/QR/${productData.id}`
        );
    };

    return (
        <TabContainer>
            <div className="card-tab">
                <div className="card-tab-one-row">
                    <div className="left">
                        <GiBowlSpiral className="card-tab-icon" />
                        <span>Paretto</span>
                    </div>
                    <div className="right">
                        <div
                            className="paretto"
                            style={{
                                backgroundColor: `${
                                    productData?.paretto === 'best'
                                        ? 'rgba(0, 135, 107, 0.6)'
                                        : productData?.paretto === 'middle'
                                        ? 'rgba(0, 120, 223, 0.6)'
                                        : 'rgba(255, 0, 26, 0.6)'
                                }`,
                            }}
                        >
                            <span>
                                {productData.paretto === 'best'
                                    ? 'çok satan'
                                    : productData?.paretto === 'middle'
                                    ? 'orta satan'
                                    : 'az satan'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-tab-one-row">
                    <div className="left">
                        <AiOutlineSlack className="card-tab-icon" />
                        <span>Aktiw</span>
                    </div>
                    <div className="right">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={productItemSendInfo.active}
                                    name="active"
                                    onChange={(e) =>
                                        setProductItemSendInfo({
                                            ...productItemSendInfo,
                                            active: e.target.checked,
                                        })
                                    }
                                />
                            }
                            label={
                                productItemSendInfo.active ? 'Aktiw' : 'Passiw'
                            }
                        />
                    </div>
                </div>
                <div className="card-tab-one-row">
                    <div className="left">
                        <AiOutlineSlack className="card-tab-icon" />
                        <span>E-Aktiw</span>
                    </div>
                    <div className="right">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={productData.eActive}
                                    name="active"
                                />
                            }
                            label={productData.eActive ? 'Aktiw' : 'Passiw'}
                        />
                    </div>
                </div>
                <div className="card-tab-one-row">
                    <div className="left">
                        <FaLayerGroup className="card-tab-icon" />
                        <span>Grup</span>
                    </div>
                    <div className="right">
                        <span>{productData.lastGroup.name}</span>
                    </div>
                </div>
                <div className="card-tab-one-row">
                    <div className="left">
                        <AiOutlineShoppingCart className="card-tab-icon" />
                        <span>Satyş mukdary</span>
                    </div>
                    <div className="right">
                        <span>{productData.salesLimitQuantity}</span>
                    </div>
                </div>
                <div className="card-tab-one-row">
                    <div className="left">
                        <FaExchangeAlt className="card-tab-icon" />
                        <span>Alternatif kody</span>
                    </div>
                    <div className="right">
                        <span>{productData.subsGoodCode}</span>
                    </div>
                </div>
                <div className="card-tab-one-row">
                    <div className="left">
                        <FaExchangeAlt className="card-tab-icon" />
                        <span>QR kody</span>
                    </div>
                    <div className="right">
                        <Button
                            className="save-button"
                            variant="outlined"
                            onClick={handleQrDownload}
                        >
                            Ýükle
                        </Button>
                    </div>
                </div>
                <div className="card-tab-one-row unit-row">
                    <div className="left">
                        <RiRulerLine className="card-tab-icon" />
                        <span>Birimi</span>
                    </div>
                    <div className="right">
                        <ProductUnitTab />
                    </div>
                </div>
            </div>
        </TabContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        productData: state.productData.productData,
        productItemSendInfo: state.productItemSendInfo.productItemSendInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProductItemSendInfo: (info) =>
            dispatch(setProductItemSendInfo(info)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTab1);
