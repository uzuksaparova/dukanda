import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import store from '../redux/store';
import { setUnitsData, setUnitSendInfo } from '../redux/actions/unitActions';
import {
    setDevicesData,
    setDeviceSendInfo,
} from '../redux/actions/deviceActions';
import dateFormat from 'dateformat';
import {
    setClientsData,
    setClientSendInfo,
} from '../redux/actions/clientActions';
import {
    setEmployeesData,
    setEmployeeSendInfo,
} from '../redux/actions/employeeActions';
import { setBrandsData, setBrandSendInfo } from '../redux/actions/brandActions';
import { setOrdersData, setOrderSendInfo } from '../redux/actions/orderActions';

import {
    setSmartSectionsData,
    setSmartSectionSendInfo,
} from '../redux/actions/smartSectionActions';

import {
    setBannerData,
    setBannerItems,
    setBannersData,
    setBannerSendInfo,
    setBannerProductsId,
} from '../redux/actions/bannerActions';
import {
    setGroups,
    setMaingroup,
    setSubgroup,
    setLastGroupNames,
    setGroupSendInfo,
    setGroupsData,
} from '../redux/actions/groupActions';
import {
    setProductsData,
    setProductSendInfo,
} from '../redux/actions/productActions';
import { setIsError, setParettoInfoo } from '../redux/actions';
import {
    setDivisionsData,
    setDivisionSendInfo,
} from '../redux/actions/divisionActions';
import {
    setSyncHistoriesData,
    setSyncHistorySendInfo,
    setSyncSchedulesData,
} from '../redux/actions/syncActions';
import {
    setQrDevicesData,
    setQrDeviceSendInfo,
} from '../redux/actions/qrDeviceActions';

const forParettoState = {};
export const parettoInfo = [
    { code: 'best', name: 'Cok Satan' },
    { code: 'middle', name: 'Orta Satan' },
    { code: 'least', name: 'Az Satan' },
];
parettoInfo.forEach((paretto) => {
    forParettoState[paretto.code] = false;
});

var token = Cookies.get('admin_token');
var bearer = 'Bearer ' + token;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6MTQ4LCJpYXQiOjE2NTY1NzE0ODYsImV4cCI6MjUyMDU3MTQ4Nn0.APOjN1dHeayd9d_I9qVqUfY8AWY6Oz6ObK5uGQbN0IM
export const BACKEND_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://timar.com.tm/api'
        : 'https://timar.com.tm/api';
//   'http://172.10.18.15:8053/api';

export function newLocation(path) {
    window.location.href = path;
}

//fetching units data
export const fetchUnitsInfo = (firstTime = false, temp) => {
    const { unitsData, unitSendInfo } = store.getState();
    fetchWithParams(
        {
            params: firstTime ? (temp ? temp : unitSendInfo) : unitSendInfo,
            url: `${BACKEND_URL}/admin/units`,
        },
        (data) => {
            let unitsDataTemp = { ...unitsData, isError: false };
            let unitSendTemp = { ...unitSendInfo };
            data.length && firstTime
                ? (unitsDataTemp.noData = false)
                : (unitsDataTemp.noData = true);
            !data.length || data.length < unitSendTemp.limit
                ? (unitsDataTemp.isEnd = true)
                : (unitsDataTemp.isEnd = false);
            if (firstTime) {
                unitsDataTemp.data = [];
            }
            unitSendTemp.offset = unitSendTemp.limit + unitSendTemp.offset;
            unitsDataTemp.data = [...unitsDataTemp.data, ...data];

            store.dispatch(setUnitsData(unitsDataTemp));
            store.dispatch(setUnitSendInfo(unitSendTemp));
        }
    );
};

export const fetchGroupsInfo = (firstTime = false, url, menuSend) => {
    const { groupsData, groupSendInfo } = store.getState();
    let sendInfo = menuSend ? { ...menuSend } : { ...groupSendInfo };
    let params =
        url !== '/admin/mainGroups'
            ? {
                  ...sendInfo,
                  includes: 'mainGroups',
              }
            : sendInfo;

    fetchWithParams(
        {
            url: `${BACKEND_URL}${url}`,
            params,
        },
        (data) => {
            let groupsDataTemp = { ...groupsData, isError: false };
            let groupSendTemp = { ...groupSendInfo };
            if (firstTime) {
                groupsDataTemp.data = [];
            }
            data.length && firstTime
                ? (groupsDataTemp.noData = false)
                : (groupsDataTemp.noData = true);
            !data.length || data.length < groupSendTemp.limit
                ? (groupsDataTemp.isEnd = true)
                : (groupsDataTemp.isEnd = false);
            if (firstTime) {
                groupSendTemp.offset = groupSendTemp.limit;
                groupsDataTemp.data = [...data];
            } else {
                groupSendTemp.offset =
                    groupSendTemp.limit + groupSendTemp.offset;
                groupsDataTemp.data = [...groupsDataTemp.data, ...data];
            }

            store.dispatch(setGroupsData(groupsDataTemp));
            store.dispatch(setGroupSendInfo(groupSendTemp));
        }
    );
};

export const fetchBannersInfo = (firstTime = false, temp) => {
    const { bannersData, bannerSendInfo } = store.getState();
    fetchWithParams(
        {
            url: `${BACKEND_URL}/admin/banners`,
            params: temp ? temp : bannerSendInfo,
        },
        (data) => {
            let bannersDataTemp = { ...bannersData, isError: false };
            let bannerSendTemp = { ...bannerSendInfo };
            if (firstTime) {
                bannersDataTemp.data = [];
            }
            data.length && firstTime
                ? (bannersDataTemp.noData = false)
                : (bannersDataTemp.noData = true);
            !data.length || data.length < bannerSendTemp.limit
                ? (bannersDataTemp.isEnd = true)
                : (bannersDataTemp.isEnd = false);
            data.forEach((banner) => {
                if (banner.startDate) {
                    banner.startDate = dateFormat(
                        banner.startDate,
                        'yyyy-mm-dd'
                    );
                }
                if (banner.endDate) {
                    banner.endDate = dateFormat(banner.endDate, 'yyyy-mm-dd');
                }
            });

            if (firstTime) {
                bannerSendTemp.offset = bannerSendTemp.limit;
                bannersDataTemp.data = [...data];
            } else {
                bannerSendTemp.offset =
                    bannerSendTemp.limit + bannerSendTemp.offset;
                bannersDataTemp.data = [...bannersDataTemp.data, ...data];
            }

            store.dispatch(setBannersData(bannersDataTemp));
            store.dispatch(setBannerSendInfo(bannerSendTemp));
        }
    );
};
export const fetchSyncSchedulesInfo = () => {
    const { syncSchedulesData } = store.getState();
    fetchForAdmin(
        {
            method: 'GET',
            url: `${BACKEND_URL}/admin/sync/schedules`,
        },
        (data) => {
            let tempSyncSchedulesInfo = {
                ...syncSchedulesData,
                isError: false,
            };
            data.length
                ? (tempSyncSchedulesInfo.noData = false)
                : (tempSyncSchedulesInfo.noData = true);
            data.forEach((schedule) => {
                if (schedule.startDate) {
                    schedule.startDate = dateFormat(
                        schedule.startDate,
                        'yyyy-mm-dd'
                    );
                }
                if (schedule.endDate) {
                    schedule.endDate = dateFormat(
                        schedule.endDate,
                        'yyyy-mm-dd'
                    );
                }
                if (schedule.nextRunTime) {
                    schedule.nextRunTime = dateFormat(
                        schedule.nextRunTime,
                        'yyyy-mm-dd HH:MM'
                    );
                }
                if (schedule.lastRunTime) {
                    schedule.lastRunTime = dateFormat(
                        schedule.lastRunTime,
                        'yyyy-mm-dd HH:MM'
                    );
                }
                if (schedule.onceDateTime) {
                    schedule.onceDateTime = dateFormat(
                        schedule.onceDateTime,
                        'yyyy-mm-dd'
                    );
                }
            });
            tempSyncSchedulesInfo.data = data;
            store.dispatch(setSyncSchedulesData(tempSyncSchedulesInfo));
        }
    );
};

export const fetchSyncScheduleHistoryInfo = (firstTime = false, temp) => {
    const { syncHistorySendInfo, syncHistoriesData } = store.getState();
    fetchWithParams(
        {
            url: `${BACKEND_URL}/admin/sync/history`,
            params: firstTime
                ? temp
                    ? temp
                    : syncHistorySendInfo
                : syncHistorySendInfo,
        },
        (data) => {
            let syncHistoriesDataTemp = {
                ...syncHistoriesData,
                isError: false,
            };
            let syncHistorySendTemp = { ...syncHistorySendInfo };
            if (firstTime) {
                syncHistoriesDataTemp.data = [];
            }
            data.length && firstTime
                ? (syncHistoriesDataTemp.noData = false)
                : (syncHistoriesDataTemp.noData = true);
            !data.length || data.length < syncHistorySendTemp.limit
                ? (syncHistoriesDataTemp.isEnd = true)
                : (syncHistoriesDataTemp.isEnd = false);

            data.forEach((history) => {
                history.createdAt = dateFormat(
                    history.createdAt,
                    'yyyy-mm-dd HH:MM'
                );
                history.updatedAt = dateFormat(
                    history.updatedAt,
                    'yyyy-mm-dd HH:MM'
                );
            });

            syncHistorySendTemp.offset =
                syncHistorySendTemp.limit + syncHistorySendTemp.offset;
            syncHistoriesDataTemp.data = [
                ...syncHistoriesDataTemp.data,
                ...data,
            ];

            store.dispatch(setSyncHistoriesData(syncHistoriesDataTemp));
            store.dispatch(setSyncHistorySendInfo(syncHistorySendTemp));
        }
    );
};

export const handleBannerDeleteButton = (id) => {
    const { bannersData } = store.getState();
    deleteForAdmin(
        {
            url: `${BACKEND_URL}/admin/banners/${id}`,
            notifyMessage: 'Banner pozulýar',
            updateMessage: 'Banner pozuldy',
        },
        (data) => {
            let tempBannersData = bannersData;
            tempBannersData.data = tempBannersData.data.filter(
                (temp) => temp.id !== id
            );
            if (tempBannersData.data.length === 0) {
                tempBannersData.isEnd = true;
                tempBannersData.noData = true;
            }
            store.dispatch(setBannersData(tempBannersData));
        }
    );
};

export const handleBannerImageDeleteButton = (id) => {
    const { bannerData } = store.getState();
    deleteForAdmin(
        {
            url: `${BACKEND_URL}/admin/banners/image/${id}`,
            notifyMessage: 'Banner suraty pozulýar',
            updateMessage: 'Banner suraty pozuldy',
        },
        (data) => {
            var tempo = bannerData;
            var filteredImages = tempo.images.filter((temp) => temp.id !== id);
            store.dispatch(
                setBannerData({
                    ...bannerData,
                    images: filteredImages,
                })
            );
        }
    );
};

export const handleBannerAdd = () => {
    store.dispatch(
        setBannerData({
            id: '',
            type: '',
            name: '',
            startDate: '',
            endDate: '',
            color: '',
            active: true,
            actionType: 'news',
            priority: '5',
            images: [],
        })
    );
    store.dispatch(setBannerItems([]));
};
// //handles the removal of selected products from chip in banners
export const handleProductDelete = (id) => {
    const { bannerItems } = store.getState();
    var tempBannerItems = bannerItems.bannerItems;
    tempBannerItems = tempBannerItems.filter((item) => item.id !== id);
    store.dispatch(setBannerItems([...tempBannerItems]));
};
export const fetchFunction = (location) => {
    const forAltGroupState = {};
    const forMainGroupState = {};
    fetchForAdmin(
        {
            url: `${BACKEND_URL}/admin/mainGroups/lastGroups/forFilter`,
            method: 'GET',
        },
        (data) => {
            let la = [];
            data?.forEach((group, i) => {
                if (location === 'smartSection') {
                    forMainGroupState[group.id] = false;
                } else if (location === 'subgroups') {
                    forMainGroupState[group.id] = true;
                } else {
                    forMainGroupState[group.code] = true;
                }
                if (location === 'smartSection') {
                    group.lastGroups?.forEach((subgroup) => {
                        forAltGroupState[subgroup.id] = false;
                        la.push({
                            name: subgroup.name,
                            id: subgroup.id,
                            isChecked: false,
                        });
                    });
                } else {
                    group.lastGroups?.forEach((subgroup) => {
                        forAltGroupState[subgroup.code] = true;
                    });
                }
            });
            store.dispatch(setSubgroup(forAltGroupState));
            store.dispatch(setLastGroupNames(la));
            store.dispatch(setMaingroup(forMainGroupState));
            store.dispatch(setGroups(data));
            return data;
        }
    );
};
export const handleProductResetButton = () => {
    const { productsData, sidebarSearchValue } = store.getState();
    store.dispatch(setParettoInfoo({ ...forParettoState }));
    store.dispatch(setProductsData({ ...productsData, data: [] }));

    var menuSend = {
        image: 'all',
        lastGroup: [],
        paretto: [],
        limit: 10,
        offset: 0,
        search: sidebarSearchValue.sidebarSearchValue,
        language: 'tm',
        active: true,
        nameRu: 'all',
        nameTm: 'all',
        nameTr: 'all',
        nameEng: 'all',
        infoRu: 'all',
        infoTm: 'all',
        infoTr: 'all',
        infoEng: 'all',
    };
    store.dispatch(setProductSendInfo(menuSend));
    fetchProductsInfo(true, menuSend);
};

export const handleGroupResetButton = (url) => {
    const { groupsData } = store.getState();
    store.dispatch(setGroupsData({ ...groupsData, isEnd: false, data: [] }));
    fetchFunction();
    var menuSend = {
        image: 'all',
        active: true,
        offset: 0,
        search: '',
        limit: 15,
        nameSingularRu: 'all',
        nameSingularTm: 'all',
        nameSingularTr: 'all',
        nameSingularEng: 'all',
        namePluralRu: 'all',
        namePluralTm: 'all',
        namePluralTr: 'all',
        namePluralEng: 'all',
    };
    store.dispatch(setGroupSendInfo(menuSend));
    // fetchGroupsInfo(true, url, menuSend);
};

export const fetchProductsInfo = (
    firstTime = false,
    menuSend,
    location = 'products'
) => {
    const { productSendInfo, bannerProductsId, productsData, bannerItems } =
        store.getState();
    fetchWithParams(
        {
            url: `${BACKEND_URL}/admin/items`,
            params: firstTime
                ? menuSend
                    ? menuSend
                    : { ...productSendInfo, offset: 0 }
                : productSendInfo,
        },
        (data) => {
            if (location === 'banner' || location === 'smartSection') {
                var bannerIds = [];
                if (bannerItems.bannerItems.length) {
                    data.forEach((item) => {
                        var obj = {};
                        obj[item.id] = false;
                        bannerItems.bannerItems.forEach((av) => {
                            if (Number(item.id) === Number(av.id)) {
                                obj[item.id] = true;
                            }
                        });
                        bannerIds.push(obj);
                    });
                } else {
                    data.forEach((item) => {
                        var obj = {};
                        obj[item.id] = false;
                        bannerIds.push(obj);
                    });
                }

                firstTime
                    ? store.dispatch(setBannerProductsId([...bannerIds]))
                    : store.dispatch(
                          setBannerProductsId([
                              ...bannerProductsId.bannerProductsId,
                              ...bannerIds,
                          ])
                      );
            }
            let productsDataTemp = { ...productsData, isError: false };
            let productSendTemp = { ...productSendInfo };
            data.length && firstTime
                ? (productsDataTemp.noData = false)
                : (productsDataTemp.noData = true);
            !data.length || data.length < productSendTemp.limit
                ? (productsDataTemp.isEnd = true)
                : (productsDataTemp.isEnd = false);

            if (firstTime) {
                productsDataTemp.data = [];
                productSendTemp.offset = productSendTemp.limit;
                productsDataTemp.data = [...data];
            } else {
                productSendTemp.offset =
                    productSendTemp.limit + productSendTemp.offset;
                productsDataTemp.data = [...productsDataTemp.data, ...data];
            }
            store.dispatch(setProductsData(productsDataTemp));
            store.dispatch(setProductSendInfo(productSendTemp));
        }
    );
};
export const fetchEmployeesInfo = (firstTime = false, temp) => {
    const { employeesData, employeeSendInfo } = store.getState();
    fetchWithParams(
        {
            params: firstTime
                ? temp
                    ? temp
                    : { ...employeeSendInfo, offset: 0 }
                : employeeSendInfo,
            url: `${BACKEND_URL}/admin/employees`,
        },
        (data) => {
            let employeesDataTemp = { ...employeesData, isError: false };
            let employeeSendTemp = { ...employeeSendInfo };
            if (firstTime) {
                employeesDataTemp.data = [];
            }
            data.length && firstTime
                ? (employeesDataTemp.noData = false)
                : (employeesDataTemp.noData = true);
            !data.length || data.length < employeeSendTemp.limit
                ? (employeesDataTemp.isEnd = true)
                : (employeesDataTemp.isEnd = false);

            employeeSendTemp.offset =
                employeeSendTemp.limit + employeeSendTemp.offset;
            employeesDataTemp.data = [...employeesDataTemp.data, ...data];

            store.dispatch(setEmployeesData(employeesDataTemp));
            store.dispatch(setEmployeeSendInfo(employeeSendTemp));
        }
    );
};

export const fetchClientsInfo = (firstTime = false, temp) => {
    const { clientsData, clientSendInfo } = store.getState();
    fetchWithParams(
        {
            params: firstTime
                ? temp
                    ? temp
                    : { ...clientSendInfo, offset: 0 }
                : clientSendInfo,
            url: `${BACKEND_URL}/admin/clients`,
        },
        (data) => {
            let clientsDataTemp = { ...clientsData, isError: false };
            let clientSendTemp = { ...clientSendInfo };
            if (firstTime) {
                clientsDataTemp = { ...clientsData, isError: false, data: [] };
                clientSendTemp.offset = 0;
            }
            data.length && firstTime
                ? (clientsDataTemp.noData = false)
                : (clientsDataTemp.noData = true);
            !data.length || data.length < clientSendTemp.limit
                ? (clientsDataTemp.isEnd = true)
                : (clientsDataTemp.isEnd = false);

            clientSendTemp.offset =
                clientSendTemp.limit + clientSendTemp.offset;
            clientsDataTemp.data = [...clientsDataTemp.data, ...data];

            store.dispatch(setClientsData(clientsDataTemp));
            store.dispatch(setClientSendInfo(clientSendTemp));
        }
    );
};
// ! fetchOrdersInfo function is started here...
export const fetchOrdersInfo = (obj) => {
    const { ordersData, orderSendInfo } = store.getState();
    const { firstTime = false, temp = orderSendInfo, pathname } = obj;
    let splittedPathname = pathname.split('/');
    let id = splittedPathname[splittedPathname.length - 1];
    let tempWithOffset = firstTime ? { ...temp, offset: 0 } : { ...temp };
    let paramsSend = pathname.includes('clients')
        ? { ...tempWithOffset, clientId: id }
        : pathname.includes('devices')
        ? { ...tempWithOffset, deviceId: id }
        : { ...tempWithOffset };
    fetchWithParams(
        {
            url: `${BACKEND_URL}/admin/orders`,
            params: paramsSend,
        },
        (data) => {
            let ordersDataTemp = { ...ordersData, isError: false };
            let orderSendTemp = { ...orderSendInfo };
            if (firstTime) {
                ordersDataTemp.data = [];
                orderSendTemp.offset = 0;
            }
            data.length && firstTime
                ? (ordersDataTemp.noData = false)
                : (ordersDataTemp.noData = true);
            !data.length || data.length < orderSendTemp.limit
                ? (ordersDataTemp.isEnd = true)
                : (ordersDataTemp.isEnd = false);

            orderSendTemp.offset = orderSendTemp.limit + orderSendTemp.offset;
            ordersDataTemp.data = [...ordersDataTemp.data, ...data];

            store.dispatch(setOrdersData(ordersDataTemp));
            store.dispatch(setOrderSendInfo(orderSendTemp));
        }
    );
};
// ! smartSection section
export const fetchSmartSectionsInfo = (firstTime = false, temp) => {
    const { smartSectionsData, smartSectionSendInfo } = store.getState();
    fetchWithParams(
        {
            url: `${BACKEND_URL}/admin/sections`,
            params: firstTime
                ? temp
                    ? temp
                    : { ...smartSectionSendInfo, offset: 0 }
                : smartSectionSendInfo,
        },
        (data) => {
            let smartSectionDataTemp = { ...smartSectionsData, isError: false };
            let smartSectionSendTemp = { ...smartSectionSendInfo };
            if (firstTime) {
                smartSectionDataTemp.data = [];
            }
            data.length && firstTime
                ? (smartSectionDataTemp.noData = false)
                : (smartSectionDataTemp.noData = true);
            !data.length || data.length < smartSectionSendTemp.limit
                ? (smartSectionDataTemp.isEnd = true)
                : (smartSectionDataTemp.isEnd = false);
            data.forEach((smartSection) => {
                if (smartSection.startDate) {
                    smartSection.startDate = dateFormat(
                        smartSection.startDate,
                        'yyyy-mm-dd HH:MM'
                    );
                }
                if (smartSection.endDate) {
                    smartSection.endDate = dateFormat(
                        smartSection.endDate,
                        'yyyy-mm-dd HH:MM'
                    );
                }
            });

            smartSectionSendTemp.offset =
                smartSectionSendTemp.limit + smartSectionSendTemp.offset;
            smartSectionDataTemp.data = [...smartSectionDataTemp.data, ...data];
            store.dispatch(setSmartSectionsData(smartSectionDataTemp));
            store.dispatch(setSmartSectionSendInfo(smartSectionSendTemp));
        }
    );
};

export const fetchBrandsInfo = (firstTime = false, temp) => {
    const { brandsData, brandSendInfo } = store.getState();
    fetchWithParams(
        {
            url: `${BACKEND_URL}/admin/brands`,
            params: firstTime ? (temp ? temp : brandSendInfo) : brandSendInfo,
        },

        (data) => {
            let brandsDataTemp = { ...brandsData, isError: false };
            let brandSendTemp = { ...brandSendInfo };
            if (firstTime) {
                brandsDataTemp.data = [];
            }
            data.length && firstTime
                ? (brandsDataTemp.noData = false)
                : (brandsDataTemp.noData = true);
            !data.length || data.length < brandSendTemp.limit
                ? (brandsDataTemp.isEnd = true)
                : (brandsDataTemp.isEnd = false);

            brandSendTemp.offset = brandSendTemp.limit + brandSendTemp.offset;
            brandsDataTemp.data = [...brandsDataTemp.data, ...data];

            store.dispatch(setBrandsData(brandsDataTemp));
            store.dispatch(setBrandSendInfo(brandSendTemp));
        }
    );
};

export const fetchDevicesInfo = (firstTime = false, temp) => {
    const { devicesData, deviceSendInfo } = store.getState();

    fetchWithParams(
        {
            url: `${BACKEND_URL}/admin/devices`,
            params: firstTime
                ? temp
                    ? temp
                    : { ...deviceSendInfo, offset: 0 }
                : deviceSendInfo,
        },
        (data) => {
            data.forEach((device) => {
                device.createdAt = dateFormat(
                    device.createdAt,
                    'yyyy-mm-dd HH:MM'
                );
                device.updatedAt = dateFormat(
                    device.updatedAt,
                    'yyyy-mm-dd HH:MM'
                );
            });
            let devicesDataTemp = { ...devicesData, isError: false };
            let deviceSendTemp = { ...deviceSendInfo };

            data.length && firstTime
                ? (devicesDataTemp.noData = false)
                : (devicesDataTemp.noData = true);
            !data.length || data.length < deviceSendTemp.limit
                ? (devicesDataTemp.isEnd = true)
                : (devicesDataTemp.isEnd = false);

            if (firstTime) {
                deviceSendTemp.offset = deviceSendTemp.limit;
                devicesDataTemp.data = [...data];
            } else {
                deviceSendTemp.offset =
                    deviceSendTemp.limit + deviceSendTemp.offset;
                devicesDataTemp.data = [...devicesData.data, ...data];
            }
            store.dispatch(setDevicesData(devicesDataTemp));
            store.dispatch(setDeviceSendInfo(deviceSendTemp));
        }
    );
};

export const fetchQrDevicesInfo = (firstTime = false, temp) => {
    const { qrDevicesData, qrDeviceSendInfo } = store.getState();

    fetchWithParams(
        {
            url: `${BACKEND_URL}/admin/clients/qrDevice`,
            params: firstTime
                ? temp
                    ? temp
                    : { ...qrDeviceSendInfo, offset: 0 }
                : qrDeviceSendInfo,
        },
        (data) => {
            data.forEach((device) => {
                device.createdAt = dateFormat(
                    device.createdAt,
                    'yyyy-mm-dd HH:MM'
                );
                device.updatedAt = dateFormat(
                    device.updatedAt,
                    'yyyy-mm-dd HH:MM'
                );
            });
            let devicesDataTemp = { ...qrDevicesData, isError: false };
            let qrDeviceSendTemp = { ...qrDeviceSendInfo };

            data.length && firstTime
                ? (devicesDataTemp.noData = false)
                : (devicesDataTemp.noData = true);
            !data.length || data.length < qrDeviceSendTemp.limit
                ? (devicesDataTemp.isEnd = true)
                : (devicesDataTemp.isEnd = false);

            if (firstTime) {
                qrDeviceSendTemp.offset = qrDeviceSendTemp.limit;
                devicesDataTemp.data = [...data];
            } else {
                qrDeviceSendTemp.offset =
                    qrDeviceSendTemp.limit + qrDeviceSendTemp.offset;
                devicesDataTemp.data = [...qrDevicesData.data, ...data];
            }
            store.dispatch(setQrDevicesData(devicesDataTemp));
            store.dispatch(setQrDeviceSendInfo(qrDeviceSendTemp));
        }
    );
};
export const fetchDivisionsInfo = (firstTime) => {
    const { divisionSendInfo, divisionsData } = store.getState();
    fetchWithParams(
        {
            url: `${BACKEND_URL}/admin/divisions`,
            params: firstTime
                ? { ...divisionSendInfo, offset: 0 }
                : divisionSendInfo,
        },
        (data) => {
            let divisionsDataTemp = { ...divisionsData, isError: false };
            let divisionSendTemp = { ...divisionSendInfo };
            if (firstTime) {
                divisionsDataTemp.data = [];
                divisionSendTemp.offset = 0;
            }
            data.length && firstTime
                ? (divisionsDataTemp.noData = false)
                : (divisionsDataTemp.noData = true);
            !data.length || data.length < divisionSendTemp.limit
                ? (divisionsDataTemp.isEnd = true)
                : (divisionsDataTemp.isEnd = false);

            divisionSendTemp.offset =
                divisionSendTemp.limit + divisionSendTemp.offset;
            divisionsDataTemp.data = [...divisionsDataTemp.data, ...data];

            store.dispatch(setDivisionsData(divisionsDataTemp));
            store.dispatch(setDivisionSendInfo(divisionSendTemp));
        }
    );
};
/**
 *
 * @param {obj} fetchObj
 * @param {function} cb
 */
// /**
//  *
//  * @param {string} url
//  * @param {string} method
//  * @param {obj} headers
//  * @param {obj} body
//  * @param {function} cb
//  * @param {int} idd
//  */
export const fetchForAdminWithUpdateToast = (fetchObj, cb) => {
    const {
        url,
        method = 'POST',
        headers = {
            'Content-Type': 'application/json',
            Authorization: bearer,
        },
        notifyMessage,
        updateMessage,
        body = null,
        params = null,
    } = fetchObj;

    var idd = Math.floor(Math.random() * 100);
    notify(notifyMessage, idd);
    let sendParams = {
        url,
        method,
        headers,
        data: body,
        params,
    };
    if (!body) {
        delete sendParams.data;
    }
    axios({ ...sendParams })
        .then((response) => {
            let data = response.data;
            if (response?.status === 200) {
                updateSuccess(updateMessage, idd);
                cb(data);
            } else if (response?.status === 201) {
                updateSuccess(updateMessage, idd);
                cb(data);
            }
        })
        .catch((err) => {
            if (err.message === 'Network Error') {
                updateFailure('Serwerde Nasazlyk doredi', idd);
            } else {
                if (err.response?.status?.toString().startsWith(5)) {
                    updateFailure('Serwerde Nasazlyk doredi', idd);
                } else if (err?.response?.status.toString().startsWith(4)) {
                    if (err?.response?.status === 413) {
                        notificationWithUpdate(
                            `Faýl razmeri ${err?.response?.data?.size}${err?.response?.data?.sizeType} -dan uly bolmaly däl`,
                            idd
                        );
                    } else if (err?.response?.status === 400) {
                        if (err?.response?.data?.reviewingUser) {
                            notificationWithUpdate(
                                `${err?.response?.data?.reviewingUser} gözden geçirýär`
                            );
                        } else {
                            updateFailure(err?.response?.data?.message, idd);
                        }
                    } else if (err?.response?.status === 403) {
                        updateFailure('Yetkiniz yok', idd);
                    } else if (err?.response?.status === 401) {
                        newLocation('/');
                    } else {
                        notificationWithUpdate(
                            err?.response?.data?.message,
                            idd
                        );
                    }
                }
            }
        });
};
export const fetchForAdmin = (fetchObj, cb, setIsErrorr) => {
    const { url, method = 'POST', body = null, params = null } = fetchObj;
    axios({
        url,
        method,
        params,
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
        },
        data: body,
    })
        .then((response) => {
            let data = response.data;
            if (response.status === 200) {
                if (data === null) {
                    newLocation('/admin/notFoundRoute');
                } else {
                    cb(data);
                }
            }
        })
        .catch((err) => {
            setIsErrorr ? setIsErrorr(true) : store.dispatch(setIsError(true));
            if (err.message === 'Network Error') {
                notification('Serwerde Nasazlyk doredi');
            } else {
                if (err?.response?.status.toString().startsWith(4)) {
                    if (err?.response?.status === 413) {
                        notification(
                            `Faýl razmeri ${err?.response?.data?.size}${err?.response?.data?.sizeType} -dan uly bolmaly däl`
                        );
                    } else if (err?.response?.status === 400) {
                        if (err?.response?.data?.reviewingUser) {
                            notificationWithUpdate(
                                `${err?.response?.data?.reviewingUser} gözden geçirýär`
                            );
                        } else {
                            notification(err?.response?.data?.message);
                        }
                    } else if (err?.response?.status === 403) {
                        notification('Yetkiniz yok');
                    } else if (err?.response?.status === 401) {
                        newLocation('/');
                    } else {
                        notification(err?.response?.data?.message);
                    }
                } else {
                    console.log(err);
                }
            }
        });
};
export const fetchWithParams = (fetchObj, cb, setIsErrorr) => {
    const { url, params = null } = fetchObj;
    axios
        .get(url, {
            params,
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearer,
            },
        })
        .then((response) => {
            let data = response.data;
            if (response.status === 200) {
                if (data === null) {
                    newLocation('/admin/notFoundRoute');
                } else {
                    cb(data);
                }
            }
        })
        .catch((err) => {
            setIsErrorr ? setIsErrorr(true) : store.dispatch(setIsError(true));
            if (err.message === 'Network Error') {
                notification('Serwerde Nasazlyk doredi');
            } else {
                if (err?.response?.status.toString().startsWith(4)) {
                    if (err?.response?.status === 413) {
                        notification(
                            `Faýl razmeri ${err?.response?.data?.size}${err?.response?.data?.sizeType} -dan uly bolmaly däl`
                        );
                    } else if (err?.response?.status === 400) {
                        if (err?.response?.data?.reviewingUser) {
                            notificationWithUpdate(
                                `${err?.response?.data?.reviewingUser} gözden geçirýär`
                            );
                        } else {
                            notification(err?.response?.data?.message);
                        }
                    } else if (err?.response?.status === 403) {
                        notification('Yetkiniz yok');
                    } else if (err?.response?.status === 401) {
                        newLocation('/');
                    } else {
                        notification(err?.response?.data?.message);
                    }
                } else {
                    console.log(err);
                }
            }
        });
};
export const fetchWithoutParams = (fetchObj, cb, setIsErrorr) => {
    const { url, method = 'PUT' } = fetchObj;
    axios({
        url,
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
        },
    })
        .then((response) => {
            let data = response.data;
            if (response.status === 200) {
                if (data === null) {
                    newLocation('/admin/notFoundRoute');
                } else {
                    cb(data);
                }
            }
        })
        .catch((err) => {
            setIsErrorr ? setIsErrorr(true) : store.dispatch(setIsError(true));

            if (err.message === 'Network Error') {
                notification('Serwerde Nasazlyk doredi');
            } else {
                if (err?.response?.status.toString().startsWith(4)) {
                    if (err?.response?.status === 413) {
                        notification(
                            `Faýl razmeri ${err?.response?.data?.size}${err?.response?.data?.sizeType} -dan uly bolmaly däl`
                        );
                    } else if (err?.response?.status === 403) {
                        notification('Yetkiniz yok');
                    } else if (err?.response?.status === 400) {
                        if (err?.response?.data?.reviewingUser) {
                            notificationWithUpdate(
                                `${err?.response?.data?.reviewingUser} gözden geçirýär`
                            );
                        } else {
                            notification(err?.response?.data?.message);
                        }
                    } else if (err?.response?.status === 401) {
                        newLocation('/');
                    } else {
                        notification(err?.response?.data?.message);
                    }
                } else {
                    console.log(err);
                }
            }
        });
};
export const deleteForAdmin = (fetchObj, cb) => {
    const {
        url,
        method = 'DELETE',
        headers = {
            'Content-Type': 'application/json',
            Authorization: bearer,
        },
        notifyMessage,
        updateMessage,
    } = fetchObj;

    var idd = Math.floor(Math.random() * 100);
    notify(notifyMessage, idd);
    axios({ url, method, headers })
        .then((response) => {
            let data = response.data;
            if (response.status === 200) {
                updateSuccess(updateMessage, idd);
                cb(data);
            }
        })
        .catch((err) => {
            if (err.message === 'Network Error') {
                updateFailure('Serwerde Nasazlyk doredi', idd);
            } else {
                if (err.response?.status?.toString().startsWith(5)) {
                    updateFailure('Serwerde Nasazlyk doredi', idd);
                } else if (err?.response?.status === 403) {
                    updateFailure('Yetkiniz yok', idd);
                } else if (err?.response?.status === 400) {
                    if (err?.response?.data?.reviewingUser) {
                        notificationWithUpdate(
                            `${err?.response?.data?.reviewingUser} gözden geçirýär`
                        );
                    } else {
                        updateFailure(`${err?.response?.data?.message}`);
                    }
                } else if (err?.response?.status === 401) {
                    newLocation('/');
                } else if (err?.response?.status.toString().startsWith(4)) {
                    updateFailure(err?.response?.data?.message, idd);
                }
            }
        });
};

export const orderStatusTranslator = (status) => {
    switch (status) {
        case 'waitingForConfirmation':
            return {
                translation: 'Tassyklanmaga garaşylýar',
                color: '#60CEED',
            };
        case 'reviewing':
            return { translation: 'Gözden geçirilýär', color: '#a6ceff' };
        case 'picking':
            return { translation: 'Ýygnalýar', color: '#f7EA4A' };
        case 'completed':
            return { translation: 'Tamamlandy', color: '#9CF168' };
        case 'employeeCanceled':
            return {
                translation: 'Işgär goýbolsun etdi',
                color: '#f898c4',
            };
        case 'collected':
            return {
                translation: 'Ýygnaldy',
                color: '#4ae91f99',
            };
        case 'delivering':
            return {
                translation: 'Dostawka edilýär',
                color: '#a7e3d7',
            };
        case 'clientCanceled':
            return {
                translation: 'Müşderi goýbolsun etdi',
                color: '#FFA7A6',
            };
        default:
            return { translation: status, color: '' };
    }
};
export const orderHistoryStatusTranslator = (status) => {
    switch (status) {
        case 'orderFinished':
            return { translation: 'Sargyt tamamlandy', color: '#60CEED' };
        case 'employeeTransferred':
            return {
                translation: 'Başga işgäre geçirildi',
                color: '#e4c80a',
            };
        case 'operatorChanged':
            return {
                translation: 'Operator üýtgedildi',
                color: '#f5005794',
            };
        case 'pickerChanged':
            return {
                translation: 'Ýygnaýjy üýtgedildi',
                color: '#76c7be',
            };
        case 'delivererChanged':
            return {
                translation: 'Gowşuryjy üýtgedildi',
                color: '#a7e3d7',
            };

        case 'employeeCancelOrder':
            return {
                translation: 'Işgär goýbolsun etdi',
                color: '#f898c4',
            };
        case 'clientCancelOrder':
            return {
                translation: 'Müşderi goýbolsun etdi',
                color: '#cb5d00',
            };
        case 'tigerClientChanged':
            return {
                translation: 'Tiger müşderi çalşyldy',
                color: '#7326d354',
            };
        case 'divisionChanged':
            return { translation: 'Bölüm çalşyldy', color: '#4046ca' };
        case 'statusChanged':
            return { translation: 'Status çalşyldy', color: '#bce931' };
        case 'employeeReviewed':
            return {
                translation: 'Işgär gözden geçirdi',
                color: '#7e84fa',
            };
        case 'employeeOpenForReview':
            return {
                translation: 'Işgär gözden geçirýär',
                color: '#147af3',
            };
        case 'waitingForEmployee':
            return { translation: 'Işgäre garaşylýar', color: '#f68511' };
        case 'waitingForPicker':
            return { translation: 'Ýygnaýyja garaşylýar', color: '#e8c600' };
        case 'ordered':
            return { translation: 'Zakaz edildi', color: '#4ae91f99	' };
        case 'pickFinished':
            return { translation: 'Ýygnaldy', color: '#72e06a	' };
        default:
            return { translation: status, color: '' };
    }
};
export const commentTypeTranslator = (comment) => {
    switch (comment) {
        case 'financial':
            return {
                value: comment,
                translation: 'Parasal',
            };
        case 'delivering':
            return {
                value: comment,
                translation: 'Teslimat',
            };
        case 'private':
            return {
                value: comment,
                translation: 'Özel',
            };
        case 'return':
            return {
                value: comment,
                translation: 'Iade',
            };
        default:
            return {
                value: comment,
                translation: comment,
            };
    }
};

export const roleTranslator = (role) => {
    switch (role) {
        case 'admin':
            return 'admin';
        case 'seller':
            return 'satyjy';
        case 'deliverer':
            return 'gowşuryjy';
        case 'developer':
            return 'programmist';
        case 'ceo':
            return 'ceo';
        case 'warehouseman':
            return 'ammarçy';
        case 'designer':
            return 'dizaýner';
        case 'picker':
            return 'ýygnaýjy';
        default:
            return role;
    }
};

export const notify = (info, id) => {
    toast.info(info, {
        toastId: id,
        autoClose: false,
    });
};
export const notification = (info) => {
    toast.info(info, {
        autoClose: 2000,
    });
};
export const notificationWithUpdate = (info, id) => {
    toast.update(id, {
        render: info,
        type: toast.TYPE.INFO,
        autoClose: 2000,
    });
};
export const updateSuccess = (info, id) => {
    toast.update(id, {
        render: info,
        type: toast.TYPE.SUCCESS,
        autoClose: 2000,
    });
};
export const updateFailure = (info, id) => {
    toast.update(id, {
        render: info,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
    });
};

export const parettoTranslate = (paretto) => {
    if ((paretto = 'best')) {
        return 'Cok Satan';
    } else if ((paretto = 'least')) {
        return 'Az Satan';
    }
    return 'Orta Satan';
};
export function invertHex(hex = 'ffffff') {
    if (hex !== null) {
        return (
            '#' +
            (Number(`0x1${hex.toString().substr(1, 6)}`) ^ 0xffffff)
                .toString(16)
                .substr(1)
                .toUpperCase()
        );
    }
}

export const discountCalculator = (row) => {
    let fixedNumber = row.clientCourrency === 'USD' ? 4 : 2;
    let sumParameter = (row.employeeApprovedAmount * row.clientPrice).toFixed(
        fixedNumber
    );

    if (row.discountType === 'client') {
        return (
            Number(sumParameter) -
            (Number(sumParameter) * Number(row.clientDisocunt)) / 100
        ).toFixed(fixedNumber);
    } else {
        return (
            Number(sumParameter) -
            (Number(sumParameter) * Number(row.discount)) / 100
        ).toFixed(fixedNumber);
    }
};

export const bannerRow = (icon, name, value) => {
    return (
        <div className="one-row">
            <div className="left">
                {icon}
                <span>{name}</span>
            </div>
            <div className="right">
                <div>{value}</div>
            </div>
        </div>
    );
};
export const functionTranslator = (func) => {
    switch (func) {
        case 'items':
            return 'HARYTLAR';
        case 'mainGroups':
            return 'ESASY GRUPBALAR';
        case 'clients':
            return 'MÜŞDERILER';

        case 'lastGroups':
            return 'SOŇKY GRUPBALAR';

        case 'itemAlternatives':
            return 'HARYT ALTERNATIWLERI';

        case 'units':
            return 'BIRIMLER';

        case 'itemUnit':
            return 'HARYT BIRIMLERI';

        case 'brands':
            return 'BRENDLER';

        case 'warehouses':
            return 'DEPOLAR';

        case 'stocks':
            return 'STOKLAR';

        case 'prices':
            return 'BAHALAR';

        case 'discountExpenseCards':
            return 'ARZANLADYŞ KARTLARY';

        case 'serviceCards':
            return 'SERWIS KARTLARY';

        case 'currencies':
            return 'PUL BIRLIKLERI';
        case 'discountMasters':
            return 'MASTER ARZANLADYŞLAR';
        case 'discounts':
            return 'ARZANLADYŞLAR';
        case 'tigerEmployees':
            return 'TIGER IŞGÄRLERI';
        case 'clientCards':
            return 'MÜŞDERI KARTLARY';
        case 'barcodes':
            return 'BARKODLAR';
        case 'all':
            return 'ÄHLISI';
        case 'clientCardsTruncate':
            return 'MÜŞDERI KARTLARYNY POZUP TÄZEDEN SINHRONLAMAK';

        default:
            return func;
    }
};

export const deliveryTypeTranslator = (type) => {
    switch (type) {
        case 'normalDelivery':
            return 'Adaty';
        case 'express':
            return 'Ekspres';
        case 'fromStore':
            return 'Özi gelip alýar';
    }
};
export const infoChangeAuthorizations = {
    admin: ['status', 'client', 'picker', 'operator', 'deliverer', 'division'],
    moderator: [],
    seller: [],
    operator: [
        'status',
        'client',
        'picker',
        'operator',
        'deliverer',
        'division',
    ],
    deliverer: ['status'],
    picker: ['status'],
    developer: [
        'status',
        'client',
        'picker',
        'operator',
        'deliverer',
        'division',
    ],
    ceo: [],
    designer: [],
};

export const activeCell = (row) => {
    if (row.hasOwnProperty('active')) {
        return (
            <div
                className="active-box"
                style={{
                    backgroundColor: `${
                        row.active
                            ? 'rgba(0, 135, 107, 0.5)'
                            : 'rgba(255, 0, 26, 0.5)'
                    }`,
                }}
            >
                <span>{row.active ? 'Aktiw' : 'Passiw'}</span>
            </div>
        );
    }
    return '';
};
