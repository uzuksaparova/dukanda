export const setBrandData = (brandData) => {
    return {
        type: 'SET_BRAND_DATA',
        payload: brandData,
    };
};
export const setBrandsData = (brandsData) => {
    return {
        type: 'SET_BRANDS_DATA',
        payload: brandsData,
    };
};
export const setBrandSendInfo = (brandUpdateInfo) => {
    return {
        type: 'SET_BRAND_SEND_INFO',
        payload: brandUpdateInfo,
    };
};
export const setBrandIds = (brandIds) => {
    return {
        type: 'SET_BRAND_IDS',
        payload: brandIds,
    };
};
