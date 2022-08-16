import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useFormik } from 'formik';
// import joiValidation from 'Joi';
import { loginValidation } from '../../../validation/SignInValidation';
import loginImg from '../../../assets/loginImg.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useEffect } from 'react';
import { useTheme } from '@emotion/react';

import { useLoginMutation } from '../../../store/api/userApi';

import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
} from '@mui/material';

// const newtheme = { ...theme };

const LoginModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(47, 68, 73, 0.5)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  boxShadow: '24px',
  color: 'white',
  display: 'flex',


  [theme.breakpoints.down('sm')]: {
    width: '300px',
    height: '80vh',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '500px',
    height: '80vh',
  },
  [theme.breakpoints.between('md', 'lg')]: {
    width: '800px',
    // height: '500px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '900px',
    // height: '503px',
  },

}));

const LoginFormContainer = styled(Box)`
  border-radius: 25px;
`;

const LoginImage = styled(Box)`
  font-size: 0.6rem;
  height: 100%;
  width: 100%;
  background-image: url(${loginImg});
  background-size: cover;
  background-repeat: no-repeat;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-position: center;

  /* img {
    // height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: left;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  } */
`;
const LoginTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '35px',
  fontWeight: '600',
  marginTop: '20px',
  textShadow: '1px 1px 5px black',

  [theme.breakpoints.down('md')]: {
    marginTop: '0px',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '0px',
    fontSize:'26pt',
  },
}));

const LoginSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  fontWeight: '300',
  marginBottom: '10px',
  textShadow: '1px 0px 3px black',

  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    fontWeight: '200',
    marginBottom: '10px',  
  },
}))

const LoginInputField = styled(TextField)`
  margin-top: 15px;
  margin-bottom: 20px;
  width: 100%;
`;

const TextFieldStyle = {
  mt: 2,
  width: '100%',
};

const StaySignIn = styled(FormControlLabel)`
  margin-top: 10px;
  width: 100%;
`;

const LoginButton = styled(Button)(({ theme }) => ({
  /* background-color: #ececea; */
  height: '80%',
  fontSize: '1.3rem',
  borderRadius: '5px',
  backgroundColor: '#7b8b6f',

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },

}));

export const LoginModal = (props) => {
  const [login, { isLoading }] = useLoginMutation();
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  // const [isLogin, setIsLogin] = useState('false');

  const theme = useTheme();
  const showImg = useMediaQuery(theme.breakpoints.down('md'));


  const handleClickShowPassword = () => {
    formik.setValues({
      ...formik.values,
      showPassword: !formik.values.showPassword,
    });
  };

  useEffect(() => {
    localStorage.setItem('user', user);
  }, [user]);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const converter = () => {
    props.loginClose();
    props.registerOpen();
  };

  const showLocalStorage = () => {
    // const user = localStorage.getItem('user');
    // console.log("🚀 ~ file: Login.jsx ~ line 102 ~ showLocalStorage ~ user", user)
    // const token = localStorage.getItem('token');
    // console.log("🚀 ~ file: Login.jsx ~ line 104 ~ showLocalStorage ~ token", token)
  };

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
      console.log(loginResult);

      if (loginResult.error) {
        var error = JSON.stringify(loginResult.error.data.error);
        console.log(
          '🚀 ~ file: Login.jsx ~ line 168 ~ onSubmit: ~ error',
          error
        );

        alert(error);
      } else {
        // close modal
        props.loginClose();

        // save data
        // console.log(typeof(loginResult.data.user));
        // setUser( JSON.parse(loginResult.data.user) );
        // console.log(typeof(loginResult.data.token));
        await setToken(loginResult.data.token);
        await setUser(loginResult.data.user);

        // console.log(token);

        await localStorage.setItem(
          'token',
          JSON.stringify(loginResult.data.token)
        );
        await localStorage.setItem(
          'user',
          JSON.stringify(loginResult.data.user)
        );
        // await localStorage.setItem('loggedIn', true);

        showLocalStorage();

        props.setLoggedIn(true);
      }
    },
  });

  if (isLoading) {
    return <LoginModalBox>Loading</LoginModalBox>;
  }

  return (
    <LoginModalBox>
      <Grid container spacing={0} alignItems="stretch">
        <Grid item xs={0} md={5}>
          { showImg ? null 
          : (
              <LoginImage>
                {/* <img src={loginImg} alt="Login"></img> */}
              </LoginImage>
            )}
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          container
          direction={'column'}
          spcaing-md-1
          spacing={0}
          justifyContent={'space-around'}
          // alignItems={'center'}
          sx={{ padding: 3 }}
        >
          <Grid item xs={2}>
            <LoginTitle id="modal-modal-title">
              Welcome to Bookinglet!
            </LoginTitle>
          </Grid>
          <Grid item sx={1}>
            <LoginSubTitle>Sign into your account</LoginSubTitle>
          </Grid>

          <Grid item xs={5}>
            <LoginFormContainer component="form" onSubmit={formik.handleSubmit}>
              <LoginInputField
                variant="outlined"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email || Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '4px',
                  },
                }}
              />

              <FormControl
                color="primary"
                sx={TextFieldStyle}
                // error={
                //   formik.touched.password || Boolean(formik.errors.password)
                // }
              >
                <TextField
                  variant="outlined"
                  label="Password"
                  name="password"
                  type={formik.values.showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          name="showPassword"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {formik.values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: '4px',
                    },
                  }}
                />
              </FormControl>

              <StaySignIn control={<Checkbox />} label="Stay sign in" />

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <LoginButton variant="contained" color="success" type="submit">
                  Sign in
                </LoginButton>
              </Box>
            </LoginFormContainer>
          </Grid>

          <Grid item xs={1}>
            <Grid
              container
              // spacing-md-1
              spacing={0}
              direction="row"
              justifyContent="center"
              display={'flex'}
              sx={{ mt: 2, fontStyle: 'italic' }}
            >
              <Grid item xs={12}>
                <Typography> Don't have an account? </Typography>
              </Grid>
              <Grid item xs={6}>
                <Link onClick={converter} color="inherit">
                  {' '}
                  Register{' '}
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Typography> now!</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LoginModalBox>
  );
};
