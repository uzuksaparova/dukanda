var pathName = window.location.pathname;

const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};

const initialUpdateState = {
    type: pathName.includes('top')
        ? 'top'
        : pathName.includes('carousel')
        ? 'carousel'
        : 'aside',
    limit: 7,
    offset: 0,
    search: '',
    sortOrder: 'asc',
    sortName: 'name',
    active: '',
    actionType: '',
    language: '',
};

const initialItemState = {
    id: '',
    type: '',
    name: '',
    startDate: '',
    endDate: '',
    color: '',
    active: true,
    actionType: 'news',
    language: '',
    priority: '5',
    images: [],
};

export const bannersData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BANNERS_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const bannerData = (state = initialItemState, action) => {
    switch (action.type) {
        case 'SET_BANNER_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const bannerItems = (state = { bannerItems: [] }, action) => {
    switch (action.type) {
        case 'SET_BANNER_ITEMS':
            return { ...state, bannerItems: action.payload };
        default:
            return state;
    }
};

export const bannerSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_BANNER_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const isBannerItemModalOpen = (
    state = { isBannerItemModalOpen: false },
    action
) => {
    switch (action.type) {
        case 'SET_IS_BANNER_ITEM_MODAL_OPEN':
            return { ...state, isBannerItemModalOpen: action.payload };
        default:
            return state;
    }
};

export const bannerProductsId = (state = { bannerProductsId: [] }, action) => {
    switch (action.type) {
        case 'SET_BANNER_PRODUCTS_ID':
            return { ...state, bannerProductsId: action.payload };
        default:
            return state;
    }
};
