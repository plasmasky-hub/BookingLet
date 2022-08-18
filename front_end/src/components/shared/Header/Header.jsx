import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Logo } from '../../shared/Logo/Logo';
import { UserPanel } from './UserPanel';
import { LoginModal } from '../SignIn/Login';
import { RegisterModal } from '../SignIn/Register';

import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import { Box, Button, Modal, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';


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

const ButtonWrapper = styled(Box)( ({ theme }) => ({
  height: '36px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '10px',

  [theme.breakpoints.down(500)]: {
    width: '100px',
  },
  [theme.breakpoints.up(500)]: {
    width: '250px',
  },
  [theme.breakpoints.up('md')]: {
    paddingRight: '30px',
  },
}));

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

  const theme = useTheme();
  const showIcon = useMediaQuery(theme.breakpoints.down(500));

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
          { showIcon ? (
            <LoginIcon fontSize = 'large'  onClick={() => loginOpen()}/>
          ) : (
            <>
              <StyledLoginButton
                variant="text"
                startIcon={<LoginIcon />}
                // onClick={() => loginOpen()}>
                onClick={() => loginOpen()}
                // callback={() => this.loginCallback()}
              >
                Log in
              </StyledLoginButton>
            </>
          )}
          
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

          { showIcon ? (
            <PersonAddAlt1Icon fontSize='large' onClick={registerOpen}/>
          ) : (
            <>
              <RegisterButton variant="contained" onClick={registerOpen}>
                Register
              </RegisterButton >
            </>
          )}
          
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
