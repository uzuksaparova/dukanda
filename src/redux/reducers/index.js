import { combineReducers } from 'redux';

import { decodedToken } from './signInReducer';
import {
    isFilterOpen,
    isSortOpen,
    sidebarSearchValue,
    isSidebarOpen,
} from './sidebarReducer';
import { unitsData, unitSendInfo, unitData } from './unitReducer';
import {
    devicesData,
    deviceSendInfo,
    deviceData,
    deviceItemSendInfo,
} from './deviceReducer';
import {
    clientsData,
    clientSendInfo,
    clientItemSendInfo,
    clientData,
    clientDivisionData,
} from './clientReducer';
import {
    employeesData,
    employeeData,
    employeeSendInfo,
    roles,
    rolesSend,
} from './employeeReducer';
import { brandsData, brandData, brandIds, brandSendInfo } from './brandReducer';
import {
    bannersData,
    bannerItems,
    bannerSendInfo,
    isBannerItemModalOpen,
    bannerProductsId,
    bannerData,
} from './bannerReducer';

import {
    groupsData,
    groupSendInfo,
    groups,
    subgroup,
    maingroup,
    groupData,
    lastGroupNames,
} from './groupReducer';

import {
    productsData,
    productData,
    isProductStockModalOpen,
    isProductImageModalOpen,
    productSendInfo,
    productItemSendInfo,
    productImages,
    cardImagesIndex,
    productInputValues,
} from './productReducer';
import {
    smartSectionsData,
    smartSectionData,
    smartSectionSendInfo,
} from './smartSectionReducer';

import {
    orderData,
    ordersData,
    orderStatuses,
    orderSendInfo,
    rightTabInfo,
} from './orderReducer';

import {
    divisionsData,
    divisionData,
    divisionSendInfo,
    isDivisionClientModalOpen,
    divisionItemSendInfo,
    deliveryCostSendInfo,
    warehouseChip,
} from './divisionReducer';

import {
    syncHistoryData,
    syncHistoriesData,
    syncSchedulesData,
    syncScheduleData,
    syncHistorySendInfo,
} from './syncReducer';
import {
    qrDevicesData,
    qrDeviceSendInfo,
    qrDeviceItemSendInfo,
    qrDeviceData,
} from './qrDeviceReducer';

const forParettoState = {};
const parettoInfo = [
    { code: 'best', name: 'Cok Satan' },
    { code: 'middle', name: 'Orta Satan' },
    { code: 'least', name: 'Az Satan' },
];
parettoInfo.forEach((paretto) => {
    forParettoState[paretto.code] = false;
});

const parettoInfoo = (
    state = { parettoInfoo: { ...forParettoState } },
    action
) => {
    switch (action.type) {
        case 'SET_PARETTO_INFOO': {
            return { ...state, parettoInfoo: action.payload };
        }
        default:
            return state;
    }
};

const isError = (state = { isError: false }, action) => {
    switch (action.type) {
        case 'SET_IS_ERROR': {
            return { ...state, isError: action.payload };
        }
        default:
            return state;
    }
};
export default combineReducers({
    decodedToken,
    isFilterOpen,
    isSortOpen,
    sidebarSearchValue,
    isSidebarOpen,
    isError,
    unitsData,
    unitSendInfo,
    unitData,
    devicesData,
    deviceSendInfo,
    deviceData,
    clientsData,
    clientSendInfo,
    clientItemSendInfo,
    clientData,
    clientDivisionData,
    deviceItemSendInfo,
    employeesData,
    employeeData,
    employeeSendInfo,
    smartSectionsData,
    smartSectionData,
    smartSectionSendInfo,
    roles,
    brandsData,
    brandData,
    brandIds,
    brandSendInfo,
    bannersData,
    bannerItems,
    bannerSendInfo,
    isBannerItemModalOpen,
    bannerProductsId,
    bannerData,
    groupsData,
    groupSendInfo,
    groups,
    subgroup,
    maingroup,
    groupData,
    lastGroupNames,
    productsData,
    productData,
    productInputValues,
    isProductStockModalOpen,
    isProductImageModalOpen,
    productSendInfo,
    productItemSendInfo,
    productImages,
    parettoInfoo,
    cardImagesIndex,
    orderData,
    ordersData,
    orderStatuses,

    orderSendInfo,
    rightTabInfo,
    divisionsData,
    divisionData,
    divisionSendInfo,
    warehouseChip,
    divisionItemSendInfo,
    deliveryCostSendInfo,
    isDivisionClientModalOpen,
    syncHistoryData,
    syncHistoriesData,
    syncSchedulesData,
    syncScheduleData,
    syncHistorySendInfo,
    isSortOpen,
    rolesSend,

    qrDevicesData,
    qrDeviceSendInfo,
    qrDeviceItemSendInfo,
    qrDeviceData,
});