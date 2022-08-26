import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './qrDeviceItemTab.scss';
import CardImageModal from '../../cardImageModal/CardImageModal';
import QrTab1 from './qrTabs/qrTab1/QrTab1';
import QrTab2 from './qrTabs/qrTab2/QrTab2';

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function QrDeviceItemTab(props) {
    const [qrDeviceTabValue, setQrDeviceTabValue] = useState(0);

    const handleQrDeviceTabChange = (event, value) => {
        setQrDeviceTabValue(value);
    };

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
                    <QrTab2 />
                </TabContainer>
            )}

            <CardImageModal />
        </div>
    );
}

export default QrDeviceItemTab;
