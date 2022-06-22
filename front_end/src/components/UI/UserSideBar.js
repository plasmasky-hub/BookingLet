import React, { useState } from 'react'
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InfoIcon from '@mui/icons-material/Info';
import ListItemText from '@mui/material/ListItemText';
import ListIcon from '@mui/icons-material/List';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Divider from '@mui/material/Divider';
import UserImg from '../../assets/UserImg.png';
import LogoutIcon from '@mui/icons-material/Logout';

import { UserInfo } from '../UI/UserData';


export const StyledSideBar = styled(Paper)`
    width: 295px;
    height: 960px;
    background: #ECECEA;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    transition: ease-in-out 0.2s;
`;

const UserProfile = styled(Box)`
    width: 295px;
    height: 295px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Helvetica, sans-serif;
`;

const StyledAvatar = styled.img`
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
`;

const Space = styled(Box)`
    width: 295px;
    height: 320px;
`;

const UserLogOut = styled.button`
    width: 120px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    color: #E27777;
    font-weight: 700;
    font-size: 1rem;
    border-style: none;
    background: none;
    margin: 16px 0 0 8px;
    cursor: pointer;
`

export const SelectedListItem = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <StyledSideBar>
            <UserProfile>
                <StyledAvatar src={UserImg} />
                {UserInfo.name}
            </UserProfile>
            <Divider />

            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Infomation" />
                </ListItemButton>
                <Divider variant="middle" />

                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Bookings" />
                </ListItemButton>
                <Divider variant="middle" />

                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Booklet" />
                </ListItemButton>
                <Divider variant="middle" />

                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemIcon>
                        <EmojiEventsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Register My Store" />
                </ListItemButton>
                <Divider variant="middle" />

                <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Help" />
                </ListItemButton>
                <Divider />
            </ List>

            <Space />
            <Divider variant="middle" />

            < UserLogOut>
                <LogoutIcon />
                Log out
            </UserLogOut>
        </StyledSideBar>
    )
};
