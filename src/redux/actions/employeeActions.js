export const setEmployeesData = (employeesData) => {
    return {
        type: 'SET_EMPLOYEES_DATA',
        payload: employeesData,
    };
};

export const setEmployeeData = (employeeData) => {
    return {
        type: 'SET_EMPLOYEE_DATA',
        payload: employeeData,
    };
};

export const setEmployeeSendInfo = (employeeSendInfo) => {
    return {
        type: 'SET_EMPLOYEE_SEND_INFO',
        payload: employeeSendInfo,
    };
};

export const setRoles = (roles) => {
    return {
        type: 'SET_ROLES',
        payload: roles,
    };
};
export const setRolesSend = (roles) => {
    return {
        type: 'SET_ROLES_SEND',
        payload: roles,
    };
};
