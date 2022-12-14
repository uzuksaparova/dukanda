import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Typography } from '@material-ui/core';
import {
    AiFillTags,
    AiOutlineGroup,
    AiOutlineQrcode,
    AiOutlineRight,
    AiOutlineSchedule,
    AiOutlineUngroup,
} from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    FaBalanceScaleLeft,
    FaBoxOpen,
    FaBuilding,
    FaHistory,
    FaLayerGroup,
    FaUsers,
} from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { BsFillInboxesFill } from 'react-icons/bs';
import { Ri24HoursFill, RiRulerLine } from 'react-icons/ri';
import './breadcrumb.scss';
import { MdOutlineQrCode } from 'react-icons/md';

function Breadcrumb(props) {
    const {
        productData,
        divisionData,
        brandData,
        unitData,
        syncScheduleData,
        clientData,
        qrDeviceData,
        employeeData,
        groupData,
        sidebarSearchValue,
        qrDeviceSendInfo,
    } = props;
    const [sidebarLocation, setSidebarLocation] = useState('');
    let useeLocation = useLocation();

    const nameShortener = (name) => {
        if (name) {
            return name.split(' ')[0];
        }
        return '';
    };

    useEffect(() => {
        var pathname = window.location.pathname;
        var splitting = pathname.split('/');
        splitting.splice(0, 1);
        var pathNameArray = splitting;
        if (!isNaN(pathNameArray[pathNameArray.length - 1] * 1)) {
            switch (pathNameArray[pathNameArray.length - 2]) {
                case 'products':
                    pathNameArray[pathNameArray.length - 1] = 'card';
                    break;
                case 'employees':
                    pathNameArray[pathNameArray.length - 1] = 'employee';
                    break;
                case 'clients':
                    pathNameArray[pathNameArray.length - 1] = 'client';
                    break;

                case 'qrDevices':
                    pathNameArray[pathNameArray.length - 1] = 'qrDevice';
                    break;
                case 'brands':
                    pathNameArray[pathNameArray.length - 1] = 'brand';
                    break;
                case 'divisions':
                    pathNameArray[pathNameArray.length - 1] = 'division';
                    break;
                case 'units':
                    pathNameArray[pathNameArray.length - 1] = 'unit';
                    break;
                case 'mainGroups':
                    pathNameArray[pathNameArray.length - 1] = 'groupm';
                    break;
                case 'subgroups':
                    pathNameArray[pathNameArray.length - 1] = 'groupss';
                    break;

                case 'sschedules':
                    pathNameArray[pathNameArray.length - 1] = 'schedule';
                    break;

                case 'histories':
                    pathNameArray[pathNameArray.length - 1] = 'history';
                    break;

                case 'history':
                    pathNameArray[pathNameArray.length - 1] = 'orderHistory';
                    break;
                default:
                    pathNameArray[pathNameArray.length - 1] =
                        pathNameArray[pathNameArray.length - 1];
                    break;
            }
        } else {
            if (
                pathNameArray[0] === 'qrDevices' &&
                pathNameArray.length === 2
            ) {
                pathNameArray[pathNameArray.length - 1] = 'qrDevice';
            } else if (
                pathNameArray[0] === 'qrDevices' &&
                qrDeviceSendInfo.search
            ) {
                pathNameArray.push(qrDeviceSendInfo.search);
            } else {
                pathNameArray[pathNameArray.length - 1] =
                    pathNameArray[pathNameArray.length - 1];
            }
        }
        var tempPath = [];
        pathNameArray.forEach((path, i) => {
            switch (path) {
                case 'histories':
                    tempPath.push({
                        icon: <FaHistory />,
                        value: 'Taryhy',
                        path: '',
                    });
                    break;
                case 'employees':
                    tempPath.push({
                        icon: <FaUsers />,
                        value: 'Ulanyjylar',
                        path: '/employees',
                    });
                    break;
                case 'clients':
                    tempPath.push({
                        icon: <IoIosPeople />,
                        value: 'M????deriler',
                        path: '/clients',
                    });
                    break;

                case 'qrDevices':
                    tempPath.push({
                        icon: <AiOutlineQrcode />,
                        value: 'QR Enjamlar',
                        path: '/qrDevices',
                    });
                    break;
                case 'divisions':
                    tempPath.push({
                        icon: <FaBuilding />,
                        value: 'B??l??mler',
                        path: '/divisions',
                    });
                    break;
                case 'groups':
                    tempPath.push({
                        icon: <AiOutlineUngroup />,
                        value: 'Grupbalar',
                        path: '',
                    });
                    break;
                case 'products':
                    tempPath.push({
                        icon: <BsFillInboxesFill />,
                        value: 'Harytlar',
                        path: '/products',
                    });
                    break;

                case 'notFoundRoute':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: 'Not Found',
                        path: '/notFoundRoute',
                    });
                    break;
                case 'mainGroups':
                    tempPath.push({
                        icon: <FaLayerGroup />,
                        value: 'Esasy-grupbalar',
                        path: '/groups/mainGroups',
                    });
                    break;
                case 'brands':
                    tempPath.push({
                        icon: <AiFillTags />,
                        value: 'Brendler',
                        path: '/brands',
                    });
                    break;
                case 'subgroups':
                    tempPath.push({
                        icon: <AiOutlineGroup />,
                        value: 'Alt-grupbalar',
                        path: '/groups/subgroups',
                    });
                    break;
                case 'units':
                    tempPath.push({
                        icon: <RiRulerLine />,
                        value: 'Birimler',
                        path: '/units',
                    });
                    break;
                case 'dukandaVersionControl':
                    tempPath.push({
                        icon: <MdOutlineQrCode />,
                        value: 'D??kanda wersia kontrol',
                        path: '/dukandaVersionControl',
                    });
                    break;
                case 'syncs':
                    tempPath.push({
                        icon: <RiRulerLine />,
                        value: 'Sinhronlar',
                        path: '',
                    });
                    break;
                case 'smanual':
                    tempPath.push({
                        icon: <Ri24HoursFill />,
                        value: 'Manuel',
                        path: '/syncs/smanual',
                    });
                    break;
                case 'sschedules':
                    tempPath.push({
                        icon: <AiOutlineSchedule />,
                        value: 'Tertibi',
                        path: '/syncs/sschedules',
                    });
                    break;
                case 'shistories':
                    tempPath.push({
                        icon: <FaHistory />,
                        value: 'Taryhy',
                        path: '/syncs/shistories',
                    });
                    break;
                case 'scalingSystems':
                    tempPath.push({
                        icon: <FaBalanceScaleLeft />,
                        value: 'Terazi sistemi',
                        path: '/scalingSystems',
                    });
                    break;
                case 'employee':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${
                            employeeData?.fullName ? employeeData?.fullName : ''
                        } `,
                        path: `/employees/${employeeData?.id}`,
                    });
                    break;
                case 'brand':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${brandData?.name ? brandData?.name : ''} `,
                        path: `/brands/${brandData?.id}`,
                    });
                    break;
                case 'division':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${
                            divisionData?.name ? divisionData?.name : ''
                        } `,
                        path: `/divisions/${divisionData?.id}`,
                    });
                    break;
                case 'unit':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${unitData?.name ? unitData?.name : ''} `,
                        path: `/units/${unitData?.id}`,
                    });
                    break;
                case 'client':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${nameShortener(
                            clientData?.userName
                                ? clientData?.userName
                                : clientData?.name
                        )} `,
                    });
                    break;

                case 'qrDevice':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${
                            qrDeviceData?.model ? qrDeviceData?.model : ''
                        } `,
                    });
                    break;
                case 'groupm':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${groupData?.name ? groupData?.name : ''} `,
                    });
                    break;
                case 'groupss':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${groupData?.name ? groupData?.name : ''} `,
                    });
                    break;
                case 'schedule':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${
                            syncScheduleData?.name ? syncScheduleData?.name : ''
                        } `,
                    });
                    break;

                case 'card':
                    tempPath.push({
                        icon: <FaBoxOpen />,
                        value: `${productData.name ? productData.name : ''} :${
                            productData.id
                        }`,
                    });
                    break;
                default:
                    path !== 'welcomePage' &&
                        tempPath.push({
                            icon: <FaBoxOpen />,
                            value: path,
                        });
                    break;
            }
        });
        setSidebarLocation(tempPath);
        // eslint-disable-next-line
    }, [
        useeLocation,
        productData,
        employeeData,
        divisionData,
        brandData,
        unitData,
        clientData,
        qrDeviceData,
        syncScheduleData,
        groupData,
    ]);
    return (
        <div className="sidebar-location">
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<AiOutlineRight />}
                className="breadcrumb"
            >
                {sidebarLocation &&
                    sidebarLocation?.map((loc, i) => {
                        return i !== sidebarLocation.length - 1 &&
                            loc.path !== '' ? (
                            <Link
                                className="link"
                                underline="hover"
                                to={loc.path}
                                key={i}
                            >
                                <span className="breadcrumb-icon">
                                    {loc.icon}
                                </span>
                                <span className="breadcrumb-value">
                                    {loc.value}
                                </span>
                            </Link>
                        ) : (
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                className="link"
                                key={i}
                            >
                                <span className="breadcrumb-icon">
                                    {loc.icon}
                                </span>
                                <span className="breadcrumb-value">
                                    {loc.value}
                                </span>
                            </Typography>
                        );
                    })}
            </Breadcrumbs>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        productData: state.productData.productData,
        employeeData: state.employeeData.employeeData,
        groups: state.groups,
        divisionData: state.divisionData.divisionData,
        brandData: state.brandData.brandData,
        unitData: state.unitData.unitData,
        qrDeviceData: state.qrDeviceData.qrDeviceData,
        groupData: state.groupData.groupData,
        syncScheduleData: state.syncScheduleData.syncScheduleData,
        clientData: state.clientData,
        qrDeviceSendInfo: state.qrDeviceSendInfo,
    };
};

export default connect(mapStateToProps)(Breadcrumb);
