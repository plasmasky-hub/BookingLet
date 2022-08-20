import UserBookingPageHeader from '../../../../assets/UserBookingPageHeader.png';
import styled from '@emotion/styled';
import { Avatar, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const UserBookingPageWrapper = styled(Box)({
  minWidth: '1000px',
  width: '100%',
  margin: '0 auto',
  padding: '20px',
});

const UserPageHeader = styled(Grid)({
  minWidth: '1000px',
  width: '100%',
  height: '312px',
  backgroundImage: `url(${UserBookingPageHeader})`,
  backgroundSize: 'cover',
  padding: '20px',
  marginTop: '80px',
});

const ProfileWrapper = styled(Box)({
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '30px',
});
const StyledAvatar = styled(Avatar)({
  width: '100px',
  height: '100px',
  margin: '20px 50px',
});

const UserInfoBox = styled(Box)({
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  alignContent: 'center',
});

const UserInfoContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'flex-start',
});

const UserDataArr = ['Mobile', 'Email', 'Location'];

const UploadButton = styled('button')({
  width: '186px',
  height: '30px',
  padding: '5px 20px',
  borderRadius: '5px',
  border: '1px solid #A4A4A4',
  cursor: 'pointer',
});

export const UserBookingHeader = ({ user }) => {
  return (
    <UserBookingPageWrapper>
      <UserPageHeader>
        <ProfileWrapper>
          <StyledAvatar src={user.photo} />
          <UserInfoBox>
            <h3 style={{ paddingBottom: '10px' }}>{user.name}</h3>
            <UserInfoContent>
              <span>
                <strong>{UserDataArr[0]}</strong>: {user.mobile}
              </span>
              <span>
                <strong>{UserDataArr[1]}</strong>: {user.email}
              </span>
              <span>
                <strong>{UserDataArr[2]}</strong>: {user.location?.state}
              </span>
            </UserInfoContent>
            <Link to={'/PersonalSetting'}>
              <UploadButton
                variant="outlined"
                component="span"
                style={{ color: '#000' }}
              >
                Update My Profile
              </UploadButton>
            </Link>
          </UserInfoBox>
        </ProfileWrapper>
      </UserPageHeader>
    </UserBookingPageWrapper>
  );
};

//
