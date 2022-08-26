import React, { useEffect, useState } from 'react';
import './card.scss';
import CardTab from './cardTab/CardTab';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
    BACKEND_URL,
    notification,
    fetchForAdminWithUpdateToast,
    fetchProductsInfo,
    fetchForAdmin,
} from '../../functions';
import {
    setProductData,
    setProductItemSendInfo,
    setProductsData,
} from '../../redux/actions/productActions';
import { connect } from 'react-redux';
import TopButtons from '../topButtons/TopButtons';
import { useMediaQuery } from 'react-responsive';

function Card(props) {
    const {
        setProductData,
        productData,
        setProductItemSendInfo,
        productItemSendInfo,
        isSidebarOpen,
        setProductsData,
        productsData,
        orderId,
    } = props;
    const { id } = useParams();
    const [normalImage, setNormalImage] = useState([]);
    const [cardTabValue, setCardTabValue] = useState(0);
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

    const fetchAdminById = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/items/${productData.id}`,
                method: 'GET',
            },
            (data) => {
                var tempAdminCardsInfo = productsData.data;
                tempAdminCardsInfo = tempAdminCardsInfo.map((card) => {
                    if (card.id === productData.id) {
                        return data;
                    } else {
                        return card;
                    }
                });
                setProductsData({
                    ...productsData,
                    data: [...tempAdminCardsInfo],
                });
            }
        );
    };
    const quillDecoder = (quill) => {
        if (quill) {
            return quill.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }
        return '';
    };

    const fetchCardById = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/items/${orderId ? orderId : id}`,
                method: 'GET',
            },
            (data) => {
                setProductItemSendInfo({
                    id: data.id,
                    active: data?.active,
                    nameTm: data?.nameTm,
                    nameEng: data?.nameEng,
                    nameTr: data?.nameTr,
                    nameRu: data?.nameRu,
                    infoTm: quillDecoder(data?.infoTm),
                    infoEng: quillDecoder(data?.infoEng),
                    infoTr: quillDecoder(data?.infoTr),
                    infoRu: quillDecoder(data?.infoRu),
                    keywords: data?.keywords,
                });
                setProductData(data);
            }
        );
    };
    //whenever the specific card is clicked fetches card info
    useEffect(() => {
        fetchCardById();
        fetchProductsInfo(true);
        // eslint-disable-next-line
    }, [id, orderId]);

    // save function for  all product info changes
    const fetchOnSaveClick = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/items/${orderId ? orderId : id}`,
                method: 'PUT',
                notifyMessage: 'Kaydediliyor...',
                updateMessage: 'Kaydedildi',
                body: JSON.stringify({ ...productItemSendInfo }),
            },
            (data) => {
                fetchAdminById();
            }
        );
    };

    const handleSyncClick = () => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/sync/items`,
                method: 'POST',
                notifyMessage: 'Güncelleniyor lütfen bekleyiniz...',
                updateMessage: 'Başarıyla güncellendi',
                params: { id: orderId ? orderId : id },
            },
            (data) => {
                fetchCardById();
            }
        );
    };

    // saves all product info changes to backend
    const onSaveButtonClick = async () => {
        var mainNotExist = normalImage.every((i) => {
            return i.main === false;
        });
        if (normalImage.length && mainNotExist) {
            var agreed = window.confirm(
                'Esasy surat bellenmedi, birinji suratyn esasy surat bolmasyny isleyanizmi?'
            );
            if (agreed) {
                if (normalImage.length) {
                    fetchForAdminWithUpdateToast(
                        {
                            url: `${BACKEND_URL}/admin/items/setMain`,
                            body: JSON.stringify({
                                imageId: normalImage[0].id,
                                itemId: productData.id,
                            }),
                            notifyMessage: 'Esasy surat bellenyar...',
                            updateMessage: 'Esasy surat bellendi',
                        },
                        (data) => {
                            // fetchAdminById();
                            var tem = normalImage;
                            tem[0].main = true;
                            setNormalImage(tem);
                        }
                    );
                } else {
                    notification(
                        'Esasy suratlar boluminde hic hili surat tapylmady'
                    );
                }
                fetchOnSaveClick();
                setProductData({
                    ...productData,
                    itemLanguage: productItemSendInfo,
                });
            } else {
                setCardTabValue(5);
            }
        } else {
            fetchOnSaveClick();
        }
    };

    //cancel button that redirects to cards page
    const onResetButtonClick = () => {
        setProductItemSendInfo({
            active: productData.active,
            id: productData.id,
            nameTm: productData?.nameTm || '',
            nameEng: productData?.nameEng || '',
            nameTr: productData?.nameTr || '',
            nameRu: productData?.nameRu || '',
            infoTm: quillDecoder(productData?.infoTm),
            infoEng: quillDecoder(productData?.infoEng),
            infoTr: quillDecoder(productData?.infoTr),
            infoRu: quillDecoder(productData?.infoRu),
            keywords: productData?.keywords,
        });
    };

    return (
        <div
            className={`card-info ${isSidebarOpen ? ' sidebar-open' : ''}`}
            style={{
                height: orderId ? '100%' : '100vh',
                padding: orderId ? '10px' : '0',
                marginTop: orderId ? '0' : '35px',
            }}
        >
            <div className="top">
                <div className="left">
                    <div className="tiger-name">{productData.name}</div>
                    <div className="tiger-code">{productData.code}</div>
                    {productData.e_code ? (
                        <div className="tiger-code">{productData.e_code}</div>
                    ) : null}
                </div>
                {orderId ? null : (
                    <TopButtons
                        disabledValue="updateProduct"
                        handleSaveButton={onSaveButtonClick}
                        handleResetButton={onResetButtonClick}
                        cancelPath="/products"
                        sync={true}
                        resetEnable={true}
                        handleSyncClick={handleSyncClick}
                    />
                )}
            </div>
            <div className="bottom">
                <CardTab
                    normalImage={normalImage}
                    setNormalImage={setNormalImage}
                    cardTabValue={cardTabValue}
                    setCardTabValue={setCardTabValue}
                    fetchAdminById={fetchAdminById}
                    orderId={orderId}
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
        productsData: state.productsData,
        productData: state.productData.productData,
        productItemSendInfo: state.productItemSendInfo.productItemSendInfo,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProductData: (data) => dispatch(setProductData(data)),
        setProductsData: (data) => dispatch(setProductsData(data)),
        setProductItemSendInfo: (info) =>
            dispatch(setProductItemSendInfo(info)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
