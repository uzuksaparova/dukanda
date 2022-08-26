const initialState = {
    isFilterOpen: false,
    isSortOpen: false,
    sidebarSearchValue: '',
    isSidebarOpen: false,
};

export const isFilterOpen = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_FILTER_OPEN':
            return { ...state, isFilterOpen: action.payload };
        default:
            return state;
    }
};
export const isSortOpen = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_SORT_OPEN':
            return { ...state, isSortOpen: action.payload };
        default:
            return state;
    }
};

export const sidebarSearchValue = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SIDEBAR_SEARCH_VALUE':
            return { ...state, sidebarSearchValue: action.payload };
        default:
            return state;
    }
};
export const isSidebarOpen = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_SIDEBAR_OPEN':
            return { ...state, isSidebarOpen: action.payload };
        default:
            return state;
    }
};
