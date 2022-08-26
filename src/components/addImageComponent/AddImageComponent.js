import React from 'react';
import './addImageComponent.scss';
import { BACKEND_URL } from '../../functions';
import brokenImage from '../../images/brokenImage.png';
import { MdAddAPhoto } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import * as authorizationn from '../authorization.json';
import { connect } from 'react-redux';
const authorization = authorizationn.default;

function AddImageComponent(props) {
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
        <div className="image-div">
            {imageObj.image || imageObj.send ? (
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
            ) : (
                <div className="add-image">
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.tiff,.svg"
                        onChange={(e) => handleImageChange(e)}
                        style={{ display: 'none' }}
                        ref={imageRef}
                        onClick={(e) => (e.target.value = null)}
                    />
                    <Button onClick={handleButtonClick}>
                        <MdAddAPhoto />
                    </Button>
                </div>
            )}
            <div className="icon-buttons">
                <div className="image-edit">
                    <input
                        className="image-replace-input"
                        type="file"
                        accept=".jpg,.jpeg,.png,.tiff,.svg"
                        onChange={(e) => handleImageChange(e)}
                    />
                </div>
                <Button
                    className="icon-delete-button icon-button"
                    variant="outlined"
                    onClick={handleImageDeletion}
                    disabled={
                        authorization[decodedToken.role].includes(disabledValue)
                            ? false
                            : true
                    }
                >
                    Poz
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        decodedToken: state.decodedToken.decodedToken,
    };
};
export default connect(mapStateToProps)(AddImageComponent);
