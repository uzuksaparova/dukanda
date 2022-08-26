import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { BsCardImage } from 'react-icons/bs';
import { ImCopy, ImKey } from 'react-icons/im';
import tmFlag from '../../../images/tm.svg';
import ruFlag from '../../../images/ru.svg';
import trFlag from '../../../images/tr.svg';
import engFlag from '../../../images/gb.svg';
import './cardTab.scss';
import { FaExchangeAlt } from 'react-icons/fa';
import { GoInfo } from 'react-icons/go';
import CardImageModal from '../../cardImageModal/CardImageModal';
import 'video-react/dist/video-react.css'; // import css
import { CgHome } from 'react-icons/cg';
import ProductStock from '../../productStock/ProductStock';
import ProductPrice from '../../productPrice/ProductPrice';
import { IoIosPricetags } from 'react-icons/io';
import { connect } from 'react-redux';
import * as authorizationn from '../../authorization.json';
import ProductTab1 from './productTabs/productTab1/ProductTab1';
import ProductNameTab from './productTabs/productNameTab/ProductNameTab';
import ProductTab5 from './productTabs/productTab5/ProductTab5';
import ProductTab6 from './productTabs/productTab6/ProductTab6';
import ProductTab7 from './productTabs/productTab7/ProductTab7';
import ProductAltSubTab from './productTabs/productAltSubTab/ProductAltSubTab';
import { useMediaQuery } from 'react-responsive';
import ProductTab5Mobile from './productTabs/productTab5/ProductTab5Mobile';

const authorization = authorizationn.default;

function TabContainer(props) {
    return (
        <Typography component="div" className="card-bottom">
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function CardTab(props) {
    const {
        normalImage,
        cardTabValue,
        setCardTabValue,
        setNormalImage,
        productData,
        productItemSendInfo,
        decodedToken,
        fetchAdminById,
        orderId,
    } = props;
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

    const [usageImage, setUsageImage] = useState([]);
    const [schemaImage, setSchemaImage] = useState([]);

    // whenever the productData changes or whenever specific card is opened
    //sets normal, usage , schema images and quill array for mapping ...
    useEffect(() => {
        var norm = [];
        var usage = [];
        var schema = [];
        productData?.images?.forEach((image) => {
            if (image.type === 'normal') {
                norm.push({
                    image: image.mediumImg,
                    id: image.id,
                    main: image.mainImage,
                    big: image.bigImg,
                    small: image.smallImg,
                });
            } else if (image.type === 'usage') {
                usage.push({
                    image: image.mediumImg,
                    id: image.id,
                    big: image.bigImg,
                    small: image.smallImg,
                });
            } else {
                schema.push({
                    image: image.mediumImg,
                    id: image.id,
                    big: image.bigImg,
                    small: image.smallImg,
                });
            }
        });
        setNormalImage(norm);
        setUsageImage(usage);
        setSchemaImage(schema);
        // eslint-disable-next-line
    }, [productData, productItemSendInfo]);
    //handles quill input

    // scrolls tabs according to cardTabValue
    const handleCardTabChange = (event, value) => {
        setCardTabValue(value);
    };

    return (
        <div className="card-tabs">
            <AppBar position="static" color="default">
                <Tabs
                    value={cardTabValue}
                    onChange={handleCardTabChange}
                    scrollButtons="auto"
                    textColor="secondary"
                    variant="scrollable"
                >
                    <Tab label={<span>Maglumat</span>} icon={<GoInfo />} />
                    <Tab
                        label={<span>Türkmençe</span>}
                        icon={<img src={tmFlag} alt="flag" />}
                    />
                    {/* <Tab
                        label={<span>Türkçe</span>}
                        icon={<img src={trFlag} alt="flag" />}
                    />
                    <Tab
                        label={<span>Iňlisçe</span>}
                        icon={<img src={engFlag} alt="flag" />}
                    /> */}
                    <Tab
                        label={<span>Rusça</span>}
                        icon={<img src={ruFlag} alt="flag" />}
                    />
                    <Tab label={<span>Suratlar</span>} icon={<BsCardImage />} />
                    <Tab label={<span>Video</span>} icon={<BsCardImage />} />
                    <Tab label={<span>Keywords</span>} icon={<ImKey />} />
                    <Tab
                        label={<span>Stok</span>}
                        icon={<CgHome />}
                        disabled={
                            authorization[decodedToken.role].includes(
                                'seeProductStock'
                            )
                                ? false
                                : true
                        }
                    />
                    <Tab
                        label={<span>Alternatif ürünler</span>}
                        icon={<FaExchangeAlt />}
                    />
                    <Tab
                        label={<span>Kardeş ürünler</span>}
                        icon={<ImCopy />}
                    />
                    <Tab
                        label={<span>Baha</span>}
                        icon={<IoIosPricetags />}
                        disabled={
                            authorization[decodedToken.role].includes(
                                'seeProductPrice'
                            )
                                ? false
                                : true
                        }
                    />
                    )
                </Tabs>
            </AppBar>
            {cardTabValue === 0 && productData && (
                <ProductTab1 TabContainer={TabContainer} />
            )}
            {cardTabValue === 1 && (
                <ProductNameTab lan="Tm" TabContainer={TabContainer} />
            )}
            {/* {cardTabValue === 2 && (
                <ProductNameTab lan="Tr" TabContainer={TabContainer} />
            )}
            {cardTabValue === 3 && (
                <ProductNameTab lan="Eng" TabContainer={TabContainer} />
            )} */}
            {cardTabValue === 2 && (
                <ProductNameTab lan="Ru" TabContainer={TabContainer} />
            )}
            {cardTabValue === 3 &&
                (isMobileScreen ? (
                    <ProductTab5Mobile
                        TabContainer={TabContainer}
                        normalImage={normalImage}
                        usageImage={usageImage}
                        schemaImage={schemaImage}
                        setNormalImage={setNormalImage}
                        setSchemaImage={setSchemaImage}
                        setUsageImage={setUsageImage}
                        fetchAdminById={fetchAdminById}
                    />
                ) : (
                    <ProductTab5
                        TabContainer={TabContainer}
                        normalImage={normalImage}
                        usageImage={usageImage}
                        schemaImage={schemaImage}
                        setNormalImage={setNormalImage}
                        setSchemaImage={setSchemaImage}
                        setUsageImage={setUsageImage}
                        fetchAdminById={fetchAdminById}
                    />
                ))}
            {cardTabValue === 4 && <ProductTab6 TabContainer={TabContainer} />}
            {cardTabValue === 5 && <ProductTab7 TabContainer={TabContainer} />}
            {cardTabValue === 6 && (
                <TabContainer>
                    <div
                        style={{
                            height: orderId
                                ? 'calc(100vh - 232px)'
                                : 'calc(100vh - 175px)',
                        }}
                    >
                        <ProductStock
                            id={productData.id}
                            renderedIn="productTab"
                        />
                    </div>
                </TabContainer>
            )}

            {cardTabValue === 7 && (
                <ProductAltSubTab
                    TabContainer={TabContainer}
                    products={productData?.alternatives}
                    setCardTabValue={setCardTabValue}
                />
            )}
            {cardTabValue === 8 && (
                <ProductAltSubTab
                    TabContainer={TabContainer}
                    products={productData?.subItems}
                    setCardTabValue={setCardTabValue}
                />
            )}
            {cardTabValue === 9 && (
                <TabContainer>
                    <ProductPrice />
                </TabContainer>
            )}
            <CardImageModal />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        productData: state.productData.productData,
        productItemSendInfo: state.productItemSendInfo.productItemSendInfo,
        decodedToken: state.decodedToken.decodedToken,
    };
};

export default connect(mapStateToProps)(CardTab);
