import UserDashboardHeader from '../../../assets/UserDashboardHeader.png';
import styled from '@emotion/styled';
import { Avatar, Button, Box } from '@mui/material';

const UserPageHeader = styled(Box)`
    width: 1233px;
    height: 312px;
    background: url(${UserDashboardHeader});

`; 

export const StyledUserDashboardHeader = () => {
    return(
        <UserPageHeader>
            <Avatar />
        </UserPageHeader>
    )
};