import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.scss';
import Cookies from 'js-cookie';
import {
    BACKEND_URL,
    fetchForAdminWithUpdateToast,
    notification,
    newLocation,
} from '../../functions';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { setDecodedToken } from '../../redux/actions/signInActions';
import { IconButton } from '@mui/material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import qrLogo from '../../images/dukanda_logoo.svg';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: 'unset',
        height: 'unset',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Signin({ setDecodedToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    //checks the admin name and password
    const checkNameAndPassword = (e) => {
        e.name === 'username' ? setUsername(e.value) : setPassword(e.value);
    };

    //handles the submissions checks the name and password
    const onSubmitClick = () => {
        if (username === '' || password === '') {
            notification('Adynyzy yada parolynyzy doldurun');
        } else {
            let bodySend =
                process.env.NODE_ENV === 'production'
                    ? JSON.stringify({
                          password: password,
                          userName: username,
                          program: 'web',
                      })
                    : JSON.stringify({
                          password: password,
                          userName: username,
                          program: 'web',
                          longitude: 45.5,
                          latitude: 12.3,
                      });
            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/employees/login`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: bodySend,
                    notifyMessage: 'Girilyar..',
                    updateMessage: 'Success',
                },
                (data) => {
                    if (data !== 'err') {
                        var decoded = jwt_decode(data.token);
                        // var expDate = new Date(decoded.exp * 1000);
                        setDecodedToken(decoded);
                        Cookies.set('admin_token', data.token, { expires: 1 });
                        localStorage.setItem('full_name', data.fullName);
                        localStorage.setItem('image', data.image);
                        if (Object.keys(data).length) {
                            newLocation('/welcomePage');
                        }
                    }
                }
            );
        }
    };

    //handles enter button click
    const handleKeypress = (e) => {
        if (e.charCode === 13) {
            onSubmitClick();
        }
    };

    useEffect(() => {
        Cookies.remove('admin_token');
        // eslint-disable-next-line
    }, []);

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar
                    className={classes.avatar}
                    alt="qr logo"
                    src={qrLogo}
                    variant="square"
                />

                {/* <Typography component="h1" variant="h5">
                    Giriş
                </Typography> */}
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Ulanyjy ady"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => checkNameAndPassword(e.target)}
                        onKeyPress={(e) => handleKeypress(e)}
                    />
                    <div className="password">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Açar sözi"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => checkNameAndPassword(e.target)}
                            onKeyPress={(e) => handleKeypress(e)}
                        />
                        <IconButton
                            onClick={() =>
                                setShowPassword(showPassword ? false : true)
                            }
                            className="password-eye"
                        >
                            {showPassword ? (
                                <AiFillEyeInvisible />
                            ) : (
                                <AiFillEye />
                            )}
                        </IconButton>
                    </div>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSubmitClick}
                    >
                        Giriş
                    </Button>
                </form>
                <ToastContainer position="bottom-right" />
            </div>
        </Container>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        setDecodedToken: (token) => dispatch(setDecodedToken(token)),
    };
};

export default connect(null, mapDispatchToProps)(Signin);
