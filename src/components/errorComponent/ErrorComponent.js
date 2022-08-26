import React from 'react';
import errorPicture from '../../images/error.svg';

function ErrorComponent() {
    return (
        <div className="error-picture">
            <img
                src={errorPicture}
                alt="errorPicture"
                className="error-picture"
            />
        </div>
    );
}

export default ErrorComponent;
