import styled from '@emotion/styled';
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ListItemText from '@mui/material/ListItemText';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';

export const UserInfo = {
    name: 'Nicolas Cage',
    title: 'Booker'
};

const ProfileBox = styled.div`
  width: 170px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding-right: 50px;
`;

const UserInfoBox = styled.div`
  width: 120px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-family: Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  padding: 12px 0;
  cursor: pointer;
`;

const StyledUserName = styled.p`
    margin: -15px 0;
`;

const StyledUserTitle = styled.p`
    color: #7B8B6F;
`;

const StyledAvatar = styled(Avatar)`
    width: 45px;
    height: 45px;
`

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

const StyledUserImg = styled(Avatar)`
    width: 70px;
    height: 70px;
`;

const Space = styled(Box)`
        width: 295px;
        height: 320px;
`;

const UserLogOut = styled(Button)`
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

export const UserPanel = () => {
    const [open, setOpen] = useState({
        right: false,
    });

    return (
        <ProfileBox>
            <UserInfoBox>
                <StyledUserName>{UserInfo.name}</StyledUserName>
                <StyledUserTitle>{UserInfo.title}</StyledUserTitle>
            </UserInfoBox>
            <StyledAvatar
                onClick={() => setOpen(true)}
                aria-label="open drawer"
            />
            <SwipeableDrawer
                anchor="right"
                open={false}
                onOpen={() => { }}
                onClose={() => setOpen(false)}>
                <StyledSideBar>
                    <UserProfile>
                        <StyledUserImg />
                        {UserInfo.name}
                    </UserProfile>
                    <Divider />
                    <List>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <InfoOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={'My Info'} />
                        </ListItemButton>
                        <Divider variant="middle" />
                        <ListItemButton>
                            <ListItemIcon>
                                <BookmarkAddedOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={'My Bookings'} />
                        </ListItemButton>
                        <Divider variant="middle" />
                        <ListItemButton>
                            <ListItemIcon>
                                <MenuBookOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={'My Booklet'} />
                        </ListItemButton>
                        <Divider variant="middle" />
                        <ListItemButton>
                            <ListItemIcon>
                                <HowToRegOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Register My Store'} />
                        </ListItemButton>
                        <Divider variant="middle" />
                        <ListItemButton>
                            <ListItemIcon>
                                <HelpOutlineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Help'} />
                        </ListItemButton>
                        <Divider />
                        <Space />
                        <Divider />
                        <UserLogOut>
                            <LogoutIcon />
                            Log out
                        </UserLogOut>
                    </List>
                </StyledSideBar>
            </SwipeableDrawer>
        </ProfileBox>
    )
};