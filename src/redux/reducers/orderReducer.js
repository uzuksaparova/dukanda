const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};

const initialUpdateState = {
    limit: 20,
    offset: 0,
    search: '',
    orderName: 'priority',
    orderType: 'asc',
    status: ['waitingForConfirmation', 'reviewing', 'picking', 'delivering'],
    assignedMe: '',
    deliveryType: '',
    paymentType: '',
};
const initialRightTabInfo = {
    amount: '',
    price: '',
    priceWithDiscount: '',
    currency: '',
};
export const orderData = (state = { orderData: '' }, action) => {
    switch (action.type) {
        case 'SET_ORDER_DATA':
            return {
                ...state,
                orderData: action.payload,
            };
        default:
            return state;
    }
};
export const ordersData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDERS_DATA':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export const orderStatuses = (
    state = {
        orderStatuses: [
            'waitingForConfirmation',
            'reviewing',
            'picking',
            'delivering',
        ],
    },
    action
) => {
    switch (action.type) {
        case 'SET_ORDER_STATUSES':
            return {
                ...state,
                orderStatuses: action.payload,
            };
        default:
            return state;
    }
};

export const orderSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_ORDER_SEND_INFO':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const rightTabInfo = (state = initialRightTabInfo, action) => {
    switch (action.type) {
        case 'SET_RIGHT_TAB_INFO':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
