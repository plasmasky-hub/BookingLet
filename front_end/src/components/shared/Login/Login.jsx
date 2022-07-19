import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useState } from 'react';
import loginImg from '../../../assets/loginImg.png';
import { 
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

import { 
	Box, 
	Button, 
	FormControl, 
	Grid, 
	InputLabel, 
	TextField, 
	Modal, 
	Typography,
	OutlinedInput,
	InputAdornment,
	IconButton,
    Link,
    Form,

} from '@mui/material';

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
	font-size: 0.6rem;

	img{
		height: 100%;
		width: 100%;
	}
` 

const TextFieldStyle = {
	mt: 3, 
	width: '100%',
}

const LoginButtonStyle = {
	mt: 4,
	width: 200
}

export const LoginModal = (props) => {
    
    var isOpen = props.open;
    const [loginIsOpen, setLogin] = React.useState(false);
	const loginOpen = () => setLogin(true);
	// const loginClose = () => setLogin(false);
    const loginClose = () => {
        isOpen = false;
        setLogin(false);
    }

    const handleRegisterOpen = () => {

    }

    // componentDidMount(){
    //     // 将子组件指向父组件的变量
    //     this.props.onRef && this.props.onRef(this);
    // }

    useEffect( () => isOpen ? loginOpen() : loginClose());

	const [values, setValues] = React.useState({
		email: '',
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

    const handleSubmit = (event) => {
        const { email } = values.email;
        const { password } = values.password;

        event.preventDefault();
        console.log( 'Email:', email, 'Password: ', password); 
        alert('Submitted! ' + email + password);
    }

    return (
        // <Modal
        //     open={loginIsOpen}
        //     onClose={loginClose}
        //     aria-labelledby="modal-modal-title"
        //     aria-describedby="modal-modal-description"
        //     name = "loginModal"
        // >
            <Box sx={loginFormStyle}>
                <Grid container spacing={1.5}>
                    <Grid item xs={5}>
                        <LoginImage>
                            <img src={loginImg}></img>
                        </LoginImage>
                    </Grid>
                    
                    <Grid item xs={7}>
                        <Box sx={{ width: '100%' , display: 'flex', justifyContent: 'end'}}>
                            <IconButton aria-label="close" >
                                <CloseIcon onClick={loginClose}/>
                            </IconButton>
                        </Box>

                        <Typography id="modal-modal-title" variant="h5" component="h5">
                            Welcome to Bookinglet!
                        </Typography>

                        <Box component='form' onSubmit={handleSubmit}>
                            <TextField 
                                variant='outlined' 
                                id="account-basic" 
                                label="Email" 
                                color='success' 
                                value={values.email}
                                onChange={handleChange('email')}
                                sx={TextFieldStyle} />

                            <FormControl color='success' sx={TextFieldStyle}>
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

                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Button 
                                    variant='contained'
                                    color='success'
                                    type="submit"
                                    sx={LoginButtonStyle}
                                    // onClick={handleSubmit}
                                >Sign in</Button>
                            </Box>
                        </Box>
                        

                        

                        <Grid container spacing={1} 
                            direction='row' 
                            justifyContent='center' 
                            sx={{ mt: 2, fontStyle: 'italic'}}>
                            <Grid item>
                                <Typography > Not a member yet? </Typography> 
                            </Grid>
                            <Grid item>
                                <Link onClick={handleRegisterOpen} color='inherit'> Register </Link> 
                            </Grid>
                            <Grid item>
                                <Typography > now!</Typography> 
                            </Grid>
                        </Grid>
                        

                            
                    </Grid>
                    
                </Grid>
                
            </Box>
        // {/* </Modal> */}
    )

   
}