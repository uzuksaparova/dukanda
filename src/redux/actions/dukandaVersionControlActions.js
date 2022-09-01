export const setDukandaVersionControlsData = (data) => {
    return {
        type: 'SET_DUKANDA_VERSION_CONTROLS_DATA',
        payload: data,
    };
};
export const setDukandaVersionControlSendInfo = (info) => {
    return {
        type: 'SET_DUKANDA_VERSION_CONTROL_SEND_INFO',
        payload: info,
    };
};
export const dukandaVersionControlItemSendInfo = (data) => {
    return {
        type: 'SET_DUKANDA_VERSION_CONTROL_ITEM_SEND_INFO',
        payload: data,
    };
};
