export const setParettoInfoo = (info) => {
    return {
        type: 'SET_PARETTO_INFOO',
        payload: info,
    };
};
export const setIsError = (isError) => {
    return {
        type: 'SET_IS_ERROR',
        payload: isError,
    };
};
export const setIsEmployeeModalOpen = (open) => {
    return {
        type: 'SET_IS_EMPLOYEE_MODAL_OPEN',
        payload: open,
    };
};
