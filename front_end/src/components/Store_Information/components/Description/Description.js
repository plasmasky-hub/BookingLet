import { TextField } from '@mui/material';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputAdornment from '@mui/material/InputAdornment';
import { ModeEditOutline } from '@mui/icons-material';

const StoreName = styled.div`
  width: 84px;
  height: 20px;
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  padding-bottom: 30px;
`;

const Text = styled(TextField)`
  width: 397px;
  height: 184px;
  background: #d9d9d9;
  border-radius: 5px;
  padding: 0;
`;

const Container = styled.div`
  margin-left: 90px;
`;

const Description = () => (
  <Container>
    <StoreName>Description</StoreName>
    <Text
      hiddenLabel
      id="input-with-icon-textfield"
      defaultValue="Han’s Massage"
      variant="filled"
      InputProps={{
        style:{
          height:"184px",
          paddingTop:"20px",
        }
      }}
    />
  </Container>
);

export default Description;
