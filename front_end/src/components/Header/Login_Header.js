import * as React from 'react';
import ReactDOM, { render } from 'react-dom';
import Button from '@mui/material/Button';
import styled from '@emotion/styled/types/base';
import AppBar from '@mui/material/AppBar';


const HeaderWrapper = styled.div`
    width: 100%;
    height: auto;
    background: #fff;
    border-shadow: 0 3px 6px #000;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

const Logo = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    font-family: Helvetica;
    color: #000;
    min-width: 50px;
    height: auto;
`;

const SearchBar = styled.div`

`

const SearchBarIcon =

const UserBanner =

const Login =

const LoginIcon =
    
const RegisterBtn =

return (
    <HeaderWrapper>
        <Logo>
            BookingLet
        </Logo>
        <SearchBar>
            <SearchBarIcon></SearchBarIcon>
        </SearchBar>
        <UserBanner>
            <Login>
                Login
                <LoginIcon></LoginIcon>
            </Login>
            <RegisterBtn>
                Register
            </RegisterBtn>
        </UserBanner>
    </HeaderWrapper>
);

