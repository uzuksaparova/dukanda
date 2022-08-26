export const setBannersData = (bannersData) => {
    return {
        type: 'SET_BANNERS_DATA',
        payload: bannersData,
    };
};
export const setBannerData = (bannerData) => {
    return {
        type: 'SET_BANNER_DATA',
        payload: bannerData,
    };
};
export const setBannerItems = (bannerItems) => {
    return {
        type: 'SET_BANNER_ITEMS',
        payload: bannerItems,
    };
};
export const setBannerSendInfo = (sendInfo) => {
    return {
        type: 'SET_BANNER_SEND_INFO',
        payload: sendInfo,
    };
};
export const setIsBannerItemModalOpen = (open) => {
    return {
        type: 'SET_IS_BANNER_ITEM_MODAL_OPEN',
        payload: open,
    };
};

export const setBannerProductsId = (ids) => {
    return {
        type: 'SET_BANNER_PRODUCTS_ID',
        payload: ids,
    };
};
