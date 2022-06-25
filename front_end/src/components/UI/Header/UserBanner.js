import styled from "styled-components";
import UserImg from '../../../assets/UserImg.png';
import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect } from 'react';

export const UserInfo = {
    name: 'Nicolas Cage',
    title: 'Booker'
};

const ProfileBanner = styled.div`
  width: 170px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding-right: 50px;
`;

const UserBox = styled.div`
  width: 120px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-family: Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  padding: 15px 0;
  cursor: pointer;
`;

const StyledUserName = styled.p`
    margin: -15px 0;
`;

const StyledUserTitle = styled.p`
    color: #7B8B6F;
`;

const StyledUserImg = styled.img`
    width: 50px;
    height: 50px;
    transition: ease-in-out 0.2s;
    &:hover{
        opacity: 0.8;
    }
`;

export default function SwipeableTemporaryDrawer() {
    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const StyledSideBar = styled(Paper)`
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
    `;

    const list = (anchor) => (
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

            < UserLogOut>
                <LogoutIcon />
                Log out
            </UserLogOut>
        </StyledSideBar>
    );

    return (
        <>
            <ProfileBanner>
                <UserBox>
                    <StyledUserName>{UserInfo.name}</StyledUserName>
                    <StyledUserTitle>{UserInfo.title}</StyledUserTitle>
                </UserBox>
                <StyledUserImg
                    {...['right'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <Button src={{ UserImg }} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                            <SwipeableDrawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                                onOpen={toggleDrawer(anchor, true)}
                            >
                                {list(anchor)}
                            </SwipeableDrawer>
                        </React.Fragment>
                    ))}
                />
            </ProfileBanner>
        </>
    )
};