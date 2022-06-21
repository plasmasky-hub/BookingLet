import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import { SelectedListItem } from "./UserSideBar";

const ProfileBanner = styled.div`
  width: 152px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding-right: 50px;
`;

const UserBox = styled.div`
  width: 92px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-family: Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 15px 0;
`;

const userName = 'Nicolas Cage';
const StyledUserName = styled.p`
    margin: -10px 0;
`;

const userTitle = 'Booker';
const StyledUserTitle = styled.p`
    color: #7B8B6F;
`;

const OpenSideBar = () => {
    const [isOPen, setOsOpen] = useState(false);
};

export const UserBanner = () => {
    return (
        <ProfileBanner>
            <UserBox>
                <StyledUserName>{userName}</StyledUserName>
                <StyledUserTitle>{userTitle}</StyledUserTitle>
            </UserBox>
            <Avatar>
            </Avatar>
        </ProfileBanner>
    )
};