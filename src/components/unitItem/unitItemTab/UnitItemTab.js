import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UnitTab1 from './unitTabs/unitTab1/UnitTab1';
import './unitItemTab.scss';

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function UnitItemTab({ unitInfoSend, setUnitInfoSend }) {
    const [unitTabValue, setUnitTabValue] = useState(0);

    const handleUnitTabChange = (event, value) => {
        setUnitTabValue(value);
    };

    return (
        <div className="unit-tab">
            <AppBar position="static" color="default">
                <Tabs
                    value={unitTabValue}
                    onChange={handleUnitTabChange}
                    scrollButtons="auto"
                    textColor="secondary"
                    variant="scrollable"
                >
                    <Tab label={<span>Maglumat</span>} />
                </Tabs>
            </AppBar>
            {unitTabValue === 0 && (
                <TabContainer>
                    <UnitTab1
                        unitInfoSend={unitInfoSend}
                        setUnitInfoSend={setUnitInfoSend}
                    />
                </TabContainer>
            )}
        </div>
    );
}

export default UnitItemTab;
