import { TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import InputAdornment from '@mui/material/InputAdornment';
import { ModeEditOutline } from "@mui/icons-material";

const Wrapper = styled.div`
  width: 400px;
  height: 60px;
`;

const StoreName = styled.div`
  width: 84px;
  height: 20px;
  left: 184px;
  top: 250px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  padding-bottom: 20px;
`;

const Text = styled(TextField)`
  width: 138px;
  background: #d9d9d9;
  border-radius: 5px;
  padding: 0;
  /* padding-top: 30px; */
`;

// const Text = styled.div`
//   width: 397px;
//   height: 34px;
//   background: #d9d9d9;
//   border-radius: 5px;
// `;

const Img = styled.div`
  background: url(../../../../assets/edit\ 3.png);
`;

const StoreSmallText = () => (
  <Wrapper>
    <StoreName>City</StoreName>
    <Text
      hiddenLabel
      id="input-with-icon-textfield"
      defaultValue="Han’s Massage"
      variant="filled"
      inputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <ModeEditOutline />
          </InputAdornment>
        ),
        style:{
          height:"13px",
          paddingTop:"20px"
        }
      }}
    />
  </Wrapper>
);

export default StoreSmallText;
