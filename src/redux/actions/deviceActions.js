export const setDevicesData = (devicesData) => {
    return {
        type: 'SET_DEVICES_DATA',
        payload: devicesData,
    };
};
export const setDeviceSendInfo = (deviceSendInfo) => {
    return {
        type: 'SET_DEVICE_SEND_INFO',
        payload: deviceSendInfo,
    };
};
export const setDeviceItemSendInfo = (sendInfo) => {
    return {
        type: 'SET_DEVICE_ITEM_SEND_INFO',
        payload: sendInfo,
    };
};
export const setDeviceData = (deviceData) => {
    return {
        type: 'SET_DEVICE_DATA',
        payload: deviceData,
    };
};
