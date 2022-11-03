import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './qrDeviceItemTab.scss';
import CardImageModal from '../../cardImageModal/CardImageModal';
import QrTab1 from './qrTabs/qrTab1/QrTab1';
import QrTab2 from './qrTabs/qrTab2/QrTab2';
import { BACKEND_URL, fetchWithParams } from '../../../functions';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function QrDeviceItemTab(props) {
    const [qrDeviceTabValue, setQrDeviceTabValue] = useState(0);
    const { id } = useParams();

    const handleQrDeviceTabChange = (event, value) => {
        setQrDeviceTabValue(value);
    };

    const [qrDeviceItemSendInfo, setQrDeviceItemSendInfo] = useState({
        limit: 10,
        offset: 0,
    });
    const [qrDeviceItemData, setQrDeviceItemData] = useState({
        data: [],
        isEnd: false,
    });

    const fetchQrDeviceItemInfo = (firstTime = false) => {
        fetchWithParams(
            {
                url: `${BACKEND_URL}/admin/clients/qrDevice/UID/${id}/items`,
                params: firstTime
                    ? { ...qrDeviceItemSendInfo, offset: 0 }
                    : { ...qrDeviceItemSendInfo },
            },
            (data) => {
                data.forEach((dvc) => {
                    dvc.createdAt = dateFormat(
                        dvc.createdAt,
                        'yyyy-mm-dd HH:MM'
                    );
                });
                let tempQrDeviceItemData = qrDeviceItemData;
                if (firstTime) {
                    tempQrDeviceItemData.data = data;
                    setQrDeviceItemSendInfo({
                        ...qrDeviceItemSendInfo,
                        offset: qrDeviceItemSendInfo.limit,
                    });
                } else {
                    tempQrDeviceItemData.data = [
                        ...tempQrDeviceItemData.data,
                        ...data,
                    ];
                    setQrDeviceItemSendInfo({
                        ...qrDeviceItemSendInfo,
                        offset:
                            qrDeviceItemSendInfo.limit +
                            qrDeviceItemSendInfo.offset,
                    });
                }
                !data.length || data.length < qrDeviceItemSendInfo.limit
                    ? (tempQrDeviceItemData.isEnd = true)
                    : (tempQrDeviceItemData.isEnd = false);

                setQrDeviceItemData(tempQrDeviceItemData);
            }
        );
    };

    useEffect(() => {
        fetchQrDeviceItemInfo(true);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="qr-device-tab">
            <AppBar position="static" color="default">
                <Tabs
                    value={qrDeviceTabValue}
                    onChange={handleQrDeviceTabChange}
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons={true}
                >
                    <Tab label={<span>Maglumat</span>} />
                    <Tab label={<span>Gyzyklanan harytlary</span>} />
                </Tabs>
            </AppBar>
            {qrDeviceTabValue === 0 && (
                <TabContainer>
                    <QrTab1 />
                </TabContainer>
            )}
            {qrDeviceTabValue === 1 && (
                <TabContainer>
                    <QrTab2
                        fetchQrDeviceItemInfo={fetchQrDeviceItemInfo}
                        qrDeviceItemData={qrDeviceItemData}
                    />
                </TabContainer>
            )}

            <CardImageModal />
        </div>
    );
}

export default QrDeviceItemTab;
