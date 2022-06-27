import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#ececea',
    },
    secondary: {
      main: '#7f96af',
    },
  },
});


export const UserInfo = {
  name: 'Nicolas Cage',
  title: 'Booker',
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
  color: #7b8b6f;
`;

const StyledAvatar = styled(Avatar)`
  width: 45px;
  height: 45px;
`;

const StyledSideBar = styled(Paper)`
  width: 295px;
  height: 100vh;
  background: #ececea;
`;

const UserProfile = styled(Box)`
  width: 295px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, sans-serif;
`;

const StyledUserImg = styled(Avatar)`
  width: 70px;
  height: 70px;
  margin: 15px 0 2px 0;
`;

const StyledName = styled.p`
  font-size: 1.2rem;
`;

const Space = styled(Box)`
  width: 295px;
  height: 590px;
`;

const UserLogOutBox = styled(Box)`
  width: 29px;
  height: 80px;  
`;

const UserLogOut = styled(Button)`
  width: 150px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: #e27777;
  font-weight: 700;
  font-size: 0.8rem;
  margin-top: 20px;
  cursor: pointer;
`;

export const UserPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <ProfileBox>
      <UserInfoBox>
        <StyledUserName>{UserInfo.name}</StyledUserName>
        <StyledUserTitle>{UserInfo.title}</StyledUserTitle>
      </UserInfoBox>
      <StyledAvatar onClick={() => setOpen(true)} aria-label="open drawer" />
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => {}}
        onClose={() => setOpen(false)}
      >
        <StyledSideBar color="primary">
          <UserProfile>
            <StyledUserImg/>
            <StyledName>{UserInfo.name}</StyledName>
          </UserProfile>
          <Divider />
          <List>
            <ListItemButton>
              <ListItemIcon>
                <InfoOutlinedIcon color="secondary"/>
              </ListItemIcon>
              <ListItemText primary={'My Info'} />
            </ListItemButton>
            <Divider variant="middle" />
            <ListItemButton>
              <ListItemIcon>
                <BookmarkAddedOutlinedIcon color="secondary"/>
              </ListItemIcon>
              <ListItemText primary={'My Bookings'} />
            </ListItemButton>
            <Divider variant="middle" />
            <ListItemButton>
              <ListItemIcon>
                <MenuBookOutlinedIcon color="secondary"/>
              </ListItemIcon>
              <ListItemText primary={'My Booklet'} />
            </ListItemButton>
            <Divider variant="middle" />
            <ListItemButton>
              <ListItemIcon>
                <HowToRegOutlinedIcon color="secondary"/>
              </ListItemIcon>
              <ListItemText primary={'Register My Store'} />
            </ListItemButton>
            <Divider variant="middle" />
            <ListItemButton>
              <ListItemIcon>
                <HelpOutlineOutlinedIcon color="secondary"/>
              </ListItemIcon>
              <ListItemText primary={'Help'} />
            </ListItemButton>
            <Divider />
            <Space />
            <Divider />
            <UserLogOutBox>
              <UserLogOut>
                <LogoutIcon />
                Log out
              </UserLogOut>
            </UserLogOutBox>
          </List>
        </StyledSideBar>
      </SwipeableDrawer>
    </ProfileBox>
    </ThemeProvider>
  );
};
