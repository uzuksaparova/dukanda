const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};

const initialUpdateState = {
    image: 'all',
    lastGroup: [],
    paretto: [],
    limit: 10,
    offset: 0,
    search: '',
    language: 'tm',
    active: true,
    nameRu: 'all',
    nameTm: 'all',
    nameTr: 'all',
    nameEng: 'all',
    infoRu: 'all',
    infoTm: 'all',
    infoTr: 'all',
    infoEng: 'all',
    onlyInStock: '',
};

export const productsData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const productData = (state = { productData: '' }, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_DATA':
            return { ...state, productData: action.payload };
        default:
            return state;
    }
};

export const isProductStockModalOpen = (
    state = { isProductStockModalOpen: false },
    action
) => {
    switch (action.type) {
        case 'SET_IS_PRODUCT_STOCK_MODAL_OPEN':
            return { ...state, isProductStockModalOpen: action.payload };
        default:
            return state;
    }
};
export const isProductImageModalOpen = (
    state = { isProductImageModalOpen: false },
    action
) => {
    switch (action.type) {
        case 'SET_IS_PRODUCT_IMAGE_MODAL_OPEN':
            return { ...state, isProductImageModalOpen: action.payload };
        default:
            return state;
    }
};

export const productSendInfo = (state = initialUpdateState, action) => {
    //productUpdateInfo
    switch (action.type) {
        case 'SET_PRODUCT_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const productItemSendInfo = (
    state = { productItemSendInfo: {} },
    action
) => {
    switch (action.type) {
        case 'SET_PRODUCT_ITEM_SEND_INFO':
            return { ...state, productItemSendInfo: action.payload };
        default:
            return state;
    }
};
export const productImages = (state = { productImages: [] }, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_IMAGES':
            return { ...state, productImages: action.payload };
        default:
            return state;
    }
};
export const cardImagesIndex = (state = { cardImagesIndex: 0 }, action) => {
    switch (action.type) {
        case 'SET_CARD_IMAGES_INDEX':
            return { ...state, cardImagesIndex: action.payload };
        default:
            return state;
    }
};
export const productInputValues = (
    state = {
        nameRu: '',
        nameTm: '',
        nameTr: '',
        nameEng: '',
        infoRu: '',
        infoTm: '',
        infoTr: '',
        infoEng: '',
    },
    action
) => {
    switch (action.type) {
        case 'SET_PRODUCT_INPUT_VALUES':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
