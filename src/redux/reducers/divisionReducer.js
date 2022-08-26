const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};
const initialUpdateState = {
    limit: 20,
    offset: 0,
};

const initialItemSendInfo = {
    id: '',
    code: '',
    nr: '',
    name: '',
    address: '',
    image: null,
    longitude: '156.35',
    latitude: '841.564',
    active: true,
    defaultWarehouse: null,
    warehouses: [],
    type: 'B2C',
    clientId: null,
    discountForProductId: null, //discount
    discountForClientId: null, //discount
    discountForReceiptId: null, //discount
    deliveryCardId: null, // expenses
    telegram: '',
    imo: '',
    instagram: '',
    email: '',
    phoneNumber: '',
    phoneNumber2: '',
    phoneNumber3: '',
    minOrderPrice: null,
    minOrderPriceCurrencyId: null,
    expressDeliveryPrice: null, // ekspress töleg möçberi
    expressDeliveryPriceCurrencyId: null, // select
    expressAcceptableProductCount: null,
};

const deliveryCostInitialState = {
    id: '',
    divisionId: '',
    startPoint: '',
    endPoint: '',
    price: '',
    priceCurrencyId: '',
};

export const divisionsData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DIVISIONS_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const divisionData = (state = { divisionData: {} }, action) => {
    switch (action.type) {
        case 'SET_DIVISION_DATA':
            return { ...state, divisionData: action.payload };
        default:
            return state;
    }
};
export const warehouseChip = (state = { warehouseChip: [] }, action) => {
    switch (action.type) {
        case 'SET_WAREHOUSE_CHIP':
            return { ...state, warehouseChip: action.payload };
        default:
            return state;
    }
};
export const divisionSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_DIVISION_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const divisionItemSendInfo = (state = initialItemSendInfo, action) => {
    switch (action.type) {
        case 'SET_DIVISION_ITEM_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const deliveryCostSendInfo = (
    state = deliveryCostInitialState,
    action
) => {
    switch (action.type) {
        case 'SET_DELIVERY_COST_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};


export const isDivisionClientModalOpen = (
    state = { isDivisionClientModalOpen: false },
    action
) => {
    switch (action.type) {
        case 'SET_IS_DIVISION_CLIENT_MODAL_OPEN':
            return { ...state, isDivisionClientModalOpen: action.payload };
        default:
            return state;
    }
};
