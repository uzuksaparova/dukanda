import React, { useEffect, useState } from 'react';
import './divisionItem.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DivisionClientModal from './divisionClientModal/DivisionClientModal';
import {
    BACKEND_URL,
    fetchForAdmin,
    fetchDivisionsInfo,
} from '../../functions';
import {
    setDivisionData,
    setDivisionItemSendInfo,
    setWarehouseChip,
} from '../../redux/actions/divisionActions';
import { connect } from 'react-redux';
import DeliveryCostModal from './deliveryCostModal/DeliveryCostModal';
import DivisionTab1 from './tabs/DivisionTab1';
import DivisionTab2 from './tabs/DivisionTab2';
import DivisionTab3 from './tabs/divisionTab3/DivisionTab3';
import DivisionTop from './divisionTop/DivisionTop';
import DeliveryTimelineModal from './deliveryTimelineModal/DeliveryTimelineModal';

function DivisionItem(props) {
    const { id } = useParams();
    const {
        divisionData,
        setDivisionData,
        divisionsData,
        isSidebarOpen,
        setDivisionItemSendInfo,
        setWarehouseChip,
    } = props;

    const { data } = divisionsData;
    let weekDay = new Date().getDay();

    //discountExpenseCards/expenses
    const [discountExpenseCards, setDiscountExpenseCards] = useState([]);

    //admin/currencies
    const [currenciesList, setCurrenciesList] = useState([]);
    //admin/deliveryCost
    const [deliveryCost, setDeliveryCost] = useState([]);
    const [clientChip, setClientChip] = useState('');

    const [warehouseSend, setWarehouseSend] = useState([]);
    const [divisionTypes, setDivisionTypes] = useState([]);
    const [discountCards, setDiscountCards] = useState([]);
    const [isDeliveryTimelineModalOpen, setIsDeliveryTimelineModalOpen] =
        useState(false);
    const [deliveryTimelineSendInfo, setDeliveryTimelineSendInfo] = useState({
        divisionId: id,
        weekDay: '',
        timeLines: [
            {
                startTime: '',
                endTime: '',
                active: true,
                disableTime: '',
            },
        ],
    });

    const [divisionImage, setDivisionImage] = useState('');
    const [divisionWarehouses, setDivisionWarehouses] = useState([]);

    const [dayTimelines, setDayTimelines] = useState([]);

    const [isDeliveryCostModalOpen, setIsDeliveryCostModalOpen] =
        useState(false);
    const [divisionTabValue, setDivisionTabValue] = useState(0);

    const [timeLines, setTimelines] = useState({});
    const [weekDayTabValue, setWeekDayTabValue] = useState(Number(weekDay));

    function TabContainer(props) {
        return <Typography component="div">{props.children}</Typography>;
    }

    const handleDivisionTabChange = (event, value) => {
        setDivisionTabValue(value);
    };
    const fetchDivisionId = (iddd = id) => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/divisions/${iddd}`,
                method: 'GET',
            },
            (data) => {
                setDivisionData({ ...data });
                setDivisionImage({ local: false, image: data.image, send: '' });
                setClientChip(data?.client?.name);
                setDivisionItemSendInfo({
                    ...data,
                    longitude: '156.35',
                    latitude: '841.564',
                });
            }
        );
    };
    const fetchDeliveryTimelines = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/delivery/timeLines`,
                method: 'GET',
                params: { divisionId: id },
            },
            (data) => {
                setTimelines(data);
                let arr0 = [];
                let arr1 = [];
                let arr2 = [];
                let arr3 = [];
                let arr4 = [];
                let arr5 = [];
                let arr6 = [];
                data.forEach((tl) => {
                    if (tl.weekDay === 0) {
                        arr0.push(tl);
                    } else if (tl.weekDay === 1) {
                        arr1.push(tl);
                    } else if (tl.weekDay === 2) {
                        arr2.push(tl);
                    } else if (tl.weekDay === 3) {
                        arr3.push(tl);
                    } else if (tl.weekDay === 4) {
                        arr4.push(tl);
                    } else if (tl.weekDay === 5) {
                        arr5.push(tl);
                    } else {
                        arr6.push(tl);
                    }
                });
                let tempObj = [
                    { weekDay: 0, timeLines: arr0 },
                    { weekDay: 1, timeLines: arr1 },
                    { weekDay: 2, timeLines: arr2 },
                    { weekDay: 3, timeLines: arr3 },
                    { weekDay: 4, timeLines: arr4 },
                    { weekDay: 5, timeLines: arr5 },
                    { weekDay: 6, timeLines: arr6 },
                ];
                setDayTimelines([...tempObj]);
            }
        );
    };

    useEffect(() => {
        setDivisionData({});
        id && id !== '0' && fetchDivisionId();
        !data.length && fetchDivisionsInfo(true);

        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/currencies`,
                method: 'GET',
                params: { activelyUsed: true },
            },
            (data) => {
                setCurrenciesList(data);
            }
        );

        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/discountExpenceCards/expences`,
                method: 'GET',
            },
            (data) => {
                setDiscountExpenseCards(data);
            }
        );
        if (id !== '0' || id !== 0) {
            fetchForAdmin(
                {
                    url: `${BACKEND_URL}/admin/delivery`,
                    method: 'GET',
                    params: { divisionId: id },
                },
                (data) => {
                    setDeliveryCost(data);
                }
            );
        }
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/divisions/types`,
                method: 'GET',
            },
            (data) => {
                setDivisionTypes(data);
            }
        );
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/discountExpenceCards/discounts`,
                method: 'GET',
            },
            (data) => {
                setDiscountCards(data);
            }
        );
        fetchDeliveryTimelines();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (Object.keys(divisionData)) {
            fetchWarehouse();
        } else {
            fetchWarehouseNewDivision();
        }
    }, [divisionData]);

    const fetchWarehouse = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/warehouses`,
                method: 'GET',
            },
            (data) => {
                var warehouses = [];
                var wareChip = [];
                data.forEach((wh) => {
                    let obj = {};
                    obj[wh.nr] = false;
                    warehouses.push(obj);
                });
                if (divisionData.warehouses?.length) {
                    warehouses.forEach((wh, i) => {
                        divisionData.warehouses.forEach((dwh, j) => {
                            if (Number(Object.keys(wh)[0]) === Number(dwh.nr)) {
                                let chipObj = {
                                    name: data[i]?.name,
                                    nr: data[i]?.nr,
                                    isComplect: dwh?.isComplect || false,
                                };
                                wareChip.push(chipObj);
                                wh[Object.keys(wh)[0]] = true;
                            }
                        });
                    });
                }
                setWarehouseSend(warehouses);
                setDivisionWarehouses(data);
                setWarehouseChip(wareChip);
            }
        );
    };
    const fetchWarehouseNewDivision = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/warehouses`,
                method: 'GET',
            },
            (data) => {
                var warehouses = [];
                var wareChip = [];
                data.forEach((wh) => {
                    let obj = {};
                    obj[wh.nr] = false;
                    warehouses.push(obj);
                });

                setWarehouseSend(warehouses);
                setDivisionWarehouses(data);
                setWarehouseChip(wareChip);
            }
        );
    };

    return (
        <div className={`division-item ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <DivisionTop
                divisionImage={divisionImage}
                setDivisionImage={setDivisionImage}
                warehouseSend={warehouseSend}
                fetchDivisionId={fetchDivisionId}
                fetchWarehouse={fetchWarehouse}
                setDeliveryCost={setDeliveryCost}
            />
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={divisionTabValue}
                        onChange={handleDivisionTabChange}
                        scrollButtons="auto"
                        textColor="secondary"
                        variant="scrollable"
                    >
                        <Tab label={<span>Salgy</span>} />
                        <Tab label={<span>Aragatnaşyk</span>} />
                        <Tab label={<span>Entegrasyon</span>} />
                    </Tabs>
                </AppBar>

                <div className="division-body">
                    {divisionTabValue === 0 && (
                        <TabContainer>
                            <DivisionTab1 />
                        </TabContainer>
                    )}
                    {divisionTabValue === 1 && (
                        <TabContainer>
                            <DivisionTab2 />
                        </TabContainer>
                    )}
                    {divisionTabValue === 2 && (
                        <TabContainer>
                            <DivisionTab3
                                warehouseSend={warehouseSend}
                                setWarehouseSend={setWarehouseSend}
                                divisionWarehouses={divisionWarehouses}
                                divisionTypes={divisionTypes}
                                discountCards={discountCards}
                                clientChip={clientChip}
                                discountExpenseCards={discountExpenseCards}
                            />
                        </TabContainer>
                    )}
                </div>
            </div>
            <DivisionClientModal setClientChip={setClientChip} />

            <DeliveryCostModal
                currenciesList={currenciesList}
                isDeliveryCostModalOpen={isDeliveryCostModalOpen}
                setIsDeliveryCostModalOpen={setIsDeliveryCostModalOpen}
                deliveryCost={deliveryCost}
                setDeliveryCost={setDeliveryCost}
            />
            <DeliveryTimelineModal
                isDeliveryTimelineModalOpen={isDeliveryTimelineModalOpen}
                setIsDeliveryTimelineModalOpen={setIsDeliveryTimelineModalOpen}
                deliveryTimelineSendInfo={deliveryTimelineSendInfo}
                setDeliveryTimelineSendInfo={setDeliveryTimelineSendInfo}
                dayTimelines={dayTimelines}
                setDayTimelines={setDayTimelines}
                fetchDeliveryTimelines={fetchDeliveryTimelines}
            />

            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        divisionData: state.divisionData.divisionData,
        divisionsData: state.divisionsData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDivisionData: (data) => dispatch(setDivisionData(data)),
        setDivisionItemSendInfo: (item) =>
            dispatch(setDivisionItemSendInfo(item)),
        setWarehouseChip: (item) => dispatch(setWarehouseChip(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DivisionItem);
