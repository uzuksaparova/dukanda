import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import './cardImageModal.scss';
import brokenImage from '../../images/brokenImage.png';
import { BACKEND_URL } from '../../functions';
import { setIsProductImageModalOpen } from '../../redux/actions/productActions';
import { connect } from 'react-redux';

function CardImageModal(props) {
    const {
        isProductImageModalOpen,
        setIsProductImageModalOpen,
        productImages,
        cardImagesIndex,
    } = props;
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

    const useStyles = makeStyles(() => ({
        closeBtn: {
            color: 'white',
            backgroundColor: '#7f7f7f',
            fontSize: '2rem',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
        },

        carousel: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            width: '100%',
            height: '10%',
        },
        carouselItem: {
            margin: '0 0.7rem',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '60px',
            height: '60px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease-out',
            [theme.breakpoints.between('xs', '400')]: {
                width: '40px',
                height: '40px',
            },
        },
        carouselButton: {
            cursor: 'pointer',
            border: '0',
            margin: '0 0.7em',
            color: 'white',
            backgroundColor: '#b2b2b2',
            fontSize: '2rem',
            borderRadius: '5px',
            padding: '0.2rem 0.5rem',
        },
    }));

    const classes = useStyles();
    const [percent, setPercent] = useState(100);
    const handleZoom = (r, e) => {
        let stepEachScroll = parseInt(r.state.scale * 100);
        setPercent(stepEachScroll);
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardImageOffset, setCardImageOffset] = useState(0);
    const [productModalImages, setProductImages] = useState({
        big: [],
        small: [],
    });

    useEffect(() => {
        let big = [];
        let small = [];
        productImages.forEach((img, i) => {
            big.push(img['bigImg']);
            small.push(img['smallImg']);
        });
        let temp = { big: big, small: small };
        setProductImages(temp);
        setCurrentIndex(cardImagesIndex);
        // eslint-disable-next-line
    }, [productImages, cardImagesIndex]);

    let cardImageLimit = productImages.length < 10 ? productImages.length : 10;

    const getSubArrOfImages = (begin, end) => {
        const subArrImages = [];
        for (; begin < end; begin++) {
            subArrImages.push(productModalImages?.small[begin]);
        }
        return subArrImages;
    };

    if (matchesMd) {
        cardImageLimit = productImages.length < 5 ? productImages.length : 5;
    }
    if (matchesSm) {
        cardImageLimit = productImages.length < 3 ? productImages.length : 3;
    }

    const clickedImageHandler = (i) => {
        setCurrentIndex(i);
    };

    const isInTheInterval = (ind) => {
        if (ind >= cardImageOffset && ind < cardImageLimit + cardImageOffset)
            return true;
        return false;
    };

    const onPrev = () => {
        if (currentIndex - 1 >= 0) {
            if (!isInTheInterval(currentIndex - 1)) {
                setCardImageOffset(cardImageOffset - 1);
            }
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(productModalImages?.small.length - 1);
            setCardImageOffset(
                productModalImages?.small.length - cardImageLimit
            );
        }
    };

    const onNext = () => {
        if (currentIndex + 1 < productModalImages?.small.length) {
            if (!isInTheInterval(currentIndex + 1)) {
                setCardImageOffset(cardImageOffset + 1);
            }
            setCurrentIndex(currentIndex + 1);
        } else {
            setCardImageOffset(0);
            setCurrentIndex(0);
        }
    };

    const renderedImages = getSubArrOfImages(
        cardImageOffset,
        cardImageOffset + cardImageLimit
    ).map((image, i) => {
        let key = productModalImages?.small.indexOf(image);
        return (
            <div
                className={`${classes.carouselItem} gallery-item ${
                    key === currentIndex ? 'active' : ''
                }`}
                style={{
                    backgroundImage: `url(${BACKEND_URL}/images/items/${image})`,
                }}
                onClick={() => clickedImageHandler(key)}
                key={key}
            >
                <div className="over"></div>
            </div>
        );
    });

    return (
        <React.Fragment>
            <Modal
                open={isProductImageModalOpen}
                onClose={() => setIsProductImageModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="card-image-modal"
            >
                <div className="card-image-modal-div">
                    <div className="close-button">
                        <button
                            className={classes.closeBtn}
                            onClick={() => setIsProductImageModalOpen(false)}
                        >
                            &times;
                        </button>
                    </div>

                    <div className="image">
                        <TransformWrapper
                            defaultScale={1}
                            onZoom={handleZoom}
                            defaultPositionX={100}
                            defaultPositionY={200}
                        >
                            <TransformComponent>
                                {Object.keys(productModalImages).length && (
                                    <img
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = brokenImage;
                                        }}
                                        src={`${BACKEND_URL}/images/items/${productModalImages?.big[currentIndex]}`}
                                        alt="product"
                                    />
                                )}
                            </TransformComponent>
                        </TransformWrapper>
                        <span className="percent">{`${percent}%`}</span>
                    </div>
                    {productImages.length > 1 && (
                        <div className={classes.carousel}>
                            <button
                                className={classes.carouselButton}
                                onClick={onPrev}
                            >
                                &lang;
                            </button>
                            <div className="rendered-images">
                                {renderedImages}
                            </div>
                            <button
                                className={classes.carouselButton}
                                onClick={onNext}
                            >
                                &rang;
                            </button>
                        </div>
                    )}
                </div>
            </Modal>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        isProductImageModalOpen:
            state.isProductImageModalOpen.isProductImageModalOpen,
        productImages: state.productImages.productImages,
        cardImagesIndex: state.cardImagesIndex.cardImagesIndex,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsProductImageModalOpen: (open) =>
            dispatch(setIsProductImageModalOpen(open)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardImageModal);
