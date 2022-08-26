export const setProductsData = (productsData) => {
    return {
        type: 'SET_PRODUCTS_DATA',
        payload: productsData,
    };
};
export const setProductData = (productData) => {
    return {
        type: 'SET_PRODUCT_DATA',
        payload: productData,
    };
};
export const setIsProductStockModalOpen = (open) => {
    return {
        type: 'SET_IS_PRODUCT_STOCK_MODAL_OPEN',
        payload: open,
    };
};
export const setIsProductImageModalOpen = (open) => {
    return {
        type: 'SET_IS_PRODUCT_IMAGE_MODAL_OPEN',
        payload: open,
    };
};
export const setProductSendInfo = (info) => {
    return {
        type: 'SET_PRODUCT_SEND_INFO',
        payload: info,
    };
};
export const setProductItemSendInfo = (info) => {
    return {
        type: 'SET_PRODUCT_ITEM_SEND_INFO',
        payload: info,
    };
};
export const setProductImages = (images) => {
    return {
        type: 'SET_PRODUCT_IMAGES',
        payload: images,
    };
};
export const setCardImagesIndex = (index) => {
    return {
        type: 'SET_CARD_IMAGES_INDEX',
        payload: index,
    };
};
export const setProductInputValues = (values) => {
    return {
        type: 'SET_PRODUCT_INPUT_VALUES',
        payload: values,
    };
};
