export const setClientsData = (clientsData) => {
    return {
        type: 'SET_CLIENTS_DATA',
        payload: clientsData,
    };
};
export const setClientSendInfo = (clientInfo) => {
    return {
        type: 'SET_CLIENT_SEND_INFO',
        payload: clientInfo,
    };
};
export const setClientData = (clientData) => {
    return {
        type: 'SET_CLIENT_DATA',
        payload: clientData,
    };
};

export const setClientDivisionData = (data) => {
    return {
        type: 'SET_CLIENT_DIVISION_DATA',
        payload: data,
    };
};
export const setClientItemSendInfo = (sendInfo) => {
    return {
        type: 'SET_CLIENT_ITEM_SEND_INFO',
        payload: sendInfo,
    };
};
