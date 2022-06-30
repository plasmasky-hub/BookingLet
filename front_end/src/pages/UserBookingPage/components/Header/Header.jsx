import UserBookingPageHeader from '../../../../assets/UserBookingPageHeader.png';
import styled from '@emotion/styled';
import { Avatar, Button, Box, Grid } from '@mui/material';
import { UserInfo } from '../../../../components/shared/Header/UserPanel';

const UserBookingPageWrapper = styled(Box)({
    minWidth: '1000px',
    width: '100%',
    margin: '0 auto',
    padding: '20px',
})

const UserPageHeader = styled(Grid)({
    minWidth: '1000px',
    width: '100%',
    height: '312px',
    backgroundImage: `url(${UserBookingPageHeader})`,
    backgroundSize: 'cover',
    padding: '20px',
});

const ProfileWrapper = styled(Box)({
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '30px',
})
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

const UserData = {
    mobile: '0414123456',
    email: 'nicolascage@gmail.com',
    location: 'Adelaide',
};

const UploadButton = styled('Button')({
    width: '186px',
    height: '30px',
    padding: '5px 20px',
    borderRadius: '5px',
    border: '1px solid #A4A4A4',
});

export const UserBookingPage = () => {
    return (
        <UserBookingPageWrapper>
            <UserPageHeader>
                <ProfileWrapper>
                    <StyledAvatar />
                        <UserInfoBox>
                            <h3 style={{paddingBottpm: '10px'}}>{UserInfo.name}</h3>
                            <UserInfoContent>
                            <span><strong>{UserDataArr[0]}</strong>: {UserData.mobile}</span>
                            <span><strong>{UserDataArr[1]}</strong>: {UserData.email}</span>
                            <span><strong>{UserDataArr[2]}</strong>: {UserData.location}</span>
                            </UserInfoContent>
                            <UploadButton variant="outlined" component="span">Upload My Profile</UploadButton>
                        </UserInfoBox>
                </ProfileWrapper>
            </UserPageHeader>
        </UserBookingPageWrapper>
    )
};

// 