import React, { useState } from 'react';
import './User_SideBar.css';
import { UserImg, UserName } from '../Header/components/UserInfo/UserInfo';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import InfoIcon from '@mui/icons-material/Info';
import ListIcon from '@mui/icons-material/List';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HelpIcon from '@mui/icons-material/Help';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';

export const User_SideBar = () => {
    return (
        <div className='user_sidebar_wrapper'>
            <div className='user_profile_header'>
                <UserImg />
                <UserName />
            </div>
            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <InfoIcon sx={{ color: '#7F96AF', marginRight: 1 }} />
                        <ListItemText primary="Information" />
                    </ListItemButton>
                </ListItem>
                <Divider variant="middle" />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListIcon sx={{ color: '#7F96AF', marginRight: 1 }} />
                        <ListItemText primary="My Bookings" />
                    </ListItemButton>
                </ListItem>
                <Divider variant="middle" />
                <ListItem disablePadding>
                    <ListItemButton>
                        <MenuBookIcon sx={{ color: '#7F96AF', marginRight: 1 }} />
                        <ListItemText primary="My Booklet" />
                    </ListItemButton>
                </ListItem>
                <Divider variant="middle" />
                <ListItem disablePadding>
                    <ListItemButton>
                        <AppRegistrationIcon sx={{ color: '#7F96AF', marginRight: 1 }} />
                        <ListItemText primary="Register My Store" />
                    </ListItemButton>
                </ListItem>
                <Divider variant="middle" />
                <ListItem disablePadding>
                    <ListItemButton>
                        <HelpIcon sx={{ color: '#7F96AF', marginRight: 1 }} />
                        <ListItemText primary="Help" />
                    </ListItemButton>
                </ListItem>
                <Divider />

                <ListItem disablePadding>
                    <ListItemButton
                        sx={{ height: 380 }}
                    >
                    </ListItemButton>
                </ListItem>
                <Divider variant="middle" />

                <ListItem disablePadding>
                    <ListItemButton>
                        <LogoutIcon
                            sx={{ color: '#E27777' }}
                        />
                        <ListItemText primary="Logout"
                            sx={{ color: '#E27777' }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>

    )
}