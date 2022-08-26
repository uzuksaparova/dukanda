export const setGroupsData = (groupsData) => {
    return {
        type: 'SET_GROUPS_DATA',
        payload: groupsData,
    };
};
export const setGroupSendInfo = (info) => {
    return {
        type: 'SET_GROUP_SEND_INFO',
        payload: info,
    };
};
export const setGroups = (groups) => {
    return {
        type: 'SET_GROUPS',
        payload: groups,
    };
};
export const setSubgroup = (subgroup) => {
    return {
        type: 'SET_SUBGROUP',
        payload: subgroup,
    };
};
export const setMaingroup = (maingroup) => {
    return {
        type: 'SET_MAINGROUP',
        payload: maingroup,
    };
};
export const setMaingroupData = (data) => {
    return {
        type: 'SET_MAINGROUP_DATA',
        payload: data,
    };
};
export const setSubgroupData = (data) => {
    return {
        type: 'SET_SUBGROUP_DATA',
        payload: data,
    };
};
export const setGroupData = (data) => {
    return {
        type: 'SET_GROUP_DATA',
        payload: data,
    };
};
export const setLastGroupNames = (names) => {
    return {
        type: 'SET_LAST_GROUP_NAMES',
        payload: names,
    };
};
