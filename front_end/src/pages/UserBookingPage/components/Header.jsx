import UserBookingPageHeader from '../../../assets/UserBookingPageHeader.png';
import styled from '@emotion/styled';
import { Avatar, Button, Box } from '@mui/material';
import { UserInfo } from '../../../components/shared/Header/UserPanel';

const UserPageHeader = styled(Box)({
    minWidth: '1233px',
    width: '100%',
    height: '312px',
    backgroundImg: `url(${UserBookingPageHeader})`,
    backgroundSize: 'cover',
});

const ProfileWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
})
const StyledAvatar = styled(Avatar)({
    width: '70px',
    height: '70px',
});

export const UserBookingPage = () => {
    return (
        <UserPageHeader>
            <StyledAvatar />
            <ProfileWrapper>
                {UserInfo}
            </ProfileWrapper>
        </UserPageHeader>
    )
};