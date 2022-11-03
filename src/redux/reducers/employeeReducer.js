const initialState = {
    data: [],
    noData: false,
    isError: false,
    isEnd: false,
};
const initialUpdateState = {
    limit: 15,
    offset: 0,
    search: '',
    active: true,
    order: 'userName',
    orderType: 'asc',
    role: [],
};

const intialItemUpdateState = {
    id: '',
    role: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    divisions: [],
    active: true,
    syncAccess: false,
    qrClientCardShareAccess: false,
    tigerEmployeeId: 'def',
};

const initialStockPermissionsEventsState = {
    noData: false,
    isError: false,
};

export const employeesData = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEES_DATA':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const employeeData = (state = { employeeData: {} }, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE_DATA':
            return { ...state, employeeData: action.payload };
        default:
            return state;
    }
};
export const employeeSendInfo = (state = initialUpdateState, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const employeeItemSendInfo = (state = intialItemUpdateState, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE_ITEM_SEND_INFO':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const roles = (state = { roles: [] }, action) => {
    switch (action.type) {
        case 'SET_ROLES':
            return {
                ...state,
                roles: action.payload,
            };
        default:
            return state;
    }
};

export const rolesSend = (state = { rolesSend: [] }, action) => {
    switch (action.type) {
        case 'SET_ROLES_SEND':
            return {
                ...state,
                rolesSend: action.payload,
            };
        default:
            return state;
    }
};
export const stockPermissions = (state = { stockPermissions: [] }, action) => {
    switch (action.type) {
        case 'SET_STOCK_PERMISSIONS':
            return {
                ...state,
                stockPermissions: action.payload,
            };
        default:
            return state;
    }
};
export const stockPermissionsEvents = (
    state = initialStockPermissionsEventsState,
    action
) => {
    switch (action.type) {
        case 'SET_STOCK_PERMISSIONS_EVENTS':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
