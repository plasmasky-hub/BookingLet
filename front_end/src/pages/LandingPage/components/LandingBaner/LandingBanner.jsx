import React from 'react';
import BanerInputs from './BannerInputs';
import CustomizedInputBase from '../SearchBar';
import styled from 'styled-components';
import homebg from '../../../../assets/home-bg.jpg';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BannerWrapper = styled.div`
  height: calc(100vh - 120px);
  width: 100vw;
  padding: 0 20px;
  max-height: 650px;
  box-sizing: border-box;
  background-image: url(${homebg});
  background-repeat: no-repeat;
`;

const BannerContainer = styled.div`
  margin-left: 200px;
  padding-top: 200px;
`;

const LabelHomePage = styled.div`
  color: rgb(41, 43, 50);
  font-family: museo-bold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
    sans-serif;
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  letter-spacing: -0.15px;
  width: 374px;
  height: 46px;
`;

const BannerButton = styled(Button)`
  width: 165px;
  height: 47px;
  border-style: none;
  cursor: pointer;
`;

const LandingBanner = () => (
  <BannerWrapper>
    <BannerContainer>
      <LabelHomePage>What would you like to book today?</LabelHomePage>

      <BanerInputs />
      <CustomizedInputBase />

      <BannerButton
        variant="contained"
        disableRipple
        sx={{
          mt: 3,
        }}
      >
        SEARCH
      </BannerButton>
      {/* <BannerButton onClick={() => {}}>SEARCH</BannerButton> */}
    </BannerContainer>
  </BannerWrapper>
);

export default LandingBanner;