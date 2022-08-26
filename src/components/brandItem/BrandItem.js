import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import BrandItemTab from './brandTab/BrandItemTab';
import './brandItem.scss';
import {
    BACKEND_URL,
    fetchForAdmin,
    fetchForAdminWithUpdateToast,
    fetchBrandsInfo,
} from '../../functions';
import {
    setBrandData,
    setBrandsData,
    setBrandSendInfo,
} from '../../redux/actions/brandActions';
import { connect } from 'react-redux';
import TopButtons from '../topButtons/TopButtons';

function BrandItem(props) {
    const {
        isSidebarOpen,
        setBrandData,
        setBrandsData,
        brandSendInfo,
        brandData,
        brandsData,
        setBrandSendInfo,
    } = props;
    const { id } = useParams();
    const [brandImage, setBrandImage] = useState({});

    const fetchBrandById = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/brands/${id}`,
                method: 'GET',
            },
            (data) => {
                setBrandData(data);
                setBrandImage({ local: false, image: data.image, send: '' });
                var temp = brandsData.data;
                temp = temp.map((g, i) => {
                    if (g.id === Number(id)) {
                        return data;
                    } else {
                        return g;
                    }
                });
                setBrandsData({ ...brandsData, data: temp });
            }
        );
    };

    useEffect(() => {
        setBrandSendInfo({ ...brandSendInfo, offset: 0 });
        fetchBrandById();
        !brandsData.data.length && fetchBrandsInfo(true);
        // eslint-disable-next-line
    }, []);

    const handleSyncClick = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/sync/brands`,
                method: 'POST',
                notifyMessage: 'Güncelleniyor lütfen bekleyiniz...',
                updateMessage: 'Başarıyla güncellendi',
                params: { id },
            },
            (data) => {
                fetchBrandById();
            }
        );
    };
    const onSaveButtonClick = () => {
        const formData = new FormData();
        if (brandImage.local) {
            formData.append('image', brandImage.image);
        }
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/brands/${id}`,
                method: 'PUT',
                body: formData,
                notifyMessage: 'Saving ...',
                updateMessage: 'Saved',
            },
            (data) => {
                fetchBrandById();
            }
        );
    };

    return (
        <div
            className={
                isSidebarOpen ? ' sidebar-open brand-info' : 'brand-info'
            }
        >
            <div className="top">
                <div className="left">
                    <div className="tiger-name">{brandData.name}</div>
                    <div className="tiger-code">{brandData.code}</div>
                </div>
                <TopButtons
                    disabledValue="updateBrand"
                    handleSaveButton={onSaveButtonClick}
                    cancelPath="/brands"
                    sync={true}
                    handleSyncClick={handleSyncClick}
                />
            </div>
            <div className="bottom">
                <BrandItemTab
                    brandImage={brandImage}
                    setBrandImage={setBrandImage}
                />
            </div>
            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        brandsData: state.brandsData,
        brandData: state.brandData.brandData,
        brandSendInfo: state.brandSendInfo,
        decodedToken: state.decodedToken.decodedToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setBrandData: (data) => {
            dispatch(setBrandData(data));
        },
        setBrandsData: (data) => {
            dispatch(setBrandsData(data));
        },
        setBrandSendInfo: (info) => {
            dispatch(setBrandSendInfo(info));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandItem);
