const initialSendState = {
    barcodePrefix: '',
    productIdentityLength: '',
    scalingLength: '',
    divider: '',
};

export const scalingSystemsData = (
    state = { scalingSystemsData: [] },
    action
) => {
    switch (action.type) {
        case 'SET_SCALING_SYSTEMS_DATA':
            return { ...state, scalingSystemsData: action.payload };
        default:
            return state;
    }
};
export const scalingSystemItemSendInfo = (state = initialSendState, action) => {
    switch (action.type) {
        case 'SET_SCALING_SYSTEM_ITEM_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
