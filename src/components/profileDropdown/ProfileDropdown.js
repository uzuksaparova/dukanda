import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../../functions';
import { Link } from 'react-router-dom';
import ProfileChangePassword from '../profileChangePassword/ProfileChangePassword';
import { RiLockPasswordFill } from 'react-icons/ri';
import './profileDropdown.scss';

export default function ProfileDropdown() {
    const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);

    var full_name = localStorage.getItem('full_name');
    var image = localStorage.getItem('image');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function stringAvatar(name) {
        return {
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <div className="profile-box">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    margin: '0 !important',
                }}
            >
                <Tooltip title={full_name}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ margin: '0 !important' }}
                    >
                        {image !== 'null' ? (
                            <Avatar
                                alt={full_name}
                                src={`${BACKEND_URL}/images/employees/${image}`}
                            />
                        ) : (
                            <Avatar {...stringAvatar(full_name)} />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 30,
                            height: 30,
                            ml: -0.5,
                            // mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => setIsPasswordChangeOpen(true)}>
                    <ListItemIcon>
                        <RiLockPasswordFill fontSize="medium" />
                    </ListItemIcon>
                    Parol üýtget
                </MenuItem>
                <MenuItem
                    onClick={() => Cookies.remove('admin_token')}
                    component={Link}
                    to="/"
                    key={'Logout'}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Çykyş
                </MenuItem>
            </Menu>
            <ProfileChangePassword
                isPasswordChangeOpen={isPasswordChangeOpen}
                setIsPasswordChangeOpen={setIsPasswordChangeOpen}
            />
        </div>
    );
}
