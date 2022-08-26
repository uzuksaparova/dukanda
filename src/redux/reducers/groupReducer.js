const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};

const initialUpdateState = {
    image: 'all',
    nameSingularTm: 'all',
    nameSingularTr: 'all',
    nameSingularRu: 'all',
    nameSingularEng: 'all',
    namePluralTm: 'all',
    namePluralTr: 'all',
    namePluralRu: 'all',
    namePluralEng: 'all',
    limit: 15,
    offset: 0,
    search: '',
    active: true,
};

export const groupsData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GROUPS_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const groupSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_GROUP_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const groups = (state = { groups: [] }, action) => {
    switch (action.type) {
        case 'SET_GROUPS':
            return { ...state, groups: action.payload };
        default:
            return state;
    }
};
export const subgroup = (state = { subgroup: {} }, action) => {
    switch (action.type) {
        case 'SET_SUBGROUP':
            return { ...state, subgroup: action.payload };
        default:
            return state;
    }
};
export const maingroup = (state = { maingroup: {} }, action) => {
    switch (action.type) {
        case 'SET_MAINGROUP':
            return { ...state, maingroup: action.payload };
        default:
            return state;
    }
};

export const groupData = (state = { groupData: {} }, action) => {
    switch (action.type) {
        case 'SET_GROUP_DATA':
            return { ...state, groupData: action.payload };
        default:
            return state;
    }
};
export const lastGroupNames = (state = { lastGroupNames: [] }, action) => {
    switch (action.type) {
        case 'SET_LAST_GROUP_NAMES':
            return { ...state, lastGroupNames: action.payload };
        default:
            return state;
    }
};
export const mainGroupNames = (state = { mainGroupNames: [] }, action) => {
    switch (action.type) {
        case 'SET_LAST_GROUP_NAMES':
            return { ...state, lastGroupNames: action.payload };
        default:
            return state;
    }
};
