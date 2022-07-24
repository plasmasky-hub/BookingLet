import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
// import joiValidation from 'Joi';
import { loginValidation} from '../../../validation/SignInValidation'
import loginImg from '../../../assets/loginImg.png';
import { 
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';

import { useLoginMutation } from '../../../store/api/loginApi';

import { 
	Box, 
	Button, 
	FormControl, 
	Grid, 
	InputLabel, 
	TextField, 
	Typography,
	OutlinedInput,
	InputAdornment,
	IconButton,
    Link,
} from '@mui/material';

const LoginModalBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 25px;
    box-shadow: 24px;
`

const LoginTextContainer = styled(Box)`
    border-radius: 25px;
`

const LoginImage = styled(Box)`
	font-size: 0.6rem;
    height: 100%;
    width: 100%;

	img{
		height: 100%;
		width: 100%;
        object-fit: cover;
        object-position: left;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
	}
` 

const LoginInputField = styled(TextField)`
    margin-top: 3;
    width: 100%;
`

const ErrorMessage = styled(Typography)`
    color: red;
    font-size: 0.3rem;
`

const TextFieldStyle = {
	mt: 3, 
	width: '100%',
}

const LoginButton = styled(Button)`
    margin-top: 32px;
	width: 200px;
`

export const LoginModal = (props) => {

    const handleClickShowPassword = () => {
		formik.setValues({
		...formik.values,
		showPassword: !formik.values.showPassword,
		});
	};

    const [login, { isLoading }] = useLoginMutation();

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          showPassword: false,
        },
        handleClickShowPassword: handleClickShowPassword,
        validate: loginValidation,
        validateOnBlur: true,

        onSubmit: async (values) => {
            console.log( JSON.stringify(values, null, 2) );
            const loginResult = await login(values);

            console.log(loginResult);
        },
      });

    const handleRegisterOpen = () => {

    }

    if( isLoading ) {
        return <LoginModalBox>
            Loading
        </LoginModalBox>
    }

    return (

        <LoginModalBox >
            <Grid container spacing={0} alignItems="stretch">
                <Grid item xs={5} >
                    <LoginImage>
                        <img src={loginImg}></img>
                    </LoginImage>
                </Grid>
                
                <Grid item xs={7} sx={{ padding: 3 }}>
                    <Typography id="modal-modal-title" variant="h5" component="h5">
                        Welcome to Bookinglet!
                    </Typography>

                    <LoginTextContainer component='form' onSubmit={formik.handleSubmit}>

                        <LoginInputField 
                            variant='outlined' 
                            label="Email" 
                            name='email'
                            color='success' 
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email || Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        {formik.errors.email 
                            ? <ErrorMessage>{formik.errors.email}</ErrorMessage> 
                            : null
                        }

                        <FormControl 
                            color='success' 
                            sx={TextFieldStyle}
                            error={formik.touched.password || Boolean(formik.errors.password)}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                label="Password"
                                name='password'
                                type={formik.values.showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        name='showPassword'
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        >
                                        {formik.values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {formik.errors.password 
                            ? <ErrorMessage>{formik.errors.password}</ErrorMessage> 
                            : <ErrorMessage> </ErrorMessage>
                        }

                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <LoginButton 
                                variant='contained'
                                color='success'
                                type="submit"
                            >
                                Sign in
                            </LoginButton>
                        </Box>
                    </LoginTextContainer>
                        

                        

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
            
        </LoginModalBox>
    )
}