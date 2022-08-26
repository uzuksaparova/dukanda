import React, { useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FaTimes } from 'react-icons/fa';
import '../sort.scss';
import { fetchOrdersInfo } from '../../../../functions';
import {
    setIsFilterOpen,
    setIsSortOpen,
} from '../../../../redux/actions/sidebarActions';
import {
    setOrdersData,
    setOrderSendInfo,
} from '../../../../redux/actions/orderActions';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

function OrderSort(props) {
    const {
        setIsSortOpen,
        orderSendInfo,
        setIsFilterOpen,
        setOrderSendInfo,
        setOrdersData,
        ordersData,
    } = props;
    const useeLocation = useLocation();
    const pathname = useeLocation.pathname;

    useEffect(() => {
        setIsFilterOpen(false);
        // eslint-disable-next-line
    }, [useeLocation]);

    const handleOkButton = () => {
        setOrdersData({ ...ordersData, data: [] });
        setIsSortOpen(false);
        fetchOrdersInfo({ firstTime: true, pathname });
    };

    return (
        <div className="admin-page-sort ">
            <span className="close">
                <FaTimes onClick={() => setIsSortOpen(false)} />
            </span>
            <div className="one-row">
                <div className="left">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={orderSendInfo.orderName}
                            displayEmpty
                            onChange={(e) =>
                                setOrderSendInfo({
                                    ...orderSendInfo,
                                    orderName: e.target.value,
                                })
                            }
                        >
                            <MenuItem value={'priority'}>Öňdelik</MenuItem>
                            <MenuItem value={'status'}>Status</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="right">
                    <FormControl className="form-control">
                        <Select
                            code="demo-simple-select-outlined"
                            value={orderSendInfo.orderType}
                            displayEmpty
                            onChange={(e) =>
                                setOrderSendInfo({
                                    ...orderSendInfo,
                                    orderType: e.target.value,
                                })
                            }
                            label="Artýan"
                            placeholder="Artýan"
                        >
                            <MenuItem value={'asc'}>Artýan</MenuItem>
                            <MenuItem value={'desc'}>Kemelýän</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="buttons">
                <Button
                    variant="contained"
                    className="ok-button"
                    onClick={handleOkButton}
                >
                    ok
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        orderSendInfo: state.orderSendInfo,
        ordersData: state.ordersData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsSortOpen: (open) => dispatch(setIsSortOpen(open)),
        setIsFilterOpen: (open) => dispatch(setIsFilterOpen(open)),
        setOrderSendInfo: (info) => dispatch(setOrderSendInfo(info)),
        setOrdersData: (data) => dispatch(setOrdersData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSort);
