import { TextField } from '@mui/material';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputAdornment from '@mui/material/InputAdornment';
import { ModeEditOutline } from '@mui/icons-material';

// const StoreName = styled.div`
//   width: 184px;
//   height: 20px;
//   left: 184px;
//   top: 250px;
//   font-family: 'Helvetica';
//   font-style: normal;
//   font-weight: 700;
//   font-size: 15px;
//   line-height: 20px;
//   /* margin-bottom: 1px; */
// `;

const Text = styled(TextField)`
  width: 397px;
  background: #d9d9d9;
  border-radius: 5px;
  padding: 0;
`;

const StoreInfText = () => (
  <Fragment>
    <Text
      hiddenLabel
      id="input-with-icon-textfield"
      defaultValue="Han’s Massage"
      variant="filled"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ModeEditOutline />
          </InputAdornment>
        ),
        disableUnderline:true
      }}
    />
  </Fragment>
);

export default StoreInfText;
