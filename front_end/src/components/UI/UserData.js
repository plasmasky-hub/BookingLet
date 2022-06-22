import styled from "styled-components";
import UserImg from '../../assets/UserImg.png';
import { useState } from "react";
import { StyledSideBar } from "./UserSideBar";

export const UserInfo = {
    name: 'Nicolas Cage',
    title: 'Booker'
}

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

export const UserBanner = () => {
    const [isOPen, setIsOpen] = useState(false);
    const handleSideBarClick = () => {
        setIsOpen((prev) => !prev);
    };
    const handleSideBarClose = () => {
        setIsOpen(false);
    };

    return (
        <ProfileBanner>
            <UserBox>
                <StyledUserName>{UserInfo.name}</StyledUserName>
                <StyledUserTitle>{UserInfo.title}</StyledUserTitle>
            </UserBox>
            <StyledUserImg
                src={UserImg}
                onClick={handleSideBarClick}
                {...open ? (
                    <StyledSideBar sx={SideBarTransition} />
                ) : <StyledSideBar sx={SideBarTransitionHover} />}
            />
        </ProfileBanner>
    )
};