import React, { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import './addItemComponent.scss';
import * as authorizationn from '../authorization.json';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
const authorization = authorizationn.default;

function AddItemComponent(props) {
    const useeLocation = useLocation();
    const [pathUrl, setPathUrl] = useState('');
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });
    const {
        disabledValue,
        onClickHandler,
        pathname = pathUrl,
        decodedToken,
    } = props;

    useEffect(() => {
        setPathUrl(useeLocation.pathname);
    }, [useeLocation]);
    const divisionTimelineAddButtonStyle = {
        position: 'absolute',
        bottom: isMobileScreen ? '20px' : '50px',
        right: isMobileScreen ? '20px' : '50px',
    };
    return (
        <div
            className="add-button"
            style={
                useeLocation.pathname.includes('divisions')
                    ? divisionTimelineAddButtonStyle
                    : {}
            }
        >
            <Button
                component={Link}
                disabled={
                    disabledValue
                        ? authorization[decodedToken.role].includes(
                              disabledValue
                          )
                            ? false
                            : true
                        : false
                }
                onClick={onClickHandler}
                to={{
                    pathname,
                }}
            >
                <MdAddCircleOutline />
            </Button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        decodedToken: state.decodedToken.decodedToken,
    };
};
export default connect(mapStateToProps)(AddItemComponent);
