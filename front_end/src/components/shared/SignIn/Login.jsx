import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useFormik } from 'formik';
// import joiValidation from 'Joi';
import { loginValidation} from '../../../validation/SignInValidation'
import loginImg from '../../../assets/loginImg.png';
import { 
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';

import { useEffect } from 'react';
// import theme from '../../../theme';

import { useLoginMutation } from '../../../store/api/userApi';

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
    Checkbox,
    FormControlLabel,
} from '@mui/material';

// const newtheme = { ...theme };

const LoginModalBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
    background-color: rgb(204, 204, 204, 0.55);
    backdrop-filter: blur(5px);

    width: 900px;
    height: 593px;
    
    border-radius: 25px;
    box-shadow: 24px;

    color: white;
`

const LoginFormContainer = styled(Box)`
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
const LoginTitle = styled(Typography)`
    color: white;
    font-size: 35px;
    font-weight: 600;
    margin-top: 20px;
    text-shadow: 1px 1px 5px black;

`

const LoginSubTitle = styled(Typography)`
    
    font-size: 25px;
    font-weight: 300;
    margin-bottom: 10px;
    text-shadow: 1px 0px 3px black;


`

const LoginInputField = styled(TextField)`
    color: white;
    margin-top: 15px;
    margin-bottom: 20px;
    width: 100%;
`

const TextFieldStyle = {
	mt: 2, 
	width: '100%',
}

const StaySignIn = styled(FormControlLabel)`
    margin-top: 10px;
    width: 100%;

`

const LoginButton = styled(Button)`
    /* background-color: #ececea; */
    height: 80%;
	width: 300px;
    font-size: 1.3rem;
    border-radius: 15px;
`

export const LoginModal = (props) => {

    const [login, { isLoading }] = useLoginMutation();
    const [user, setUser] = useState(Object);
    const [token, setToken] = useState("");
    // const [isLogin, setIsLogin] = useState('false');

    const handleClickShowPassword = () => {
		formik.setValues({
		...formik.values,
		showPassword: !formik.values.showPassword,
		});
	};

    useEffect(() => {
        localStorage.setItem("user", user);
    }, [user]);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);
    
    const converter = () => {
        props.loginClose();
        props.registerOpen();
    }

    const showLocalStorage = () => {
        // const user = localStorage.getItem('user');
        // console.log("🚀 ~ file: Login.jsx ~ line 102 ~ showLocalStorage ~ user", user)
        // const token = localStorage.getItem('token');
        // console.log("🚀 ~ file: Login.jsx ~ line 104 ~ showLocalStorage ~ token", token)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            showPassword: false,
        },
        handleClickShowPassword: handleClickShowPassword,
        validate: loginValidation,
        // validateOnBlur: true,

        onSubmit: async (values) => {
            // console.log( JSON.stringify(values, null, 2) );
            const loginResult = await login(values);

            // console.log("login result: " + loginResult);
            // close modal
            props.loginClose();

            // save data
            // console.log(typeof(loginResult.data.user));
            // setUser( JSON.parse(loginResult.data.user) );
            // console.log(typeof(loginResult.data.token));
            await setToken(loginResult.data.token);
            await setUser(loginResult.data.user);
            
            // console.log(token);

            await localStorage.setItem("token", JSON.stringify(loginResult.data.token) );
            await localStorage.setItem("user", JSON.stringify(loginResult.data.user) );

            showLocalStorage();

            props.setLoggedIn(true);
        },
      });

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
                        <img src={loginImg} alt='Login'></img>
                    </LoginImage>
                </Grid>
                
                <Grid 
                    item 
                    xs={7}
                    container 
                    direction={'column'} 
                    spacing={1} 
                    justifyContent={'space-around'} 
                    // alignItems={'center'}
                    sx={{ padding: 3 }}
                >
                    <Grid item xs={2} >
                        <LoginTitle id="modal-modal-title" >
                            Welcome to Bookinglet!
                        </LoginTitle>
                    </Grid>
                    <Grid item sx={1}>
                        <LoginSubTitle >
                            Sign into your account
                        </LoginSubTitle>
                    </Grid>
                    
                    <Grid item xs={5} >
                        <LoginFormContainer component='form' onSubmit={formik.handleSubmit}>
                        
                            <LoginInputField 
                                variant='outlined' 
                                label="Email" 
                                name='email'
                                color='primary' 
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email || Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                             
                            <FormControl 
                                color='primary'
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
                            
                            <StaySignIn control={<Checkbox />} label="Stay sign in"/>

                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' ,alignContent:'center'}}>
                                <LoginButton 
                                    variant='contained'
                                    color='success'
                                    type="submit"
                                >
                                    Sign in
                                </LoginButton>
                            </Box>
                        
                        </LoginFormContainer>
                    </Grid>

                    
                    <Grid item xs={1} >
                        <Grid 
                            container spacing={1} 
                            direction='row' 
                            justifyContent='center' 
                            sx={{ mt: 2, fontStyle: 'italic'}}
                        >
                            <Grid item>
                                <Typography > Don't have an account? </Typography> 
                            </Grid>
                            <Grid item>
                                <Link onClick={converter} color='inherit'> Register </Link> 
                            </Grid>
                            <Grid item>
                                <Typography > now!</Typography> 
                            </Grid>
                        </Grid>
                    </Grid>
                            
                </Grid>
                    
            </Grid>
            
        </LoginModalBox>
    )
}