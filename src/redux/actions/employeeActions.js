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
export const setEmployeeItemSendInfo = (info) => {
    return {
        type: 'SET_EMPLOYEE_ITEM_SEND_INFO',
        payload: info,
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
export const setStockPermissions = (permissions) => {
    return {
        type: 'SET_STOCK_PERMISSIONS',
        payload: permissions,
    };
};
export const setStockPermissionsEvents = (permissions) => {
    return {
        type: 'SET_STOCK_PERMISSIONS_EVENTS',
        payload: permissions,
    };
};
