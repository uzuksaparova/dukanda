import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import ClientSort from '../sort/clientSort/ClientSort';
import ProductsFilter from '../filter/productFilter/ProductsFilter';
import ClientFilter from '../filter/clientFilter/ClientFilter';
import GroupsFilter from '../filter/groupFilter/GroupsFilter';
import EmployeeFilter from '../filter/employeeFilter/EmployeeFilter';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import { VscGroupByRefType } from 'react-icons/vsc';
import './sidebar.scss';
import { BsFillInboxesFill } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
import { FaLayerGroup, FaUsers, FaBuilding, FaHistory } from 'react-icons/fa';
import { RiRulerLine, Ri24HoursFill } from 'react-icons/ri';
import {
    AiFillTags,
    AiOutlineQrcode,
    AiOutlineSchedule,
    AiOutlineSync,
} from 'react-icons/ai';
import { AiOutlineGroup } from 'react-icons/ai';
import EmployeeSort from '../sort/employeeSort/EmployeeSort';
import * as authorizationn from '../authorization.json';
import {
    setSidebarSearchValue,
    setIsSidebarOpen,
} from '../../redux/actions/sidebarActions';
import { connect } from 'react-redux';
import { setUnitsData, setUnitSendInfo } from '../../redux/actions/unitActions';
import {
    setProductsData,
    setProductSendInfo,
} from '../../redux/actions/productActions';

import {
    setGroupsData,
    setGroupSendInfo,
} from '../../redux/actions/groupActions';
import {
    setEmployeesData,
    setEmployeeSendInfo,
    setRoles,
    setRolesSend,
} from '../../redux/actions/employeeActions';
import {
    setBrandsData,
    setBrandSendInfo,
} from '../../redux/actions/brandActions';
import {
    setClientsData,
    setClientSendInfo,
} from '../../redux/actions/clientActions';

import {
    BACKEND_URL,
    fetchForAdmin,
    fetchUnitsInfo,
    fetchProductsInfo,
    fetchFunction,
    fetchGroupsInfo,
    fetchEmployeesInfo,
    fetchBrandsInfo,
    fetchClientsInfo,
    handleGroupResetButton,
    handleProductResetButton,
    fetchQrDevicesInfo,
} from '../../functions';

import version from '../../version.js';
import InstallButton from '../installButton/InstallButton';
import SearchComponent from '../searchComponent/SearchComponent';
import ToolbarMobile from './toolbarMobile/ToolbarMobile';
import ToolbarDesktop from './toolbarDesktop/ToolbarDesktop';
import { useMediaQuery } from 'react-responsive';
import {
    setQrDevicesData,
    setQrDeviceSendInfo,
} from '../../redux/actions/qrDeviceActions';

const authorization = authorizationn.default;
//bunch of gibberish styles  mui
const drawerWidth = 275;

function Sidebar(props) {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: isMobileScreen ? '100%' : 'calc(100% - 275px)',
            marginLeft: isMobileScreen ? 0 : drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            color: 'grey',
            fontSize: '1.1em',
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
            position: 'sticky',
            top: 0,
            left: 0,
            backgroundColor: '#fff',
            zIndex: 222,
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            minHeight: 'unset !important',
            height: '50px',
        },
        drawerFooter: {
            color: 'grey',
            fontSize: '1.1em',
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'space-between',
            position: 'fixed',
            bottom: 0,
            left: 0,
            backgroundColor: '#fff',
            zIndex: 222,
            borderTop: '1px solid rgba(0, 0, 0, 0.12) !important',
            minHeight: 'unset !important',
            height: '40px',
            width: '274px',
            padding: '0 12px',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
        content: {
            flexGrow: 1,
            // padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }));
    const classes = useStyles();
    const theme = useTheme();
    let useelocation = useLocation();

    const [groupsCollapseOpen, setGroupsCollapseOpen] = useState(false);
    const [clientsCollapseOpen, setClientsCollapseOpen] = useState(false);

    const [syncCollapseOpen, setSyncCollapseOpen] = useState(false);

    const {
        setSidebarSearchValue,
        sidebarSearchValue,
        setIsSidebarOpen,
        isSidebarOpen,
        decodedToken,
        setUnitsData,
        unitsData,
        unitSendInfo,
        setUnitSendInfo,
        productSendInfo,
        setRolesSend,
        setRoles,
        setProductsData,
        setProductSendInfo,
        setGroupsData,
        groups,
        groupSendInfo,
        setGroupSendInfo,
        setEmployeesData,
        employeeSendInfo,
        setEmployeeSendInfo,
        brandSendInfo,
        setBrandsData,
        setBrandSendInfo,
        setClientsData,
        clientSendInfo,
        setClientSendInfo,
        productsData,
        groupsData,
        employeesData,
        brandsData,
        qrDevicesData,
        qrDeviceSendInfo,
        setQrDevicesData,
        setQrDeviceSendInfo,
        clientsData,
    } = props;

    //handles searchbar typing changes
    const onSidebarSearchChange = (e) => {
        setSidebarSearchValue(e.target.value);
    };
    useEffect(() => {
        setSidebarSearchValue('');
    }, [useelocation]);
    const loci = (locii) => {
        return useelocation.pathname.includes(locii);
    };
    const locNum = () => {
        var pathname = window.location.pathname;
        var splitting = pathname.split('/');
        splitting.splice(0, 1);
        var pathNameArray = splitting;
        if (!isNaN(pathNameArray[pathNameArray.length - 1] * 1)) {
            return false;
        }
        return true;
    };
    const locQrDevice = () => {
        var pathname = window.location.pathname;
        var splitting = pathname.split('/');
        splitting.splice(0, 1);
        var pathNameArray = splitting;
        if (pathNameArray[pathNameArray.length - 2] === 'qrDevices') {
            return false;
        }
        return true;
    };
    // triggers search fetches search results
    const onSearchIconClick = async () => {
        if (loci('products')) {
            setProductsData({ ...productsData, data: [] });
            var menuSend = productSendInfo;
            menuSend.search = sidebarSearchValue;
            menuSend.offset = 0;
            setProductSendInfo(menuSend);
            fetchProductsInfo(true);
        } else if (loci('brands')) {
            setBrandsData({ ...brandsData, data: [] });
            menuSend = brandSendInfo;
            menuSend.search = sidebarSearchValue;
            menuSend.offset = 0;
            setBrandSendInfo(menuSend);
            fetchBrandsInfo(true, menuSend);
        } else if (loci('groups')) {
            setGroupsData({ ...groupsData, data: [] });
            menuSend = groupSendInfo;
            menuSend.search = sidebarSearchValue;
            menuSend.offset = 0;
            setGroupSendInfo(menuSend);
            fetchGroupsInfo(
                true,
                `/admin/${loci('mainGroups') ? 'mainGroups' : 'lastGroups'}`,
                menuSend
            );
        } else if (loci('employees')) {
            setEmployeesData({ ...employeesData, data: [] });
            menuSend = employeeSendInfo;
            menuSend.search = sidebarSearchValue;
            menuSend.offset = 0;

            setEmployeeSendInfo(menuSend);
            fetchEmployeesInfo(true, menuSend);
        } else if (loci('units')) {
            setUnitsData({ ...unitsData, data: [] });
            menuSend = unitSendInfo;
            menuSend.search = sidebarSearchValue;
            menuSend.offset = 0;

            setUnitSendInfo(menuSend);
            fetchUnitsInfo(true, menuSend);
        } else if (loci('clients')) {
            setClientsData({ ...clientsData, data: [] });
            menuSend = clientSendInfo;
            menuSend.search = sidebarSearchValue;
            menuSend.offset = 0;

            setClientSendInfo(menuSend);
            fetchClientsInfo(true, menuSend);
        } else if (loci('qrDevices')) {
            setQrDevicesData({ ...qrDevicesData, data: [] });
            menuSend = qrDeviceSendInfo;
            menuSend.search = sidebarSearchValue;
            menuSend.offset = 0;
            setQrDeviceSendInfo(menuSend);
            fetchQrDevicesInfo(true, menuSend);
        }
    };

    useEffect(() => {
        if (
            !groups.length &&
            (loci('products') || loci('subgroups') || loci('adminPage'))
        ) {
            fetchFunction(
                loci('products')
                    ? 'products'
                    : loci('subgroups')
                    ? 'subgroups'
                    : 'adminPage'
            );
        }
        if (loci('employees') || loci('employee'))
            fetchForAdmin(
                {
                    url: `${BACKEND_URL}/admin/employees/roles`,
                    method: 'GET',
                },
                (data) => {
                    setRoles([...data]);
                    var temp = {};
                    data.forEach((role) => {
                        temp[role] = true;
                    });
                    setRolesSend({ ...temp });
                }
            );

        // eslint-disable-next-line
    }, [useelocation]);

    const showSearchBar = () => {
        return (
            !loci('divisions') &&
            !loci('sschedules') &&
            !loci('smanual') &&
            !loci('shistories') &&
            !loci('adminPage') &&
            locNum() &&
            locQrDevice()
        );
    };
    const sidebarSearchComponent = () => {
        if (showSearchBar()) {
            return (
                <SearchComponent
                    searchValue={sidebarSearchValue}
                    handleInputChange={onSidebarSearchChange}
                    onSearchIconClick={onSearchIconClick}
                    filter={
                        !loci('brands') && !loci('units') && !loci('qrDevices')
                    }
                    sort={
                        loci('employees') ||
                        loci('sschedules') ||
                        loci('clients')
                    }
                    sortComponent={
                        loci('employees') ? <EmployeeSort /> : <ClientSort />
                    }
                    filterComponent={
                        loci('mainGroups') || loci('subgroups') ? (
                            <GroupsFilter />
                        ) : loci('employees') ? (
                            <EmployeeFilter />
                        ) : loci('clients') ? (
                            <ClientFilter />
                        ) : (
                            <ProductsFilter />
                        )
                    }
                />
            );
        }
        return null;
    };
    const sidebarMenu = () => {
        return (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setIsSidebarOpen(true)}
                edge="start"
                className={clsx(
                    classes.menuButton,
                    isSidebarOpen && classes.hide
                )}
            >
                <MenuIcon />
            </IconButton>
        );
    };

    return (
        <div className="sidebar">
            <CssBaseline />
            <AppBar
                title="products"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isSidebarOpen,
                })}
            >
                {isMobileScreen ? (
                    <ToolbarMobile
                        showSearchBar={showSearchBar}
                        sidebarSearchComponent={sidebarSearchComponent}
                        sidebarMenu={sidebarMenu}
                    />
                ) : (
                    <ToolbarDesktop
                        showSearchBar={showSearchBar}
                        sidebarSearchComponent={sidebarSearchComponent}
                        sidebarMenu={sidebarMenu}
                    />
                )}
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={isSidebarOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <span>Dükanda</span>
                    <IconButton onClick={() => setIsSidebarOpen(false)}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <List>
                    {/* products */}
                    {authorization[decodedToken.role].includes('products') ? (
                        <ListItem
                            onClick={() => handleProductResetButton(false)}
                            component={Link}
                            to="/products"
                            button
                            key={'Harytlar'}
                        >
                            <ListItemIcon>
                                <BsFillInboxesFill className="sidebar-icon" />
                            </ListItemIcon>
                            <ListItemText primary={'Harytlar'} />
                        </ListItem>
                    ) : null}

                    {/* gruplar */}
                    {authorization[decodedToken.role].includes('groups') ? (
                        <>
                            <ListItem
                                button
                                onClick={() =>
                                    setGroupsCollapseOpen(!groupsCollapseOpen)
                                }
                                className={classes.menuItem}
                            >
                                <ListItemIcon className="sidebar-icon">
                                    <VscGroupByRefType />
                                </ListItemIcon>
                                <ListItemText primary="Grupbalar" />
                                {groupsCollapseOpen ? (
                                    <IconExpandLess />
                                ) : (
                                    <IconExpandMore />
                                )}
                            </ListItem>
                            <Collapse
                                in={groupsCollapseOpen}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List
                                    component="div"
                                    disablePadding
                                    className="inside-list"
                                >
                                    <ListItem
                                        onClick={() => {
                                            handleGroupResetButton(
                                                '/admin/mainGroups'
                                            );
                                        }}
                                        component={Link}
                                        to="/groups/mainGroups"
                                        button
                                        key={'Esasy Grupbalar'}
                                    >
                                        <ListItemIcon>
                                            <FaLayerGroup className="sidebar-icon" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={'Esasy Grupbalar'}
                                        />
                                    </ListItem>
                                    <ListItem
                                        onClick={() =>
                                            handleGroupResetButton(
                                                '/admin/lastGroups'
                                            )
                                        }
                                        component={Link}
                                        to="/groups/subgroups"
                                        button
                                        key={'Alt Grupbalar'}
                                    >
                                        <ListItemIcon>
                                            <AiOutlineGroup className="sidebar-icon" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={'Alt Grupbalar'}
                                        />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </>
                    ) : null}
                    {/* employees */}
                    {authorization[decodedToken.role].includes('employees') ? (
                        <ListItem
                            component={Link}
                            to="/employees"
                            button
                            key={'Employees'}
                        >
                            <ListItemIcon>
                                <FaUsers className="sidebar-icon" />
                            </ListItemIcon>
                            <ListItemText primary={'Işgärler'} />
                        </ListItem>
                    ) : null}
                    {/* clients */}
                    {authorization[decodedToken.role].includes('clients') ? (
                        <>
                            <ListItem
                                button
                                onClick={() =>
                                    setClientsCollapseOpen(!clientsCollapseOpen)
                                }
                                className={classes.menuItem}
                            >
                                <ListItemIcon className="sidebar-icon">
                                    <IoIosPeople />
                                </ListItemIcon>
                                <ListItemText primary="Müşderi Maglumaty" />
                                {clientsCollapseOpen ? (
                                    <IconExpandLess />
                                ) : (
                                    <IconExpandMore />
                                )}
                            </ListItem>
                            <Collapse
                                in={clientsCollapseOpen}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List
                                    component="div"
                                    disablePadding
                                    className="inside-list"
                                >
                                    <ListItem
                                        component={Link}
                                        to="/clients"
                                        button
                                        key={'Müşderiler'}
                                    >
                                        <ListItemIcon>
                                            <IoIosPeople className="sidebar-icon" />
                                        </ListItemIcon>
                                        <ListItemText primary={'Müşderiler'} />
                                    </ListItem>

                                    <ListItem
                                        component={Link}
                                        to="/qrDevices"
                                        button
                                        key={'QR Enjamlar'}
                                    >
                                        <ListItemIcon>
                                            <AiOutlineQrcode className="sidebar-icon" />
                                        </ListItemIcon>
                                        <ListItemText primary={'QR Enjamlar'} />
                                    </ListItem>
                                </List>
                            </Collapse>{' '}
                        </>
                    ) : null}
                    {/* divisions */}
                    {authorization[decodedToken.role].includes('divisions') ? (
                        <ListItem
                            component={Link}
                            to="/divisions"
                            button
                            key={'Bölümler'}
                        >
                            <ListItemIcon>
                                <FaBuilding className="sidebar-icon" />
                            </ListItemIcon>
                            <ListItemText primary={'Bölümler'} />
                        </ListItem>
                    ) : null}
                    {/* brands */}
                    {authorization[decodedToken.role].includes('brands') ? (
                        <ListItem
                            component={Link}
                            to="/brands"
                            button
                            key={'Brendler'}
                        >
                            <ListItemIcon>
                                <AiFillTags className="sidebar-icon" />
                            </ListItemIcon>
                            <ListItemText primary={'Brendler'} />
                        </ListItem>
                    ) : null}
                    {/* units */}
                    {authorization[decodedToken.role].includes('units') ? (
                        <ListItem
                            component={Link}
                            to="/units"
                            button
                            key={'Birimler'}
                        >
                            <ListItemIcon>
                                <RiRulerLine className="sidebar-icon" />
                            </ListItemIcon>
                            <ListItemText primary={'Birimler'} />
                        </ListItem>
                    ) : null}
                    {/* syncs */}
                    {authorization[decodedToken.role].includes('syncs') ? (
                        <>
                            <ListItem
                                button
                                onClick={() =>
                                    setSyncCollapseOpen(!syncCollapseOpen)
                                }
                                className={classes.menuItem}
                            >
                                <ListItemIcon className="sidebar-icon">
                                    <AiOutlineSync />
                                </ListItemIcon>
                                <ListItemText primary="Sinhronlar" />
                                {syncCollapseOpen ? (
                                    <IconExpandLess />
                                ) : (
                                    <IconExpandMore />
                                )}
                            </ListItem>
                            <Collapse
                                in={syncCollapseOpen}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List
                                    component="div"
                                    disablePadding
                                    className="inside-list"
                                >
                                    <ListItem
                                        component={Link}
                                        to="/syncs/smanual"
                                        button
                                        key={'Manuel Sinhronlar '}
                                    >
                                        <ListItemIcon>
                                            <Ri24HoursFill className="sidebar-icon" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={'Manuel Sinhronlar'}
                                        />
                                    </ListItem>
                                    <ListItem
                                        component={Link}
                                        to="/syncs/sschedules"
                                        button
                                        key={'Tertip Sinhronlar'}
                                    >
                                        <ListItemIcon>
                                            <AiOutlineSchedule className="sidebar-icon" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={'Tertip Sinhronlar'}
                                        />
                                    </ListItem>
                                    <ListItem
                                        component={Link}
                                        to="/syncs/shistories"
                                        button
                                        key={'Taryh'}
                                    >
                                        <ListItemIcon>
                                            <FaHistory className="sidebar-icon" />
                                        </ListItemIcon>
                                        <ListItemText primary={'Taryh'} />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </>
                    ) : null}
                </List>
                <div className={classes.drawerFooter}>
                    <InstallButton />
                    <span>{version}</span>
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: isSidebarOpen,
                })}
            >
                <div className={classes.drawerHeader} />
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        sidebarSearchValue: state.sidebarSearchValue.sidebarSearchValue,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        decodedToken: state.decodedToken.decodedToken,
        unitsData: state.unitsData,
        productsData: state.productsData,
        groupSendInfo: state.groupSendInfo,
        employeeSendInfo: state.employeeSendInfo,
        productSendInfo: state.productSendInfo,
        brandSendInfo: state.brandSendInfo,
        clientSendInfo: state.clientSendInfo,
        unitSendInfo: state.unitSendInfo,
        groups: state.groups,
        qrDevicesData: state.qrDevicesData,
        qrDeviceSendInfo: state.qrDeviceSendInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsSidebarOpen: (open) => dispatch(setIsSidebarOpen(open)),
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
        setUnitSendInfo: (info) => dispatch(setUnitSendInfo(info)),
        setProductSendInfo: (info) => dispatch(setProductSendInfo(info)),
        setGroupSendInfo: (info) => dispatch(setGroupSendInfo(info)),
        setEmployeeSendInfo: (info) => dispatch(setEmployeeSendInfo(info)),
        setBrandSendInfo: (info) => dispatch(setBrandSendInfo(info)),
        setClientSendInfo: (info) => dispatch(setClientSendInfo(info)),
        setProductSendInfo: (info) => dispatch(setProductSendInfo(info)),
        setProductsData: (info) => dispatch(setProductsData(info)),
        setGroupsData: (info) => dispatch(setGroupsData(info)),
        setEmployeesData: (info) => dispatch(setEmployeesData(info)),
        setBrandsData: (info) => dispatch(setBrandsData(info)),
        setClientsData: (info) => dispatch(setClientsData(info)),
        setRoles: (info) => dispatch(setRoles(info)),
        setRolesSend: (info) => dispatch(setRolesSend(info)),
        setQrDevicesData: (info) => dispatch(setQrDevicesData(info)),
        setUnitsData: (info) => dispatch(setUnitsData(info)),
        setQrDeviceSendInfo: (info) => dispatch(setQrDeviceSendInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
