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
    clientId: null,
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

export const emptyValues = (state = { emptyValues: [] }, action) => {
    switch (action.type) {
        case 'SET_EMPTY_VALUES':
            return { ...state, emptyValues: action.payload };
        default:
            return state;
    }
};
