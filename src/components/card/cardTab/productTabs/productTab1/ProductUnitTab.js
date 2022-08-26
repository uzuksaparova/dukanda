import React, { useState } from 'react';
import { Badge, Input } from '@material-ui/core';
import { Box, Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import './productUnitTab.scss';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';

function ProductUnitTab(props) {
    const { productData } = props;
    const [unitTabValue, setUnitTabValue] = useState(0);
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });
    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    const tabInfoSetter = (unit) => {
        return [
            [
                {
                    header: 'En',
                    input1: unit.width_ ? unit.width_ : '0',
                    input2: unit.width?.code ? unit.width?.code : ' ',
                },
                {
                    header: 'Net Hacim',
                    input1: unit.grossvolume_ ? unit.grossvolume_ : '0',
                    input2: unit.grossvolume?.code
                        ? unit.grossvolume?.code
                        : ' ',
                },
            ],
            [
                {
                    header: 'Boy',
                    input1: unit.length_ ? unit.length_ : '0',
                    input2: unit.length ? unit.length : ' ',
                },
                {
                    header: 'Brüt hacim',
                    input1: unit.volume_ ? unit.volume_ : '0',
                    input2: unit.volume ? unit.volume : ' ',
                },
            ],
            [
                {
                    header: 'Yükseklik',
                    input1: unit.height_ ? unit.height_ : '0',
                    input2: unit.height ? unit.height : ' ',
                },
                {
                    header: 'Net ağırlık',
                    input1: unit.grossweight_ ? unit.grossweight_ : '0',
                    input2: unit.grossweight?.code
                        ? unit.grossweight?.code
                        : ' ',
                },
            ],
            [
                {
                    header: 'Alan',
                    input1: unit.area_ ? unit.area_ : '0',
                    input2: unit.area ? unit.area : ' ',
                },
                {
                    header: 'Brüt ağırlık',
                    input1: unit.weight_ ? unit.weight_ : '0',
                    input2: unit.weight ? unit.weight : ' ',
                },
            ],
        ];
    };
    return (
        <Box
            className="unit-tab"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                boxShadow: '0 0px 20px -8px rgba(150, 170, 180, 0.5)',
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={unitTabValue}
                onChange={(e, n) => {
                    setUnitTabValue(n);
                }}
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                }}
            >
                {productData &&
                    productData?.units.map((unit, i) => {
                        return (
                            <Tab
                                label={
                                    unit.eActive || unit.mainUnit ? (
                                        <Badge
                                            color={'secondary'}
                                            variant="dot"
                                        >
                                            {unit.info.name}
                                        </Badge>
                                    ) : (
                                        <span> {unit.info.name}</span>
                                    )
                                }
                                {...a11yProps(i)}
                                key={uuidv4()}
                            />
                        );
                    })}
            </Tabs>
            {productData &&
                productData?.units.map((unit, i) => {
                    let tabInfo = tabInfoSetter(unit);
                    return (
                        <TabPanel value={unitTabValue} index={i} key={uuidv4()}>
                            <div className="unit-one-row">
                                {!unit.mainUnit ? (
                                    <div className="unit-left">
                                        1 {unit.info.name} = {unit?.coefficient}{' '}
                                        {productData.mainUnit}
                                    </div>
                                ) : (
                                    <div className="unit-left">
                                        {unit.info.name}
                                    </div>
                                )}
                                <div
                                    className="paretto"
                                    style={{
                                        backgroundColor: `${
                                            unit.eActive || unit.mainGroup
                                                ? 'rgba(0, 135, 107, 0.6)'
                                                : 'rgba(255, 0, 26, 0.6)'
                                        }`,
                                    }}
                                >
                                    <span>
                                        {unit.eActive || unit.mainGroup
                                            ? 'aktiw'
                                            : 'passiw'}
                                    </span>
                                </div>
                            </div>
                            {tabInfo.map((ti) => {
                                return (
                                    <div
                                        className={`${
                                            !isMobileScreen ? 'tab-one-row' : ''
                                        }`}
                                        key={uuidv4()}
                                    >
                                        {ti.map((tii) => {
                                            return (
                                                <div
                                                    className="tab-one-row"
                                                    key={uuidv4()}
                                                >
                                                    <div className="tab-left">
                                                        {tii.header}
                                                    </div>
                                                    <div className="tab-right">
                                                        <Input
                                                            value={tii?.input1}
                                                        />
                                                        <Input
                                                            value={tii?.input2}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </TabPanel>
                    );
                })}
        </Box>
    );
}
const mapStateToProps = (state) => {
    return {
        productData: state.productData.productData,
    };
};
export default connect(mapStateToProps)(ProductUnitTab);
