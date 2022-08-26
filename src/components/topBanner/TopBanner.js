import React from 'react';
import { AiOutlineBgColors, AiOutlineInteraction } from 'react-icons/ai';
import { BiRename } from 'react-icons/bi';
import { MdDateRange, MdLowPriority } from 'react-icons/md';
import './topBanner.scss';
import Button from '@material-ui/core/Button';
import { BsTrashFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import defaultImage from '../../../images/default.png';
import brokenImage from '../../../images/brokenImage.png';
import {
    BACKEND_URL,
    bannerRow,
    handleBannerDeleteButton,
} from '../../../functions';
import { connect } from 'react-redux';
import * as authorizationn from '../../authorization.json';

const authorization = authorizationn.default;

function TopBanner(props) {
    const { decodedToken, bannerItem } = props;

    return (
        <div className="top-banner-item">
            <div className="top">
                {bannerItem?.image ? (
                    <img
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = brokenImage;
                        }}
                        src={`${BACKEND_URL}/images/banners/${bannerItem?.image}`}
                        alt="banner"
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
            <div className="bottom">
                {bannerRow(
                    <BiRename className="top-banner-bottom-icon" />,
                    'Ady :',
                    bannerItem.name
                )}
                {bannerRow(
                    <MdLowPriority className="top-banner-bottom-icon" />,
                    'Öňdeligi :',
                    bannerItem.priority
                )}
                {bannerRow(
                    <MdDateRange className="top-banner-bottom-icon" />,
                    'Başlaýan wagty :',
                    bannerItem.startDate
                )}
                {bannerRow(
                    <MdDateRange className="top-banner-bottom-icon" />,
                    'Gutarýan wagty :',
                    bannerItem.endDate
                )}
                {bannerRow(
                    <AiOutlineInteraction className="top-banner-bottom-icon" />,
                    'Hereket görnüşi :',
                    bannerItem.actionType === 'news'
                        ? 'Habar'
                        : bannerItem.actionType === 'smartSection'
                        ? 'Akylly bölüm'
                        : bannerItem.actionType === 'link'
                        ? 'Link'
                        : 'Harytlar'
                )}
                {bannerRow(
                    <AiOutlineBgColors className="top-banner-bottom-icon" />,
                    'Arka fon reňki :',
                    <div
                        className="color"
                        style={{
                            backgroundColor: `${bannerItem.color}`,
                        }}
                    ></div>
                )}

                <div className="top-banner-buttons">
                    <Button
                        component={Link}
                        to={{
                            pathname: `/banners/top/${bannerItem.id}`,
                        }}
                        className="one-button"
                    >
                        <MdEdit />
                    </Button>
                    <Button
                        onClick={(e) => handleBannerDeleteButton(bannerItem.id)}
                        disabled={
                            authorization[decodedToken.role].includes(
                                'updateBanner'
                            )
                                ? false
                                : true
                        }
                    >
                        <BsTrashFill />
                    </Button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isError: state.isError.isError,
        decodedToken: state.decodedToken.decodedToken,
    };
};

export default connect(mapStateToProps)(TopBanner);
