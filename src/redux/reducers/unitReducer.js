const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};

const initialUpdateState = {
    search: '',
    limit: 20,
    offset: 0,
};

export const unitsData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_UNITS_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const unitSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_UNIT_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const unitData = (state = { unitData: {} }, action) => {
    switch (action.type) {
        case 'SET_UNIT_DATA':
            return { ...state, unitData: action.payload };
        default:
            return state;
    }
};
