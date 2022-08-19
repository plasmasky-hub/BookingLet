import theme from '../../../theme';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Typography, Box, Button } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';

const newtheme = { ...theme, iconColor: '#7F96AF' };

const ProfileBox = styled.div`
  width: 280px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0 80px 0 0;
`;

const UserInfoBox = styled.div`
  width: 120px;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-weight: 400;
`;

const StyledAvatar = styled(Avatar)`
  width: 45px;
  height: 45px;
`;

const StyledSideBar = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 295px;
  height: 100vh;
`;

const UserProfile = styled(Box)`
  width: 295px;
  height: 255px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
  font-family: Helvetica, sans-serif;
  padding-top: 20px;
`;

const StyledUserImg = styled(Avatar)`
  width: 70px;
  height: 70px;
  margin: 15px 0 2px 0;
`;

const StyledName = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;

const UserContent = styled(Box)`
  width: 295px;
`;

const UserLogOutBtn = styled(Button)`
  color: #e27777;
  width: 295px;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 15px 0;
  cursor: pointer;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0;
`;

export const UserPanel = (props) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log("🚀 ~ file: UserPanel.jsx ~ line 104 ~ UserPanel ~ user", user)
  // console.log(typeof(user));
  // console.log(user.name);

  const UserInfo = {
    name: user.name,
    role: user.role,
    id: user._id,
  };

  async function logout() {
    props.setLoggedIn(false);
    // await localStorage.setItem('loggedIn', false);
    await localStorage.setItem('user', '');
    await localStorage.setItem('token', '');
  }

  async function handleNavigate(url) {
    setOpen(false);
    await navigate(url);
    window.scrollTo(0, 0);
  }

  const routeToStoreLandingPage = () => {
    handleNavigate(`/StoreLandingPage`);
  };

  const routeToFavStore = () => {
    handleNavigate(`/FavouriteStoreListPage/${UserInfo.id}`);
  };

  const routeToUserBooking = () => {
    handleNavigate(`/UserBookingPage`);
  };

  // console.log(UserInfo);

  return (
    <ProfileBox>
      <UserInfoBox>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '14px',
            mb: '4px',
          }}
          onClick={() => setOpen(true)}
        >
          {UserInfo.name}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '14px',
            color: '#7B8B6F',
          }}
          onClick={() => setOpen(true)}
        >
          {UserInfo.role}
        </Typography>
      </UserInfoBox>
      <StyledAvatar
        src="UserInfo.photo"
        onClick={() => setOpen(true)}
        aria-label={UserInfo.name}
      />
      <SwipeableDrawer
        anchor="right"
        open={open}
        BackdropProps={{ invisible: true }}
        onOpen={() => {}}
        elevation={0}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiPaper-root': {
            background: 'rgba(47, 68, 73, 0.5)',
            backdropFilter: 'blur(15px)',
          },
        }}
      >
        <StyledSideBar>
          <UserContent>
            <UserProfile>
              <StyledUserImg />
              <StyledName>{UserInfo.name}</StyledName>
            </UserProfile>
            <ListWrapper>
              <List sx={{ width: 295 }}>
                <Divider />
                <ListItemButton onClick={() => navigate(`/PersonalSetting`)}>
                  <ListItemIcon>
                    <InfoOutlinedIcon
                      sx={{ color: `${newtheme.palette.secondary.main}` }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={'My Info'} sx={{ color: 'white' }} />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton onClick={routeToUserBooking}>
                  <ListItemIcon>
                    <BookmarkAddedOutlinedIcon
                      sx={{ color: `${newtheme.palette.secondary.main}` }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={'My Bookings'}
                    sx={{ color: 'white' }}
                  />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton onClick={routeToFavStore}>
                  <ListItemIcon>
                    <MenuBookOutlinedIcon
                      sx={{ color: `${newtheme.palette.secondary.main}` }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={'My Favorite Store'}
                    sx={{ color: 'white' }}
                  />
                </ListItemButton>
                <Divider variant="middle" />

                {UserInfo.role === 'Customer' ? null : (
                  <ListItemButton onClick={routeToStoreLandingPage}>
                    <ListItemIcon>
                      <HowToRegOutlinedIcon
                        sx={{ color: `${newtheme.palette.secondary.main}` }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={'My Stores'}
                      sx={{ color: 'white' }}
                    />
                  </ListItemButton>
                )}

                <Divider variant="middle" />
                <ListItemButton>
                  <ListItemIcon>
                    <HelpOutlineOutlinedIcon
                      sx={{ color: `${newtheme.palette.secondary.main}` }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={'Help'} sx={{ color: 'white' }} />
                </ListItemButton>
                <Divider />
              </List>
            </ListWrapper>
          </UserContent>
          <UserLogOutBtn
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Log out
          </UserLogOutBtn>
        </StyledSideBar>
      </SwipeableDrawer>
    </ProfileBox>
  );
};
