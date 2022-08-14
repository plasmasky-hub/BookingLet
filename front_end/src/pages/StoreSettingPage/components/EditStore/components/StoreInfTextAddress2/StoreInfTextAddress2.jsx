import { TextField } from '@mui/material';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputAdornment from '@mui/material/InputAdornment';
import { ModeEditOutline } from '@mui/icons-material';

const Text = styled(TextField)`
  width: 397px;
  background: #d9d9d9;
  border-radius: 5px;
  padding: 0;
`;

const StoreInfTextAddress2 = (
  {address2,Form,setForm}
) => (
  <Fragment>
    <Text
      hiddenLabel
      id="input-with-icon-textfield"
      // defaultValue="Han’s Massage"
      defaultValue={address2}
      variant="filled"
      onChange={(e) =>
        setForm({
          ...Form,
          address2: e.target.value,
        })
      }
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

export default StoreInfTextAddress2;
