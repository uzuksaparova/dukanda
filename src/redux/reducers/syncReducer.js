const initialState = {
    data: [],
    noData: false,
    isEnd: false,
    isError: false,
};

const initialUpdateState = {
    limit: 20,
    offset: 0,
};

export const syncHistoriesData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SYNC_HISTORIES_DATA':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const syncSchedulesData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SYNC_SCHEDULES_DATA':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
export const syncHistoryData = (state = { syncHistoryData: {} }, action) => {
    switch (action.type) {
        case 'SET_SYNC_HISTORY_DATA':
            return {
                ...state,
                syncHistoryData: action.payload,
            };
        default:
            return state;
    }
};
export const syncScheduleData = (state = { syncScheduleData: {} }, action) => {
    switch (action.type) {
        case 'SET_SYNC_SCHEDULE_DATA':
            return {
                ...state,
                syncScheduleData: action.payload,
            };
        default:
            return state;
    }
};

export const syncHistorySendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_SYNC_HISTORY_SEND_INFO':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
