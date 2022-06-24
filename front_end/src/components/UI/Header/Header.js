import styled from "styled-components";
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import { Logo } from '../../shared/Logo/Logo';
import React, { useState } from 'react';
import {UserBanner} from './UserData';

// import SwipeableTemporaryDrawer from "./UserData";

const StyledHeader = styled(Box)`
  width: 100vw;
  height: 72px;
  background: #fefefe;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
`

const StyledButton = styled.div`
  width: 200px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 50px;
`;

const StyledLoginButton = styled.button`
  width: 90px;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-weight: 700;
  background: none;
  border-style: none;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover{
    color: rgba(0, 0, 0, 0.7);
  }
`;

const RegisterButton = styled.button`
  background: #000;
  color: #fff;
  font-size: 0.8rem;
  border-radius: 8px;
  border-style: none;
  padding: 6px 15px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover{
    background: rgba(0, 0, 0, 0.8);
  }
`

// const UserLoginStatus = () => {
//   const [isLogin, setIsLogin] = useState(false);
// };

export const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      {/* <StyledButton>
        <StyledLoginButton variant="text">
          <LoginIcon />
          Log in
        </StyledLoginButton>
        < RegisterButton>Register</RegisterButton>
      </StyledButton> */}
      <UserBanner />
    </StyledHeader>
  )
};
