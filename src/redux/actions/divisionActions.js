export const setDivisionsData = (divisionsData) => {
    return {
        type: 'SET_DIVISIONS_DATA',
        payload: divisionsData,
    };
};
export const setDivisionSendInfo = (divisionInfo) => {
    return {
        type: 'SET_DIVISION_SEND_INFO',
        payload: divisionInfo,
    };
};
export const setDivisionData = (divisionData) => {
    return {
        type: 'SET_DIVISION_DATA',
        payload: divisionData,
    };
};
export const setIsDivisionClientModalOpen = (open) => {
    return {
        type: 'SET_IS_DIVISION_CLIENT_MODAL_OPEN',
        payload: open,
    };
};

export const setDivisionItemSendInfo = (info) => {
    return {
        type: 'SET_DIVISION_ITEM_SEND_INFO',
        payload: info,
    };
};
export const setDeliveryCostSendInfo = (info) => {
    return {
        type: 'SET_DELIVERY_COST_SEND_INFO',
        payload: info,
    };
};
export const setWarehouseChip = (info) => {
    return {
        type: 'SET_WAREHOUSE_CHIP',
        payload: info,
    };
};
