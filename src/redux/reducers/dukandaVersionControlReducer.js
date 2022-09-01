const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};

const initialUpdateState = {
    limit: 20,
    offset: 0,
    active: true,
};

const initialItemSendState = {
    active: true,
};

export const dukandaVersionControlsData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DUKANDA_VERSION_CONTROLS_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const dukandaVersionControlItemSendInfo = (
    state = initialItemSendState,
    action
) => {
    switch (action.type) {
        case 'SET_DUKANDA_VERSION_CONTROL_ITEM_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const dukandaVersionControlSendInfo = (
    state = initialUpdateState,
    action
) => {
    switch (action.type) {
        case 'SET_DUKANDA_VERSION_CONTROL_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
