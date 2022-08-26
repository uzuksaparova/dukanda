const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};
const initialUpdateState = {
    limit: 20,
    offset: 0,
    active: '',
    search: '',
};

export const smartSectionsData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SMARTSECTIONS_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const smartSectionData = (state = { smartSectionData: {} }, action) => {
    switch (action.type) {
        case 'SET_SMARTSECTION_DATA':
            return { ...state, smartSectionData: action.payload };
        default:
            return state;
    }
};
export const smartSectionSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_SMARTSECTION_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
