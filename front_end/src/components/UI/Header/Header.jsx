import styled from '@emotion/styled';
import { useState } from 'react';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import { Logo } from '../../shared/Logo/Logo';
import { UserPanel } from "./UserPanel";
import { Button } from "@mui/material";

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
`;

const ButtonWrapper = styled(Box)`
  width: 220px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 80px;
`;

const StyledLoginButton = styled(Button)`
  color: #000;
  font-size: 0.8rem;
  font-weight: 600;
  padding-right: 40px;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover{
    color: rgba(0, 0, 0, 0.7);
  }
`;

const RegisterButton = styled(Button)`
  background: #000;
  color: #fff;
  font-size: 0.8rem;
  border-radius: 8px;
  padding: 6px 13px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover{
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const Header = () => {
  const [loggedIn, setloggedIn] = useState(false);

  return (
    <StyledHeader>
      <Logo />
      {
        loggedIn ? (<UserPanel />) : (
          <ButtonWrapper>
            <LoginIcon />
            <StyledLoginButton variant="text">
              Log in
            </StyledLoginButton>
            < RegisterButton variant="contained">Register</RegisterButton>
          </ButtonWrapper>)
      }
    </StyledHeader>
  )
};
