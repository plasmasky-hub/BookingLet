import styled from '@emotion/styled';
import React from 'react';
import { useState } from 'react';

import { Logo } from '../../shared/Logo/Logo';
import { UserPanel } from './UserPanel';
import ModalUnstyled from '@mui/base/ModalUnstyled'
import loginImg from '../../../assets/loginImg.png';

import LoginIcon from '@mui/icons-material/Login';
import { 
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';

import { 
	Box, 
	Button, 
	FormControl, 
	Grid, 
	Input, 
	InputBase, 
	InputLabel, 
	TextField, 
	Modal, 
	Typography,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormHelperText,
	
} from '@mui/material';


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


const loginFormStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	transform: 'translate(-50%, -50%)',
	padding: '0px 0px 0px 0px',

	bgcolor: 'background.paper',
	borderRadius: '25px',
	boxShadow: 24,
	p: 4,
};

const LoginImage = styled(Typography)`
	justifyContent: center;
	alignItems: center;
	font-size: 0.6rem;

	img{
		height: 420px;
		width: 250px;
	}
` 

const TextFieldStyle = {
	mt: 4, 
	width: 350,
}

const LoginButtonStyle = {
	mt: 4,
	width: 200
}

export const Header = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loginIsOpen, setLogin] = React.useState(false);
	const loginOpen = () => setLogin(true);
	const loginClose = () => setLogin(false);

	const [values, setValues] = React.useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
		...values,
		showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

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
				onClick={loginOpen}>
				Log in
			</StyledLoginButton>
			
			<Modal
				open={loginIsOpen}
				onClose={loginClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				name = "loginModal"
			>
				<Box sx={loginFormStyle}>
					<Grid container spacing={0}>
						<Grid item xs={5}>
							<LoginImage>
								<img src={loginImg}></img>
							</LoginImage>
						</Grid>
						
						<Grid item xs={7}>
							<Typography id="modal-modal-title" variant="h4" component="h2">
								Welcome to Bookinglet!
							</Typography>

							<TextField variant='outlined' id="account-basic" label="Email" color='success' sx={TextFieldStyle} />

							<FormControl sx={TextFieldStyle} color='success'>
								<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
								<OutlinedInput
									id="outlined-adornment-password"
						
									type={values.showPassword ? 'text' : 'password'}
									value={values.password}
									onChange={handleChange('password')}
									endAdornment={
									<InputAdornment position="end">
										<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
									}
									label="Password"
								/>
							</FormControl>

							<Button 
								variant='contained'
								color='success'
								sx={LoginButtonStyle}
							>Sign in</Button>

								
						</Grid>
						
					</Grid>
					
				</Box>
          	</Modal>

		  	<RegisterButton variant="contained">Register</RegisterButton>
        </ButtonWrapper>
      )}
    </StyledHeader>
  );
};
