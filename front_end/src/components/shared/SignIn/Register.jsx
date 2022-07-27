import styled from '@emotion/styled';
import React from 'react';
import { useFormik } from 'formik';
// import joiValidation from 'Joi';
import { registerValidation } from '../../../validation/SignInValidation'
import loginImg from '../../../assets/loginImg.png';
import { 
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';

import { useRegisterMutation } from '../../../store/api/userApi';

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

const RegisterModalBox = styled(Box)`
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

const RegisterTextContainer = styled(Box)`
    border-radius: 25px;
`

const RegisterImage = styled(Box)`
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

const RegisterInputField = styled(TextField)`
    margin-top: 5px;
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

const RegisterButton = styled(Button)`
    margin-top: 32px;
	width: 200px;
`

export const RegisterModal = (props) => {

    const handleClickShowPassword = () => {
		formik.setValues({
		...formik.values,
		showPassword: !formik.values.showPassword,
		});
	};

    const converter = () => {
        props.registerClose();
        props.loginOpen();
    }

    const [register, { isLoading }] = useRegisterMutation();

    const formik = useFormik({
        initialValues: {
            name: '',
            tel: '',
            email: '',
            password: '',
            showPassword: false,
        },

        handleClickShowPassword: handleClickShowPassword,
        validate: registerValidation,
        validateOnBlur: true,

        onSubmit: async (values) => {
            console.log( JSON.stringify(values, null, 2) );
            const registerResult = await register(values);

            console.log(registerResult);
            // refresh page
            props.registerClose();
            props.loginOpen();
        },
      });

    if( isLoading ) {
        return <RegisterModalBox>
            Loading
        </RegisterModalBox>
    }

    return (

        <RegisterModalBox >
            <Grid container spacing={0} alignItems="stretch">
                <Grid item xs={5} >
                    <RegisterImage>
                        <img src={loginImg} alt='Login'></img>
                    </RegisterImage>
                </Grid>
                
                <Grid item xs={7} sx={{ padding: 3 }}>
                    <Typography id="modal-modal-title" variant="h5" component="h5">
                        Welcome to Bookinglet!
                    </Typography>

                    <RegisterTextContainer component='form' onSubmit={formik.handleSubmit}>

                        <RegisterInputField 
                            variant='outlined' 
                            label="Name" 
                            name='name'
                            color='success' 
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name || Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        {formik.errors.name 
                            ? <ErrorMessage>{formik.errors.name}</ErrorMessage> 
                            : null
                        }

                        <RegisterInputField 
                            variant='outlined' 
                            label="Tel" 
                            name='tel'
                            color='success' 
                            value={formik.values.tel}
                            onChange={formik.handleChange}
                            error={formik.touched.tel || Boolean(formik.errors.tel)}
                            helperText={formik.touched.tel && formik.errors.tel}
                        />
                        {formik.errors.tel 
                            ? <ErrorMessage>{formik.errors.tel}</ErrorMessage> 
                            : null
                        }

                        <RegisterInputField 
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
                            <RegisterButton 
                                variant='contained'
                                color='success'
                                type="submit"
                            >
                                Register
                            </RegisterButton>
                        </Box>
                    </RegisterTextContainer>
                        

                        

                    <Grid container spacing={1} 
                        direction='row' 
                        justifyContent='center' 
                        sx={{ mt: 2, fontStyle: 'italic'}}>
                        <Grid item>
                            <Typography > Already a member ? </Typography> 
                        </Grid>
                        <Grid item>
                            <Link onClick={converter} color='inherit'> Sign in </Link> 
                        </Grid>
                        <Grid item>
                            <Typography > now!</Typography> 
                        </Grid>
                    </Grid>
                            
                </Grid>
                    
            </Grid>
            
        </RegisterModalBox>
    )
}