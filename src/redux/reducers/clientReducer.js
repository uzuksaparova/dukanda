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
    active: true,
    order: 'userName',
    orderType: 'asc',
    divisionIds: [],
    login: '',
};

const initialItemSendState = {
    userName: '',
    password: '',
    image: null,
    divisionId: '',
    division: '',
    active: true,
    fixedDivision: false,
    saleComplect: false,
};
const initialClientItemState = {
    userName: '',
    password: '',
    image: null,
    divisionId: '',
    comments: [],
    devices: [],
    clientCards: [],
};

export const clientsData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CLIENTS_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const clientSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_CLIENT_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const clientItemSendInfo = (state = initialItemSendState, action) => {
    switch (action.type) {
        case 'SET_CLIENT_ITEM_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const clientData = (state = initialClientItemState, action) => {
    switch (action.type) {
        case 'SET_CLIENT_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const clientDivisionData = (
    state = { clientDivisionData: [] },
    action
) => {
    switch (action.type) {
        case 'SET_CLIENT_DIVISION_DATA':
            return { ...state, clientDivisionData: action.payload };
        default:
            return state;
    }
};
