import React from 'react';
import './stockModal.scss';
import { BsCart4 } from 'react-icons/bs';
import { Backdrop, Box, Modal, Fade } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import ProductStock from '../../productStock/ProductStock';
import { useLocation, useParams } from 'react-router-dom';
import { BACKEND_URL, fetchForAdminWithUpdateToast } from '../../../functions';
import { Button } from '@mui/material';
import { setIsProductStockModalOpen } from '../../../redux/actions/productActions';
import {
    setOrderData,
    setRightTabInfo,
} from '../../../redux/actions/orderActions';
import { connect } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function StockModal(props) {
    const { id } = useParams();
    const pathname = useLocation().pathname;
    const {
        stockModalInfo,
        setStockModalInfo,
        sum,
        setSum,
        orderData,
        setOrderData,
        isProductStockModalOpen,
        setIsProductStockModalOpen,
        rightTabInfo,
        setRightTabInfo,
        stockId,
    } = props;
    const fixedNumber = stockModalInfo?.clientCourrency === 'USD' ? 4 : 2;
    const discountCalculator = (sumParameter) => {
        if (stockModalInfo?.discountType === 'client') {
            return (
                Number(sumParameter) -
                (Number(sumParameter) *
                    Number(stockModalInfo?.clientDisocunt)) /
                    100
            ).toFixed(fixedNumber);
        } else {
            return (
                Number(sumParameter) -
                (Number(sumParameter) * Number(stockModalInfo?.discount)) / 100
            ).toFixed(fixedNumber);
        }
    };
    const handleSaveClick = () => {
        const fixedNumber = stockModalInfo?.clientCourrency === 'USD' ? 4 : 2;
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/orders/${id}`,
                method: 'PUT',
                body: {
                    itemId: stockModalInfo?.id,
                    amount: stockModalInfo?.stockValue,
                },
                notifyMessage: 'Mukdar uytgedilyar',
                updateMessage: 'Mukdar uytgedildi',
            },
            (data) => {
                let tempSum = (
                    stockModalInfo?.stockValue * stockModalInfo?.clientPrice
                ).toFixed(fixedNumber);
                setSum({ ...sum, [stockModalInfo?.id]: tempSum });
                let tempRightTabInfo = {};
                let tempOrderItem = orderData.items;
                tempOrderItem.map((item) => {
                    if (Number(item.id) === Number(stockModalInfo?.id)) {
                        item.stockValue = stockModalInfo?.stockValue;
                    }
                });
                setOrderData({ ...orderData, items: tempOrderItem });

                if (
                    stockModalInfo?.stockValue <
                    stockModalInfo?.employeeApprovedAmount
                ) {
                    tempRightTabInfo = {
                        ...rightTabInfo,
                        amount:
                            rightTabInfo.amount -
                            (stockModalInfo?.employeeApprovedAmount -
                                stockModalInfo?.stockValue),
                        price: (
                            rightTabInfo.price -
                            stockModalInfo?.stockValue *
                                stockModalInfo?.clientPrice
                        ).toFixed(fixedNumber),
                        priceWithDiscount: (
                            rightTabInfo.priceWithDiscount -
                            discountCalculator(tempSum)
                        ).toFixed(fixedNumber),
                    };
                    setRightTabInfo({ ...tempRightTabInfo });
                } else {
                    tempRightTabInfo = {
                        ...rightTabInfo,
                        amount:
                            rightTabInfo.amount +
                            (stockModalInfo?.stockValue -
                                stockModalInfo?.employeeApprovedAmount),
                        price: (
                            Number(rightTabInfo.price) +
                            Number(
                                stockModalInfo?.stockValue -
                                    stockModalInfo?.employeeApprovedAmount
                            ) *
                                stockModalInfo?.clientPrice
                        ).toFixed(fixedNumber),
                        priceWithDiscount: (
                            Number(rightTabInfo.priceWithDiscount) +
                            Number(
                                discountCalculator(
                                    Number(
                                        stockModalInfo?.stockValue -
                                            stockModalInfo?.employeeApprovedAmount
                                    ) * stockModalInfo?.clientPrice
                                )
                            )
                        ).toFixed(fixedNumber),
                    };
                    setRightTabInfo({ ...tempRightTabInfo });
                }
            }
        );
    };

    return (
        <div>
            <Modal
                className="stock-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isProductStockModalOpen}
                onClose={() => setIsProductStockModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isProductStockModalOpen}>
                    <Box sx={style}>
                        <span className="close">
                            <FaTimes
                                onClick={() =>
                                    setIsProductStockModalOpen(false)
                                }
                            />
                        </span>
                        {pathname.includes('orders') ? (
                            <div className="stock-one-row">
                                <div className="stock-left">
                                    <BsCart4 />
                                    Mukdary
                                </div>
                                <div className="stock-right">
                                    <input
                                        type="text"
                                        value={stockModalInfo?.stockValue}
                                        onChange={(e) =>
                                            setStockModalInfo({
                                                ...stockModalInfo,
                                                stockValue: e.target.value,
                                            })
                                        }
                                    />

                                    <div className="save-button">
                                        <Button
                                            variant="contained"
                                            onClick={handleSaveClick}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <ProductStock
                            id={stockId ? stockId : id}
                            renderedIn="modal"
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isProductStockModalOpen:
            state.isProductStockModalOpen.isProductStockModalOpen,
        rightTabInfo: state.rightTabInfo,
        orderData: state.orderData.orderData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsProductStockModalOpen: (open) =>
            dispatch(setIsProductStockModalOpen(open)),
        setRightTabInfo: (info) => dispatch(setRightTabInfo(info)),
        setOrderData: (info) => dispatch(setOrderData(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StockModal);
