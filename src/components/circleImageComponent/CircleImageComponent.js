import React from 'react';
import { BACKEND_URL } from '../../functions';
import brokenImage from '../../images/brokenImage.png';
import { MdAddAPhoto } from 'react-icons/md';
import { BsTrashFill } from 'react-icons/bs';
import Button from '@material-ui/core/Button';
import './circleImageComponent.scss';
import * as authorizationn from '../authorization.json';
import { connect } from 'react-redux';
const authorization = authorizationn.default;

function CircleImageComponent(props) {
    const {
        imageObj,
        handleImageChange,
        handleImageDeletion,
        handleButtonClick,
        disabledValue,
        imageRef,
        type,
        decodedToken,
    } = props;
    return (
        <div className="circle-image">
            {imageObj.image || imageObj.send ? (
                <div className="image-container">
                    <div className="image">
                        <img
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = brokenImage;
                            }}
                            src={
                                !imageObj.local
                                    ? `${BACKEND_URL}/images/${type}/${imageObj.image}`
                                    : imageObj.send
                            }
                            alt="doorhandle"
                        />
                    </div>
                    <div className="edit-hover">
                        <div className="edit-icon-hover">
                            <input
                                className="image-replace-input"
                                type="file"
                                accept=".jpg,.png,.jpeg,.tiff"
                                onChange={(e) => handleImageChange(e)}
                            />
                        </div>
                        <div
                            className="edit-icon-hover"
                            onClick={handleImageDeletion}
                        >
                            <BsTrashFill className="edit-icon" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="add-image">
                    <input
                        type="file"
                        accept=".jpg,.png,.jpeg,.tiff"
                        onChange={(e) => handleImageChange(e)}
                        style={{ display: 'none' }}
                        ref={imageRef}
                        onClick={(e) => (e.target.value = null)}
                    />
                    <Button
                        disabled={
                            authorization[decodedToken.role].includes(
                                disabledValue
                            )
                                ? false
                                : true
                        }
                        onClick={handleButtonClick}
                    >
                        <MdAddAPhoto />
                    </Button>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        decodedToken: state.decodedToken.decodedToken,
    };
};
export default connect(mapStateToProps)(CircleImageComponent);
