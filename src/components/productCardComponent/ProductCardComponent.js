import React from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../functions';
import brokenImage from '../../images/brokenImage.png';
import defaultImage from '../../images/default.png';
import './productCardComponent.scss';
import { BiRename } from 'react-icons/bi';
import { AiOutlineBarcode, AiOutlineSlack } from 'react-icons/ai';
import { connect } from 'react-redux';
import {
    setIsProductImageModalOpen,
    setProductImages,
} from '../../redux/actions/productActions';

function ProductCardComponent(props) {
    const { card, setIsProductImageModalOpen, setProductImages } = props;

    const oneRow = (icon, name, value) => {
        return (
            <div className="one-line">
                <div className="row-left">
                    {icon}
                    <span className="key-names">{name} :</span>
                </div>
                <span className="row-right">{value}</span>
            </div>
        );
    };
    const handleImagePreview = (e, images) => {
        e.stopPropagation();
        setProductImages(images);
        setIsProductImageModalOpen(true);
    };
    return (
        <Box className="checkbox-card">
            <div className="card-component">
                <Button
                    className="external-link"
                    component={Link}
                    to={`/products/${card.id}`}
                >
                    <FiExternalLink />
                </Button>
                <div className="left">
                    {card?.images?.length ? (
                        <img
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = brokenImage;
                            }}
                            src={`${BACKEND_URL}/images/items/${card.images[0].mediumImg}`}
                            alt="doorhandle"
                            className="card-medium-photo"
                            onClick={(e) => handleImagePreview(e, card.images)}
                        />
                    ) : (
                        <img
                            src={defaultImage}
                            alt="doorhandle"
                            className="card-medium-photo"
                        />
                    )}
                    <div className="statuses">
                        <div
                            className="paretto"
                            style={{
                                backgroundColor: `${
                                    card.paretto === 'best'
                                        ? 'rgba(0, 135, 107, 0.8)'
                                        : card.paretto === 'middle'
                                        ? 'rgba(0, 120, 223, 0.8)'
                                        : 'rgba(255, 0, 26, 0.8)'
                                }`,
                            }}
                        >
                            <span>
                                {card.paretto === 'best'
                                    ? 'çok satan'
                                    : card.paretto === 'middle'
                                    ? 'orta satan'
                                    : 'az satan'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="right">
                    {oneRow(<BiRename />, 'Haryt Ady', card.name)}
                    {oneRow(<AiOutlineBarcode />, 'Haryt Kody', card.code)}
                    {oneRow(
                        <AiOutlineSlack />,
                        'Aktiwlylyk',
                        card.active ? 'Aktiw' : 'Passiw'
                    )}
                </div>
            </div>
        </Box>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProductImages: (images) => dispatch(setProductImages(images)),
        setIsProductImageModalOpen: (open) =>
            dispatch(setIsProductImageModalOpen(open)),
    };
};

export default connect(null, mapDispatchToProps)(ProductCardComponent);
