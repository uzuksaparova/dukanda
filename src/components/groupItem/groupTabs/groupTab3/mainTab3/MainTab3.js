import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import { AiFillTags, AiOutlineQrcode } from 'react-icons/ai';
import defaultImage from '../../../../../images/default.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Typography } from '@mui/material';
import brokenImage from '../../../../../images/brokenImage.png';
import { BACKEND_URL } from '../../../../../functions';
import './mainTab3.scss';

function MainTab3(props) {
    const { fetchTab3Data, tab3Data, tab3SendInfo } = props;
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = brokenImage;
    };
    return (
        <div className="main-tab3-last-groups" id="last-groups">
            <InfiniteScroll
                dataLength={tab3Data.data.length}
                next={fetchTab3Data}
                scrollableTarget="last-groups"
                hasMore={tab3SendInfo.isEnd}
                loader={
                    <p
                        style={{
                            textAlign: 'center',
                            opacity: '0.5',
                        }}
                    >
                        Ýüklenilýär...
                    </p>
                }
                endMessage={
                    <p
                        style={{
                            textAlign: 'center',
                            opacity: '0.5',
                        }}
                    >
                        Şulardan ybarat
                    </p>
                }
            >
                <div className="subgroups-scroll">
                    {tab3Data.data?.map((group, i) => {
                        return (
                            <Card
                                key={i}
                                sx={{
                                    display: 'flex',
                                    margin: '10px',
                                    width: '340px',
                                    height: '100px',
                                }}
                                component={Link}
                                to={`/groups/subgroups/${group.id}`}
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
                                            {group.name}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            component="div"
                                            className="typographies"
                                        >
                                            <AiOutlineQrcode className="icon" />
                                            {group.code}
                                        </Typography>
                                    </CardContent>
                                </Box>
                                <CardMedia
                                    component="img"
                                    onError={handleImageError}
                                    sx={{
                                        width: 140,
                                        height: '100px',
                                        objectFit: 'cover',
                                    }}
                                    image={
                                        group.image
                                            ? `${BACKEND_URL}/images/groups/${group.image}`
                                            : defaultImage
                                    }
                                    alt="Live from space album cover"
                                />
                            </Card>
                        );
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default MainTab3;
