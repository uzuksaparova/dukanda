import React, { useRef } from 'react';
import { setProductData } from '../../../../../redux/actions/productActions';
import { Player } from 'video-react';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import {
    BACKEND_URL,
    deleteForAdmin,
    fetchForAdminWithUpdateToast,
} from '../../../../../functions';
import Cookies from 'js-cookie';
import * as authorizationn from '../../../../authorization.json';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import './productTab6.scss';

function ProductTab6(props) {
    const { TabContainer, productData, setProductData, decodedToken } = props;
    const videoInput = useRef(null);
    var token = Cookies.get('admin_token');
    var bearer = 'Bearer ' + token;
    const authorization = authorizationn.default;

    // when edit clicked triggers the file input to change video

    const addVideoClickReferencing = () => {
        videoInput.current.click();
    };

    const handleVideoAdd = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('video', file);

            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/items/video/${productData.id}`,
                    body: formData,
                    headers: {
                        Authorization: bearer,
                    },
                    notifyMessage: 'Video Ýüklenilýär ...',
                    updateMessage: 'Video Ýüklendi',
                },
                (data) => {
                    if (data !== 'err') {
                        setProductData({
                            ...productData,
                            video: data.data.video,
                        });
                    }
                }
            );
        }
    };

    const handleDeleteVideo = () => {
        deleteForAdmin(
            {
                url: `${BACKEND_URL}/admin/items/video/${productData.id}`,
                notifyMessage: 'Wideo pozulýar...',
                updateMessage: 'Wideo pozuldy',
            },
            (data) => {
                setProductData({ ...productData, video: null });
            }
        );
    };
    return (
        <TabContainer>
            <div className="video-container">
                {productData.video ? (
                    <Player
                        playsInline
                        src={`${BACKEND_URL}/videos/items/${productData.video}`}
                        style={{ width: '500px', height: '500px' }}
                    />
                ) : (
                    <div className="add-video">
                        <input
                            type="file"
                            accept="video/mp4"
                            onChange={(e) => handleVideoAdd(e)}
                            style={{ display: 'none' }}
                            ref={videoInput}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <Button
                            onClick={addVideoClickReferencing}
                            disabled={
                                authorization[decodedToken.role].includes(
                                    'uploadProductVideo'
                                )
                                    ? false
                                    : true
                            }
                        >
                            <AiOutlineVideoCameraAdd />
                        </Button>
                    </div>
                )}
                <div className="icon-buttons">
                    <div className="group-image-edit">
                        <input
                            type="file"
                            accept="video/mp4"
                            onChange={(e) => handleVideoAdd(e)}
                            ref={videoInput}
                            onClick={(e) => (e.target.value = null)}
                            className="image-replace-input"
                            disabled={
                                authorization[decodedToken.role].includes(
                                    'uploadProductVideo'
                                )
                                    ? false
                                    : true
                            }
                        />
                    </div>
                    <Button
                        className="icon-delete-button icon-button"
                        variant="outlined"
                        onClick={handleDeleteVideo}
                        disabled={
                            authorization[decodedToken.role].includes(
                                'uploadProductVideo'
                            )
                                ? false
                                : true
                        }
                    >
                        Poz
                    </Button>
                </div>
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
        setProductData: (data) => dispatch(setProductData(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTab6);
