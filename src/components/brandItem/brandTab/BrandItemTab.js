import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './brandItemTab.scss';
import { useParams } from 'react-router-dom';
import {
    BACKEND_URL,
    fetchWithParams,
    deleteForAdmin,
} from '../../../functions';
import {
    setBrandData,
    setBrandsData,
} from '../../../redux/actions/brandActions';
import { connect } from 'react-redux';
import { brandsData } from '../../../redux/reducers/brandReducer';
import AddImageComponent from '../../addImageComponent/AddImageComponent';
import BrandTab2 from './brandTabs/BrandTab2';

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function BrandItemTab(props) {
    const { id } = useParams();
    const {
        brandImage,
        setBrandImage,
        brandData,
        setBrandsData,
        setBrandData,
    } = props;

    const brandRef = useRef(null);
    const [brandItemsData, setBrandItemsData] = useState([]);
    const [brandSendInfo, setBrandSendInfo] = useState({
        limit: 20,
        offset: 0,
        search: '',
    });
    const [brandItems, setBrandItems] = useState({ data: [], isEnd: false });
    const [brandTabValue, setBrandTabValue] = useState(0);

    useEffect(() => {
        fetchBrandWithItem();
        // eslint-disable-next-line
    }, []);

    const handleBrandTabChange = (event, value) => {
        setBrandTabValue(value);
    };

    const fetchBrandWithItem = (firstTime = false) => {
        fetchWithParams(
            {
                url: `${BACKEND_URL}/admin/brands/${id}/items`,
                params: firstTime
                    ? {
                          ...brandSendInfo,
                          offset: 0,
                          includes: 'itemImages',
                      }
                    : {
                          ...brandSendInfo,
                          includes: 'itemImages',
                      },
            },
            (data) => {
                let tempBrandSendInfo = brandSendInfo;
                let tempBrandItems = brandItems;
                !data.length || data.length < tempBrandSendInfo.limit
                    ? (tempBrandItems.isEnd = true)
                    : (tempBrandItems.isEnd = false);
                if (firstTime) {
                    setBrandItemsData([...data]);
                    tempBrandSendInfo.offset = tempBrandSendInfo.limit;
                    tempBrandItems.data = data;
                    setBrandItems(data);
                } else {
                    setBrandItemsData([...brandItems.data, ...data]);
                    tempBrandItems.data = [...brandItems.data, ...data];
                    tempBrandSendInfo.offset =
                        tempBrandSendInfo.offset + tempBrandSendInfo.limit;
                }
                setBrandItems(tempBrandItems);
            }
        );
    };

    const handleAddBrandImage = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setBrandImage({
                local: true,
                send: url,
                image: file,
            });
        }
    };

    const handleBrandImageDelete = () => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/brands/${id}`,
                notifyMessage: 'Surat pozulyar',
                updateMessage: 'Surat pozuldy',
            },
            (data) => {
                if (data !== 'err') {
                    setBrandData({ ...brandData, image: '' });
                    var tempo = brandImage;
                    tempo.image = '';
                    setBrandImage({ local: false, image: '', send: '' });
                    var temp = brandsData.data;
                    temp.forEach((brand, i) => {
                        if (brand.id === id) {
                            brand.image = '';
                        }
                    });
                    setBrandsData({ ...brandsData, data: temp });
                }
            }
        );
    };

    const handleButtonClick = () => {
        brandRef.current.click();
    };

    return (
        <div className="brand-tab">
            <AppBar position="static" color="default">
                <Tabs
                    value={brandTabValue}
                    onChange={handleBrandTabChange}
                    scrollButtons="auto"
                    textColor="secondary"
                    variant="scrollable"
                >
                    <Tab label={<span>Maglumat</span>} />
                    <Tab label={<span>Harytlar</span>} />
                </Tabs>
            </AppBar>
            {brandTabValue === 0 && (
                <TabContainer>
                    <AddImageComponent
                        imageObj={brandImage}
                        handleImageChange={handleAddBrandImage}
                        handleImageDeletion={handleBrandImageDelete}
                        handleButtonClick={handleButtonClick}
                        disabledValue="updateBrand"
                        imageRef={brandRef}
                        type="brands"
                    />
                </TabContainer>
            )}
            {brandTabValue === 1 && (
                <TabContainer>
                    <BrandTab2
                        setBrandSendInfo={setBrandSendInfo}
                        setBrandItems={setBrandItems}
                        brandItems={brandItems}
                        fetchBrandWithItem={fetchBrandWithItem}
                        brandItemsData={brandItemsData}
                    />
                </TabContainer>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        brandData: state.brandData.brandData,
        brandsData: state.brandsData,
        decodedToken: state.decodedToken.decodedToken,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setBrandsData: (data) => {
            dispatch(setBrandsData(data));
        },
        setBrandData: (data) => {
            dispatch(setBrandData(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandItemTab);
