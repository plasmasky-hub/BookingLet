import styled from '@emotion/styled';
import React from 'react';
import { useState } from 'react';
import { Logo } from '../../shared/Logo/Logo';
import { UserPanel } from './UserPanel';
import { LoginModal } from '../SignIn/Login';

import LoginIcon from '@mui/icons-material/Login';

import { 
	Box, 
	Button, 
  Modal,
} from '@mui/material';
import { useRef } from 'react';


const StyledHeader = styled(Box)`
  width: 100vw;
  height: 72px;
  background-color: #fefefe;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const ButtonWrapper = styled(Box)`
  width: 250px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 80px;
`;

const StyledLoginButton = styled(Button)`
  width: 135px;
  height: 36px;
  color: #000;
  font-size: 0.6rem;
  font-weight: 600;
  margin-right: 20px;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const RegisterButton = styled(Button)`
  background-color: #000;
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 6px 15px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;


export const Header = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loginIsOpen, setIsOpen] = useState(false);

	const loginOpen = () => {
		setIsOpen(true);
		// this.LoginModal.loginOpen();
	}
  const loginClose = () => {
    // isOpen = false;
    setIsOpen(false);
  }

	// const loginCallback = () => {
	// 	setIsOpen(false);
	// }

  return (
    <StyledHeader>
      <Logo />
      {loggedIn ? (
        <UserPanel />
      ) : (
        <ButtonWrapper>
			<StyledLoginButton 
				variant="text" 
				startIcon={<LoginIcon />}
				// onClick={() => loginOpen()}>
				onClick={() => loginOpen()}
				// callback={() => this.loginCallback()}
			>
				Log in
			</StyledLoginButton>

			
      <Modal
            open={loginIsOpen}
            // onClose={loginClose}
            onClose={loginClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            name = "loginModal"
      >
        <LoginModal />
      </Modal>

		  	<RegisterButton variant="contained">Register</RegisterButton>
        </ButtonWrapper>
      )}
    </StyledHeader>
  );
};
