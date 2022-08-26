import React from 'react';
import defaultImage from '../../../images/default.png';
import { Chip } from '@material-ui/core';
import { BACKEND_URL, handleProductDelete } from '../../../functions';
import brokenImage from '../../../images/brokenImage.png';
import './productChip.scss';

function ProductChip({ item }) {
    return (
        <div className="product-chip">
            <Chip
                key={item.id}
                className="chip"
                variant="contained"
                color="secondary"
                label={
                    <div className="product-chip-inside">
                        <div className="product-image">
                            {item?.image ? (
                                <img
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = brokenImage;
                                    }}
                                    src={`${BACKEND_URL}/images/items/${item.image}`}
                                    alt="doorhandle"
                                    className="card-medium-photo"
                                />
                            ) : (
                                <img
                                    src={defaultImage}
                                    alt="doorhandle"
                                    className="card-medium-photo"
                                />
                            )}
                        </div>
                        <div className="product-info">
                            <div className="name">{item.name}</div>
                            <div className="code">{item.code}</div>
                        </div>
                    </div>
                }
                onDelete={() => handleProductDelete(item.id)}
            />
        </div>
    );
}

export default ProductChip;
