export const setSyncHistoriesData = (historiesData) => {
    return {
        type: 'SET_SYNC_HISTORIES_DATA',
        payload: historiesData,
    };
};
export const setSyncHistoryData = (historiesData) => {
    return {
        type: 'SET_SYNC_HISTORY_DATA',
        payload: historiesData,
    };
};
export const setSyncSchedulesData = (historiesData) => {
    return {
        type: 'SET_SYNC_SCHEDULES_DATA',
        payload: historiesData,
    };
};
export const setSyncScheduleData = (historiesData) => {
    return {
        type: 'SET_SYNC_SCHEDULE_DATA',
        payload: historiesData,
    };
};

export const setSyncHistorySendInfo = (historiesData) => {
    return {
        type: 'SET_SYNC_HISTORY_SEND_INFO',
        payload: historiesData,
    };
};
