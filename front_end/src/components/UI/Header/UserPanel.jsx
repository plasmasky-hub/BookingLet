import theme from '../../../theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
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

export const UserInfo = {
  name: 'Nicolas Cage',
  title: 'Booker',
};

const ProfileBox = styled.div`
  width: 200px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 5px 50px 5px 0;
`;

const UserInfoBox = styled.div`
  width: 120px;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-family: Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  margin: 16px 0;
  cursor: pointer;
`;

const StyledUserName = styled.p`
  margin: -20px 0;
`;

const StyledUserTitle = styled.p`
  color: #7b8b6f;
`;

const StyledAvatar = styled(Avatar)`
  width: 45px;
  height: 45px;
`;

const StyledSideBar = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  width: 295px;
  height: 100vh;
`;

const UserProfile = styled(Box)`
  width: 295px;
  height: 295px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
  font-family: Helvetica, sans-serif;
  padding: 20px;
`;

const StyledUserImg = styled(Avatar)`
  width: 70px;
  height: 70px;
  margin: 15px 0 2px 0;
`;

const StyledName = styled.p`
  font-size: 1.2rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  flex-grow: 1.5;
`

const Space = styled(Box)`
  width: 295px;
  height: 50vh;
  flex-grow: 3;
`;

const UserLogOut = styled(Button)`
  color: #e27777;
  font-weight: 700;
  font-size: 0.8rem;
  margin: 15px 10px;
  cursor: pointer;
`;

export const UserPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProfileBox>
        <UserInfoBox>
          <StyledUserName>{UserInfo.name}</StyledUserName>
          <StyledUserTitle>{UserInfo.title}</StyledUserTitle>
        </UserInfoBox>
        <StyledAvatar onClick={() => setOpen(true)} aria-label="open drawer" />
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => { }}
          onClose={() => setOpen(false)}
        >
          <StyledSideBar>
            <UserProfile>
              <StyledUserImg />
              <StyledName>{UserInfo.name}</StyledName>
            </UserProfile>
            <ListWrapper>
            <List>
            <Divider />
              <ListItemButton>
                <ListItemIcon>
                  <InfoOutlinedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={'My Info'} />
              </ListItemButton>
              <Divider variant="middle" />
              <ListItemButton>
                <ListItemIcon>
                  <BookmarkAddedOutlinedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={'My Bookings'} />
              </ListItemButton>
              <Divider variant="middle" />
              <ListItemButton>
                <ListItemIcon>
                  <MenuBookOutlinedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={'My Booklet'} />
              </ListItemButton>
              <Divider variant="middle" />
              <ListItemButton>
                <ListItemIcon>
                  <HowToRegOutlinedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={'Register My Store'} />
              </ListItemButton>
              <Divider variant="middle" />
              <ListItemButton>
                <ListItemIcon>
                  <HelpOutlineOutlinedIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={'Help'} />
              </ListItemButton>
              <Divider />
              <Space />
              <Divider />
              <UserLogOut variant="text" startIcon={<LogoutIcon />}>Log out</UserLogOut>
            </List>
            </ListWrapper>
          </StyledSideBar>
        </SwipeableDrawer>
      </ProfileBox>
    </>
  );
};
