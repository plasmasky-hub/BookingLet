import { TextField } from "@mui/material";
import React, { Fragment } from "react";
import styled from "styled-components";
import InputAdornment from '@mui/material/InputAdornment';
import { ModeEditOutline } from "@mui/icons-material";

const SmallTextWrapper = styled.div`
  width: 400px;
  height: 60px;
`;

const StoreName = styled.div`
  width: 84px;
  height: 20px;
  left: 184px;
  top: 250px;
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 5px;
`;

const Text = styled(TextField)`
  width: 138px;
  background: #d9d9d9;
  border-radius: 5px;
  padding: 0;
  margin-top: 15px;
`;

const StoreSmallText = () => (
  <Fragment>
    {/* <StoreName>City</StoreName> */}
    <Text
      hiddenLabel
      id="input-with-icon-textfield"
      defaultValue="Sydney"
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

export default StoreSmallText;
