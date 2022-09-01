import React, { useRef } from 'react';
import { BsStarFill, BsTrashFill } from 'react-icons/bs';
import { MdAddAPhoto, MdZoomOutMap } from 'react-icons/md';
import brokenImage from '../../../../../images/brokenImage.png';
import * as authorizationn from '../../../../authorization.json';
import {
    BACKEND_URL,
    deleteForAdmin,
    fetchForAdminWithUpdateToast,
} from '../../../../../functions';
import {
    setCardImagesIndex,
    setIsProductImageModalOpen,
    setProductImages,
} from '../../../../../redux/actions/productActions';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import './productTab5.scss';

function ProductTab5(props) {
    const {
        TabContainer,
        setProductImages,
        setIsProductImageModalOpen,
        setCardImagesIndex,
        fetchAdminById,
        decodedToken,
        normalImage,
        usageImage,
        schemaImage,
        setNormalImage,
        setSchemaImage,
        setUsageImage,
        productData,
    } = props;
    const normal = useRef(null);
    const usage = useRef(null);
    const schema = useRef(null);
    var token = Cookies.get('admin_token');
    var bearer = 'Bearer ' + token;
    const authorization = authorizationn.default;

    const addImageClickReferencing = (refi) => {
        refi === 'normal'
            ? normal.current.click()
            : refi === 'usage'
            ? usage.current.click()
            : schema.current.click();
    };

    //fetches image main
    const onMakeMainClick = (id) => {
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/items/setMain`,
                notifyMessage: 'Esasy surat bellenýär ...',
                updateMessage: 'Esasy surat bellendi',
                body: JSON.stringify({ imageId: id, itemId: productData?.id }),
            },
            (data) => {
                if (data !== 'err') {
                    fetchAdminById();
                    var tempo = normalImage;
                    tempo.forEach((image) => {
                        image.main = image.id === id;
                    });
                    setNormalImage(tempo);
                }
            }
        );
    };
    //handles image add and change
    const imageSelect = (e, typee, id) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('itemId', productData?.id);
            formData.append('image', file);
            if (id !== -1) {
                formData.append('oldImageId', id);
            }

            typee === 'normal'
                ? formData.append('type', 'normal')
                : typee === 'usage'
                ? formData.append('type', 'usage')
                : formData.append('type', 'schema');
            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/items`,
                    body: formData,
                    headers: {
                        Authorization: bearer,
                    },
                    notifyMessage:
                        id !== -1
                            ? 'Surat üýtgedilýar ...'
                            : 'Surat Ýüklenilýär ...',
                    updateMessage:
                        id !== -1 ? 'Surat üýtgedildi' : 'Surat Ýüklendi',
                },
                (data) => {
                    if (data !== 'err') {
                        const replacing = (type, data) => {
                            var tempo = JSON.parse(JSON.stringify(type));
                            var obj = {
                                image: data.data.mediumImg,
                                id: id,
                                main: false,
                            };
                            return tempo.map((image) => {
                                if (image.id === id) {
                                    return obj;
                                }
                                return image;
                            });
                        };
                        fetchAdminById();
                        if (id !== -1) {
                            if (typee === 'normal') {
                                var statee = replacing(normalImage, data);
                                setNormalImage(statee);
                            } else if (typee === 'usage') {
                                statee = replacing(usageImage, data);
                                setUsageImage(statee);
                            } else {
                                statee = replacing(schemaImage, data);
                                setSchemaImage(statee);
                            }
                        } else {
                            typee === 'normal'
                                ? setNormalImage([
                                      ...normalImage,
                                      {
                                          image: data.data.mediumImg,
                                          id: data.data.id,
                                          main: false,
                                          big: data.data.bigImg,
                                          small: data.data.smallImg,
                                      },
                                  ])
                                : typee === 'usage'
                                ? setUsageImage([
                                      ...usageImage,
                                      {
                                          image: data.data.mediumImg,
                                          id: data.data.id,
                                          big: data.data.bigImg,
                                          small: data.data.smallImg,
                                      },
                                  ])
                                : setSchemaImage([
                                      ...schemaImage,
                                      {
                                          image: data.data.mediumImg,
                                          id: data.data.id,
                                          big: data.data.bigImg,
                                          small: data.data.smallImg,
                                      },
                                  ]);
                        }
                    }
                }
            );
        }
    };
    const deleteImage = (typee, id) => {
        const deleting = (type) => {
            var tempo = type;
            return tempo.filter((temp) => temp.id !== id);
        };

        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/items/${id}`,
                notifyMessage: 'surat pozulýar',
                updateMessage: 'Surat pozuldy',
            },
            (data) => {
                fetchAdminById();
                if (typee === 'normal') {
                    var statee = deleting(normalImage);
                    setNormalImage(statee);
                } else if (typee === 'usage') {
                    statee = deleting(usageImage);
                    setUsageImage(statee);
                } else {
                    statee = deleting(schemaImage);
                    setSchemaImage(statee);
                }
            }
        );
    };
    //handle image preview
    const handleImagePreview = (images, i) => {
        let imgs = images.map((img) => {
            return {
                bigImg: img.big,
                smallImg: img.small,
            };
        });
        if (imgs.length) {
            setProductImages(imgs);
            setCardImagesIndex(i);
            setIsProductImageModalOpen(true);
        }
    };

    const imagesSection = (type, header, typeImages) => {
        return (
            <div className="sections">
                <span className="image-header"> {header} </span>
                <div className="image-all">
                    {typeImages.map((image, index) => {
                        return (
                            <div className="image-hover" key={image.id}>
                                {type === 'normal' && image?.main ? (
                                    <BsStarFill className="main-star" />
                                ) : null}
                                <img
                                    alt={image.image}
                                    src={`${BACKEND_URL}/images/items/${image.image}`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = brokenImage;
                                    }}
                                />
                                <div className="edit-hover">
                                    <div className="hover-buttons">
                                        {authorization[
                                            decodedToken.role
                                        ].includes('uploadProductImage') ? (
                                            <>
                                                <div className="edit-icon-hover">
                                                    <input
                                                        className="image-replace-input"
                                                        key={image.id}
                                                        type="file"
                                                        accept=".jpg,.jpeg,.png"
                                                        onChange={(e) =>
                                                            imageSelect(
                                                                e,
                                                                type,
                                                                image.id
                                                            )
                                                        }
                                                    />
                                                </div>
                                                {type === 'normal' ? (
                                                    <div
                                                        className="edit-icon-hover"
                                                        onClick={() =>
                                                            onMakeMainClick(
                                                                image.id
                                                            )
                                                        }
                                                    >
                                                        <BsStarFill className="edit-icon" />
                                                    </div>
                                                ) : null}
                                                <div
                                                    className="edit-icon-hover"
                                                    onClick={() =>
                                                        deleteImage(
                                                            type,
                                                            image.id
                                                        )
                                                    }
                                                >
                                                    <BsTrashFill className="edit-icon" />
                                                </div>
                                            </>
                                        ) : null}
                                        <div
                                            className="preview-icon-hover"
                                            onClick={() =>
                                                handleImagePreview(
                                                    typeImages,
                                                    index
                                                )
                                            }
                                        >
                                            <MdZoomOutMap className="edit-icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {typeImages.length > 4 ? null : (
                        <div className="add-image">
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => imageSelect(e, type, -1)}
                                style={{ display: 'none' }}
                                ref={
                                    type === 'normal'
                                        ? normal
                                        : type === 'usage'
                                        ? usage
                                        : schema
                                }
                                onClick={(e) => (e.target.value = null)}
                            />
                            <Button
                                onClick={(event) =>
                                    addImageClickReferencing(type)
                                }
                                disabled={
                                    authorization[decodedToken.role].includes(
                                        'uploadProductImage'
                                    )
                                        ? false
                                        : true
                                }
                            >
                                <MdAddAPhoto />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    };
    return (
        <TabContainer>
            <div className="product-tab5-images">
                {imagesSection('normal', 'Esasy suratlar', normalImage)}
                {imagesSection('usage', 'Ulanysdaky suratlar', usageImage)}
                {imagesSection('schema', 'Shema suratlar', schemaImage)}
            </div>
        </TabContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        productData: state.productData.productData,
        decodedToken: state.decodedToken.decodedToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProductImages: (images) => dispatch(setProductImages(images)),
        setIsProductImageModalOpen: (open) =>
            dispatch(setIsProductImageModalOpen(open)),
        setCardImagesIndex: (index) => dispatch(setCardImagesIndex(index)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTab5);
