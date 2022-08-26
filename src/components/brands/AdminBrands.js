import React, { useEffect } from 'react';
import './adminBrands.scss';
import Loading from '../Loading';
import defaultImage from '../../images/default.png';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FaBoxOpen } from 'react-icons/fa';
import { AiFillTags, AiOutlineQrcode } from 'react-icons/ai';
import brokenImage from '../../images/brokenImage.png';
import { BACKEND_URL, fetchBrandsInfo } from '../../functions';
import { connect } from 'react-redux';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';

const AdminBrands = (props) => {
    const { brandsData, isSidebarOpen, isError } = props;
    const { data, noData, isEnd } = brandsData;

    useEffect(() => {
        !data.length && fetchBrandsInfo(true);
        // eslint-disable-next-line
    }, []);
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = brokenImage;
    };

    return (
        <div
            className={`brands ${isSidebarOpen ? 'sidebar-open' : ''}`}
            id="brands"
        >
            {!data.length ? (
                isError ? (
                    <ErrorComponent />
                ) : noData ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : (
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchBrandsInfo}
                    scrollableTarget="brands"
                    hasMore={!isEnd}
                    loader={
                        <p style={{ textAlign: 'center', opacity: '0.5' }}>
                            Ýüklenilýär...
                        </p>
                    }
                    endMessage={
                        <p style={{ textAlign: 'center', opacity: '0.5' }}>
                            Şulardan ybarat
                        </p>
                    }
                >
                    <div className="cards">
                        {data?.map((brand, i) => {
                            return (
                                <Card
                                    key={brand.id}
                                    sx={{
                                        display: 'flex',
                                        margin: '10px',
                                        width: '340px',
                                        height: '100px',
                                    }}
                                    component={Link}
                                    to={`/brands/${brand.id}`}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                flex: '1 0 auto',
                                                width: '180px',
                                            }}
                                        >
                                            <Typography
                                                component="div"
                                                variant="subtitle1"
                                                className="typographies"
                                            >
                                                <AiFillTags className="icon" />
                                                {brand.name}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                component="div"
                                                className="typographies"
                                            >
                                                <AiOutlineQrcode className="icon" />

                                                {brand.code}
                                            </Typography>
                                            {brand.product_count ? (
                                                <Typography
                                                    variant="body1"
                                                    color="text.tertiary"
                                                    component="div"
                                                    className="typographies"
                                                >
                                                    <FaBoxOpen className="icon" />
                                                    {brand.product_count}
                                                </Typography>
                                            ) : null}
                                        </CardContent>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: 140,
                                            height: '100px',
                                            objectFit: 'cover',
                                        }}
                                        onError={handleImageError}
                                        image={
                                            brand.image
                                                ? `${BACKEND_URL}/images/brands/${brand.image}`
                                                : defaultImage
                                        }
                                        alt="Live from space album cover"
                                    />
                                </Card>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        brandsData: state.brandsData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
        isError: state.isError.isError,
    };
};

export default connect(mapStateToProps)(AdminBrands);
