import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Logo } from '../../shared/Logo/Logo';
import { UserPanel } from './UserPanel';
import { LoginModal } from '../SignIn/Login';
import { RegisterModal } from '../SignIn/Register';

import LoginIcon from '@mui/icons-material/Login';

import { Box, Button, Modal } from '@mui/material';

const StyledHeader = styled(Box)`
  width: 100vw;
  height: 72px;
  top: 10px;
  background-color: rgba(251, 251, 251, 0.6);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  z-index: 99;
`;

const ButtonWrapper = styled(Box)`
  width: 350px;
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
  font-size: 14px;
  font-weight: 600;
  margin-right: 20px;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const RegisterButton = styled(Button)`
  width: 135px;
  height: 36px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: ease-in-out 0.2s;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginIsOpen, setLoginOpen] = useState(false);
  const [registerIsOpen, setRegisterOpen] = useState(false);
  // var token = localStorage.getItem('token');

  // await localStorage.setItem('loggedIn', loggedIn);

  async function changeLoggedIn (props) {
    // await localStorage.setItem('loggedIn', props);
    setLoggedIn(props);
  }

  useEffect ( () => {
    // const current = localStorage.getItem('token');
    // console.log(typeof(current));
    // console.log("🚀 ~ file: Header.jsx ~ line 82 ~ useEffect ~ current", current)
    const token = localStorage.getItem('token');
    token === '' || token === null ? setLoggedIn(false) : setLoggedIn(true);

  },[])

  const loginOpen = () => {
    setLoginOpen(true);
    // this.LoginModal.loginOpen();
  };
  const loginClose = () => {
    // isOpen = false;
    setLoginOpen(false);
  };

  const registerOpen = () => {
    setRegisterOpen(true);
  };
  const registerClose = () => {
    setRegisterOpen(false);
  };

  // const loginCallback = () => {
  // 	setIsOpen(false);
  // }

  return (
    <StyledHeader>
      <Logo />
      { loggedIn ? (
        <UserPanel setLoggedIn={setLoggedIn} />
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
            name="loginModal"
          >
            <LoginModal
              loginClose={loginClose}
              registerOpen={registerOpen}
              setLoggedIn={setLoggedIn}
              changeLoggedIn={changeLoggedIn}
            />
          </Modal>

          <RegisterButton variant="contained" onClick={registerOpen}>
            Register
          </RegisterButton>
          <Modal
            open={registerIsOpen}
            onClose={registerClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            name="registerModal"
          >
            <RegisterModal
              registerClose={registerClose}
              loginOpen={loginOpen}
            />
          </Modal>
        </ButtonWrapper>
      )}
    </StyledHeader>
  );
};

export default Header;
