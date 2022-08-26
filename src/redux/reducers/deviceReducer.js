const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};

const initialUpdateState = {
    limit: 20,
    offset: 0,
    login: '',
    divisionIds: [],
};

const initialItemSendState = {
    divisionId: '',
    clientId: '',
};

export const devicesData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEVICES_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const deviceSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_DEVICE_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const deviceItemSendInfo = (state = initialItemSendState, action) => {
    switch (action.type) {
        case 'SET_DEVICE_ITEM_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const deviceData = (state = { deviceData: {} }, action) => {
    switch (action.type) {
        case 'SET_DEVICE_DATA':
            return { ...state, deviceData: action.payload };
        default:
            return state;
    }
};
