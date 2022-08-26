export const setIsFilterOpen = (isFilterOpen) => {
    return {
        type: 'SET_IS_FILTER_OPEN',
        payload: isFilterOpen,
    };
};

export const setIsSortOpen = (isSortOpen) => {
    return {
        type: 'SET_IS_SORT_OPEN',
        payload: isSortOpen,
    };
};

export const setSidebarSearchValue = (sidebarSearchValue) => {
    return {
        type: 'SET_SIDEBAR_SEARCH_VALUE',
        payload: sidebarSearchValue,
    };
};

export const setIsSidebarOpen = (isSidebarOpen) => {
    return {
        type: 'SET_IS_SIDEBAR_OPEN',
        payload: isSidebarOpen,
    };
};
