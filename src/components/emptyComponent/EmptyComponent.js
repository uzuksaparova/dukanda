import React from 'react';
import emptyImage from '../../images/emptyy.png';

function EmptyComponent() {
    return (
        <div className="error-picture">
            <img src={emptyImage} alt="emptyImage" className="error-picture" />{' '}
        </div>
    );
}

export default EmptyComponent;
