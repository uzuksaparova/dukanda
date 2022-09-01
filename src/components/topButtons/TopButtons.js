import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './topButtons.scss';
import { Tooltip } from '@mui/material';
import * as authorizationn from '../authorization.json';
import { connect } from 'react-redux';
const authorization = authorizationn.default;

function TopButtons(props) {
    const {
        disabledValue,
        handleSaveButton,
        handleResetButton,
        cancelPath,
        sync,
        syncAll,
        handleSyncClick,
        handleSyncAllClick,
        decodedToken,
        resetEnable = false,
        syncAllQuick = false,
    } = props;

    return (
        <div className="top-buttons">
            {handleSaveButton ? (
                <Button
                    disabled={
                        !authorization[decodedToken.role].includes(
                            disabledValue
                        )
                    }
                    onClick={handleSaveButton}
                    className="save-button every-button"
                >
                    Kaydet
                </Button>
            ) : null}
            {resetEnable ? (
                <Button
                    disabled={
                        !authorization[decodedToken.role].includes(
                            disabledValue
                        )
                    }
                    onClick={handleResetButton}
                    className="cancel-button every-button"
                >
                    Sıfırla
                </Button>
            ) : null}
            {cancelPath ? (
                <Button
                    disabled={
                        !authorization[decodedToken.role].includes(
                            disabledValue
                        )
                    }
                    component={Link}
                    to={cancelPath}
                    className="cancel-button every-button"
                >
                    Iptal
                </Button>
            ) : null}
            {sync ? (
                <Tooltip title='Maglumaty "Tigerdan" täzele'>
                    <Button
                        disabled={
                            !authorization[decodedToken.role].includes(
                                disabledValue
                            )
                        }
                        onClick={handleSyncClick}
                        className="save-button every-button"
                    >
                        Güncelle
                    </Button>
                </Tooltip>
            ) : null}
            {syncAll ? (
                <Tooltip title='Ähli maglumatlary "Tigerdan" täzele'>
                    <Button
                        disabled={
                            !authorization[decodedToken.role].includes(
                                'syncAll'
                            )
                        }
                        onClick={() => handleSyncAllClick(false)}
                        className="save-button every-button sync-all-button"
                    >
                        Ählisini sinhronla
                    </Button>
                </Tooltip>
            ) : null}
            {syncAllQuick ? (
                <Tooltip title='Ähli maglumatlary çalt "Tigerdan" täzele'>
                    <Button
                        disabled={
                            !authorization[decodedToken.role].includes(
                                disabledValue
                            )
                        }
                        onClick={() => handleSyncAllClick(true)}
                        className="save-button every-button sync-all-button"
                    >
                        Ählisini çalt sinhronla
                    </Button>
                </Tooltip>
            ) : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        decodedToken: state.decodedToken.decodedToken,
    };
};
export default connect(mapStateToProps)(TopButtons);
