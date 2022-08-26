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
};

const initialItemSendState = {
    active: true,
};

export const qrDevicesData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_QR_DEVICES_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const qrDeviceSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_QR_DEVICE_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const qrDeviceItemSendInfo = (state = initialItemSendState, action) => {
    switch (action.type) {
        case 'SET_QR_DEVICE_ITEM_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const qrDeviceData = (state = { qrDeviceData: {} }, action) => {
    switch (action.type) {
        case 'SET_QR_DEVICE_DATA':
            return { ...state, qrDeviceData: action.payload };
        default:
            return state;
    }
};
