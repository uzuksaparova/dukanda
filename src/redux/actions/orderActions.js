export const setOrderData = (orderData) => {
    return {
        type: 'SET_ORDER_DATA',
        payload: orderData,
    };
};
export const setOrdersData = (ordersData) => {
    return {
        type: 'SET_ORDERS_DATA',
        payload: ordersData,
    };
};
export const setOrderSendInfo = (orderSendInfo) => {
    return {
        type: 'SET_ORDER_SEND_INFO',
        payload: orderSendInfo,
    };
};
export const setOrderStatuses = (orderStatuses) => {
    return {
        type: 'SET_ORDER_STATUSES',
        payload: orderStatuses,
    };
};

export const setRightTabInfo = (info) => {
    return {
        type: 'SET_RIGHT_TAB_INFO',
        payload: info,
    };
};
