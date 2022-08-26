import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Formik } from 'formik';
import { object, ref, string } from 'yup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Loading from '../Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './profileChangePassword.scss';
import { BACKEND_URL, fetchForAdminWithUpdateToast } from '../../functions';
import { IconButton } from '@mui/material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 'none',
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export default function ProfileChangePassword(props) {
    const { isPasswordChangeOpen, setIsPasswordChangeOpen } = props;
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        rewrite: false,
    });
    const handleClose = () => setIsPasswordChangeOpen(false);

    const handleSubmit = ({
        currentPass,
        newPass,
        confirmPass,
        setSubmitting,
        resetForm,
    }) => {
        // fake async login
        setTimeout(async () => {
            setSubmitting(false);
            fetchForAdminWithUpdateToast(
                {
                    url: `${BACKEND_URL}/admin/employees/password`,
                    method: 'PATCH',
                    body: JSON.stringify({
                        oldPassword: currentPass,
                        newPassword: newPass,
                    }),
                    notifyMessage: ' Parol uytgedilyar',
                    updateMessage: 'Parol uytgedildi',
                },
                (data) => {
                    resetForm();
                    // setIsPasswordChangeOpen(false);
                }
            );
        }, 1000);
    };

    return (
        <div className="profile-change-password">
            <Modal
                open={isPasswordChangeOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style}>
                        <Formik
                            initialValues={{
                                currentPass: '',
                                newPass: '',
                                confirmPass: '',
                            }}
                            validationSchema={object().shape({
                                currentPass: string().required(
                                    'hazirki paroly girizin'
                                ),
                                newPass: string().required(
                                    'taze paroly girizin'
                                ),
                                confirmPass: string()
                                    .oneOf(
                                        [ref('newPass')],
                                        'Parollar den gelenok'
                                    )
                                    .required('paroly girizin'),
                            })}
                            onSubmit={(
                                { currentPass, newPass, confirmPass },
                                { setSubmitting, resetForm }
                            ) =>
                                handleSubmit({
                                    currentPass,
                                    newPass,
                                    confirmPass,
                                    setSubmitting,
                                    resetForm,
                                })
                            }
                            render={(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isValid,
                                    isSubmitting,
                                } = props;
                                return isSubmitting ? (
                                    <Loading />
                                ) : (
                                    <div className="password-change">
                                        <form
                                            className="form"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="password">
                                                <FormControl
                                                    fullWidth
                                                    margin="dense"
                                                >
                                                    <InputLabel
                                                        htmlFor="password-current"
                                                        error={Boolean(
                                                            touched.currentPass &&
                                                                errors.currentPass
                                                        )}
                                                    >
                                                        {'Häzirki parol'}
                                                    </InputLabel>
                                                    <Input
                                                        variant="outlined"
                                                        id="password-current"
                                                        name="currentPass"
                                                        type={
                                                            showPassword.current
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        value={
                                                            values.currentPass
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(
                                                            touched.currentPass &&
                                                                errors.currentPass
                                                        )}
                                                    />
                                                    <FormHelperText
                                                        error={Boolean(
                                                            touched.currentPass &&
                                                                errors.currentPass
                                                        )}
                                                    >
                                                        {touched.currentPass &&
                                                        errors.currentPass
                                                            ? errors.currentPass
                                                            : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword({
                                                            ...showPassword,
                                                            current:
                                                                !showPassword.current,
                                                        })
                                                    }
                                                    className="password-eye"
                                                >
                                                    {showPassword.current ? (
                                                        <AiFillEyeInvisible />
                                                    ) : (
                                                        <AiFillEye />
                                                    )}
                                                </IconButton>
                                            </div>
                                            <div className="password">
                                                <FormControl
                                                    fullWidth
                                                    margin="dense"
                                                    error={Boolean(
                                                        touched.newPass &&
                                                            errors.newPass
                                                    )}
                                                >
                                                    <InputLabel
                                                        htmlFor="password-new"
                                                        error={Boolean(
                                                            touched.newPass &&
                                                                errors.newPass
                                                        )}
                                                    >
                                                        {'Täze parol'}
                                                    </InputLabel>
                                                    <Input
                                                        variant="outlined"
                                                        id="password-new"
                                                        name="newPass"
                                                        type={
                                                            showPassword.new
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        value={values.newPass}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(
                                                            touched.newPass &&
                                                                errors.newPass
                                                        )}
                                                    />
                                                    <FormHelperText
                                                        error={Boolean(
                                                            touched.newPass &&
                                                                errors.newPass
                                                        )}
                                                    >
                                                        {touched.newPass &&
                                                        errors.newPass
                                                            ? errors.newPass
                                                            : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword({
                                                            ...showPassword,
                                                            new: !showPassword.new,
                                                        })
                                                    }
                                                    className="password-eye"
                                                >
                                                    {showPassword.new ? (
                                                        <AiFillEyeInvisible />
                                                    ) : (
                                                        <AiFillEye />
                                                    )}
                                                </IconButton>
                                            </div>
                                            <div className="password">
                                                <FormControl
                                                    fullWidth
                                                    margin="dense"
                                                    error={Boolean(
                                                        touched.confirmPass &&
                                                            errors.confirmPass
                                                    )}
                                                >
                                                    <InputLabel
                                                        htmlFor="password-confirm"
                                                        error={Boolean(
                                                            touched.confirmPass &&
                                                                errors.confirmPass
                                                        )}
                                                    >
                                                        {'Paroly tassykla'}
                                                    </InputLabel>
                                                    <Input
                                                        variant="outlined"
                                                        id="password-confirm"
                                                        name="confirmPass"
                                                        type={
                                                            showPassword.rewrite
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        value={
                                                            values.confirmPass
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(
                                                            touched.confirmPass &&
                                                                errors.confirmPass
                                                        )}
                                                    />
                                                    <FormHelperText
                                                        error={Boolean(
                                                            touched.confirmPass &&
                                                                errors.confirmPass
                                                        )}
                                                    >
                                                        {touched.confirmPass &&
                                                        errors.confirmPass
                                                            ? errors.confirmPass
                                                            : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword({
                                                            ...showPassword,
                                                            rewrite:
                                                                !showPassword.rewrite,
                                                        })
                                                    }
                                                    className="password-eye"
                                                >
                                                    {showPassword.rewrite ? (
                                                        <AiFillEyeInvisible />
                                                    ) : (
                                                        <AiFillEye />
                                                    )}
                                                </IconButton>
                                            </div>
                                            <Button
                                                type="submit"
                                                variant="raised"
                                                color="primary"
                                                disabled={Boolean(
                                                    !isValid || isSubmitting
                                                )}
                                                style={{ margin: '16px' }}
                                            >
                                                {'Paroly täzele'}
                                            </Button>
                                        </form>
                                    </div>
                                );
                            }}
                        />
                    </Box>
                    <ToastContainer
                        position="bottom-right"
                        progressClassName="toastProgressCard"
                    />
                </>
            </Modal>
        </div>
    );
}
