export const setQrDevicesData = (qrDevicesData) => {
    return {
        type: 'SET_QR_DEVICES_DATA',
        payload: qrDevicesData,
    };
};
export const setQrDeviceSendInfo = (qrDeviceSendInfo) => {
    return {
        type: 'SET_QR_DEVICE_SEND_INFO',
        payload: qrDeviceSendInfo,
    };
};
export const setQrDeviceItemSendInfo = (sendInfo) => {
    return {
        type: 'SET_QR_DEVICE_ITEM_SEND_INFO',
        payload: sendInfo,
    };
};
export const setQrDeviceData = (qrDeviceData) => {
    return {
        type: 'SET_QR_DEVICE_DATA',
        payload: qrDeviceData,
    };
};
