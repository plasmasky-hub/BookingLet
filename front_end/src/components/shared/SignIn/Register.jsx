import styled from '@emotion/styled';
import React from 'react';
import { useFormik } from 'formik';
// import joiValidation from 'Joi';
import { registerValidation } from '../../../validation/SignInValidation';
import loginImg from '../../../assets/loginImg.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const RegisterModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  background: rgba(47, 68, 73, 0.5);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  width: 900px;
  height: 593px;

  border-radius: 10px;
  box-shadow: 24px;

  color: white;
`;

const RegisterTextContainer = styled(Box)`
  border-radius: 25px;
`;

const RegisterImage = styled(Box)`
  font-size: 0.6rem;
  height: 100%;
  width: 100%;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: left;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;
const RegisterTitle = styled(Typography)`
  color: white;
  font-size: 35px;
  font-weight: 600;
  margin-top: 5px;
  text-shadow: 1px 1px 5px black;
`;

const RegisterSubTitle = styled(Typography)`
  font-size: 25px;
  font-weight: 300;
  /* margin-bottom: 10px; */
  text-shadow: 1px 0px 3px black;
`;

const RegisterInputField = styled(TextField)`
  color: white;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
`;

const TextFieldStyle = {
  mt: 2,
  width: '100%',
};

const RoleLabel = styled(Typography)`
  justify-content: center;
  font-size: 1rem;
  align-content: center;
  align-items: center;
`;

const RegisterButton = styled(Button)`
  margin-top: 12px;
  height: 80%;
  width: 300px;
  font-size: 1.3rem;
  border-radius: 5px;
  background-color: #7b8b6f;
`;

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
  };

  const [register, { isLoading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      tel: '',
      email: '',
      password: '',
      role: 'Customer',
      showPassword: false,
    },

    handleClickShowPassword: handleClickShowPassword,
    validate: registerValidation,
    validateOnBlur: true,

    onSubmit: async (values) => {
        // alert("Register successful!");
        // alert(JSON.stringify(values, null, 2));
        const registerResult = await register(values);

        console.log(registerResult);
        if (Boolean(registerResult.data.user)) {
            props.registerClose();
            props.loginOpen();
        } else {
            alert(JSON.stringify(registerResult.error.data));
        }
        // refresh page
    },
  });

  if (isLoading) {
    return <RegisterModalBox>Loading</RegisterModalBox>;
  }

  return (
    <RegisterModalBox>
      <Grid container spacing={0} alignItems="stretch">
        <Grid item xs={5}>
          <RegisterImage>
            <img src={loginImg} alt="Login"></img>
          </RegisterImage>
        </Grid>

        <Grid item xs={7} sx={{ padding: 3 }}>
          <Grid container spacing={1} direction={'column'}>
            <Grid item xs={1}>
              <RegisterTitle id="modal-modal-title">
                Welcome to Bookinglet!
              </RegisterTitle>
            </Grid>
            <Grid item xs={1}>
              <RegisterSubTitle>Register your account</RegisterSubTitle>
            </Grid>

            <Grid item xs={8}>
              <RegisterTextContainer
                component="form"
                onSubmit={formik.handleSubmit}
              >
                <RegisterInputField
                  variant="outlined"
                  label="Name"
                  name="name"
                  color="primary"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name || Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

                <RegisterInputField
                  variant="outlined"
                  label="Tel"
                  name="tel"
                  color="primary"
                  value={formik.values.tel}
                  onChange={formik.handleChange}
                  error={formik.touched.tel || Boolean(formik.errors.tel)}
                  helperText={formik.touched.tel && formik.errors.tel}
                />

                <RegisterInputField
                  variant="outlined"
                  label="Email"
                  name="email"
                  color="primary"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email || Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <FormControl
                  color="primary"
                  sx={TextFieldStyle}
                  error={
                    formik.touched.password || Boolean(formik.errors.password)
                  }
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    label="Password"
                    name="password"
                    type={formik.values.showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    endAdornment={
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
                    }
                  />
                </FormControl>

                <Grid container sx={{ mt: 2 }} justifyContent="center">
                  <Grid item xs={3}>
                    <RoleLabel>Role</RoleLabel>
                  </Grid>
                  <Grid item xs={8}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Customer"
                      name="role"
                      row
                    >
                      <FormControlLabel
                        value="Customer"
                        control={<Radio />}
                        label="Customer"
                        onChange={formik.handleChange}
                      />
                      <FormControlLabel
                        value="Business owner"
                        control={<Radio />}
                        label="Business owner"
                        onChange={formik.handleChange}
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <RegisterButton
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    Register
                  </RegisterButton>
                </Box>
              </RegisterTextContainer>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            sx={{ mt: 1, fontStyle: 'italic' }}
          >
            <Grid item>
              <Typography> Already a member ? </Typography>
            </Grid>
            <Grid item>
              <Link onClick={converter} color="inherit">
                {' '}
                Sign in{' '}
              </Link>
            </Grid>
            <Grid item>
              <Typography> now!</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RegisterModalBox>
  );
};
