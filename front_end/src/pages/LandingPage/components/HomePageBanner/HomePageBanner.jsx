import React from "react";
import SelectVariants from "../Filter";
import CustomizedInputBase from "../searchBar";
import styled from "styled-components";
import homebg from "../../../../assets/home-bg.jpg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const BannerWrapper = styled.div`
  height: calc(100vh - 120px);
  width: 100vw;
  padding: 0 20px;
  max-height: 650px;
  box-sizing: border-box;
  /* background-color: yellow; */
  background-image: url(${homebg});
  background-repeat: no-repeat;
`;

const BannerContainer = styled.div`
  margin-left: 200px;
  padding-top: 200px;
`;

const LabelHomePage = styled.div`
  color: rgb(41, 43, 50);
  font-family: museo-bold, "Helvetica Neue", Helvetica, Arial, "Lucida Grande",
    sans-serif;
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  letter-spacing: -0.15px;
  width: 374px;
  height: 46px;
`;
// const BannerButton = styled(Button)({
//   marginTop: 15,
//   width: 165,
//   height: 47,
// });

const BannerButton = styled(Button)`
  width: 165px;
  height: 47px;
  margin-top: 30px;
  background-color: #6a3030;
  border-style: none;
  cursor: pointer;
  border-radius: 10px;
`;

// const BannerButton = styled(Button)({
//   width: 165,
//   height: 47,
//   marginTop: 100,
// });

// const BannerButton = styled.button`
//   width: 165px;
//   height: 47px;
//   margin-top: 20px;
//   /* margin-left: 5px; */
//   background-color: #D18E8E;
//   border-style:none;
//   cursor: pointer;
//   border-radius: 10px;
// `;

const Banner = () => (
  <BannerWrapper>
    <BannerContainer>
      <LabelHomePage>What would you like to book today?</LabelHomePage>

      <SelectVariants />
      <CustomizedInputBase />

      <BannerButton
        variant="contained"
        disableRipple
        sx={{
          bgcolor: "#D18E8E",
          marginTop: "50"
        }}
      >
        SEARCH
      </BannerButton>

      {/* <BannerButton onClick={() => {}}>SEARCH</BannerButton> */}
    </BannerContainer>
  </BannerWrapper>
);

export default Banner;
