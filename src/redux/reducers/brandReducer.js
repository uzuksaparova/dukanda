const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};
const initialUpdateState = {
    limit: 40,
    offset: 0,
    search: '',
};

export const brandData = (state = { brandData: {} }, action) => {
    //brandData
    switch (action.type) {
        case 'SET_BRAND_DATA':
            return { ...state, brandData: action.payload };
        default:
            return state;
    }
};
export const brandsData = (state = initialState, action) => {
    //brandsData.data ==> adminBrandsInfo
    //brandsData.isEnd ==> isBrandsEnd
    //brandsData.noData ==> noBrandsData
    //brandsData.isError ==> isError

    switch (action.type) {
        case 'SET_BRANDS_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const brandSendInfo = (state = initialUpdateState, action) => {
    //brandUpdateInfo
    switch (action.type) {
        case 'SET_BRAND_SEND_INFO':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export const brandIds = (state = { brandIds: [] }, action) => {
    //brandIds
    switch (action.type) {
        case 'SET_BRAND_IDS':
            return {
                ...state,
                brandIds: action.payload,
            };
        default:
            return state;
    }
};
