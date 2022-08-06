import React from "react";
// import styled from "styled-components";
import StoreInfText from "../StoreSetting/components/StoreInfText/StoreInfText";
import StoreSmallText from "../StoreSetting/components/StoreInfSmallText/StoreSmallText";
import StoreInfFilter from "../StoreSetting/components/StoreInfFilter/StoreInfFilter";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const StoreInfWrapper = styled.div`
  width: 1233px;
  height: 962px;
  background-color: #fbfbfb;
  margin-left: 97px;
  margin-top: 38px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 87px;
  padding-top: 117px;
  height: 550px;
`;

const StoreName = styled.div`
  width: 284px;
  height: 20px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
`;

const WholeContainer = styled.div`
  padding-top: 50px;
  margin-left: 90px;
`;

const SmallTextContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 87px;
  padding-top: 117px;
  width: 422px;
  margin-top: -100px;
`;

const Title = styled.div`
  position: absolute;
  width: 301px;
  height: 32px;
  margin-left: 85px;
  padding-top: 40px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
`;

const StoreInfButton = styled(Button)`
  width: 92px;
  height: 34px;
  background-color: ${(props) => (props.left ? "#D76D6D" : "#7B8B6F")};
  &:hover {
    background: ${(props) => (props.left ? "#D76D6D" : "#7B8B6F")};
  }
`;

const ButtonContainer = styled(Button)`
  width: 250px;
  margin-top: 20px;
  margin-left: 480px;
  display: flex;
  justify-content: space-around;
`;

const StoreInfName = styled.div`
  margin-left: 88px;
  margin-top: 20px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  padding-bottom: 10px;
`;

const Photo = styled.div`
  width: 154px;
  height: 100px;
  margin-left: 88px;
  margin-bottom: 40px;
  background-color: #d9d9d9;
`;

const PhotoContainer = styled.div`
  width: 154px;
  height: 100px;
  margin-left: 628px;
  margin-top: 98px;
  position: absolute;
`;

const CheckboxContainer = styled(Button)`
  margin-left: 70px;
  margin-top: 20px;
  color: #397cc2;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PersonalSetting = () => (
  <StoreInfWrapper>
    <WholeContainer>
      <Title>My Profile</Title>
      <PhotoContainer>
        <StoreInfName>Photo</StoreInfName>
        <Photo />
      </PhotoContainer>
      <TopContainer>
        <StoreName>First Name</StoreName>
        <StoreInfText />
        <StoreName>Last Name</StoreName>
        <StoreInfText />
        <StoreName>Mobile</StoreName>
        <StoreInfText />
        <StoreName>E-mail</StoreName>
        <StoreInfText />
      </TopContainer>

      <SmallTextContainer>
        <StoreSmallText />
        <StoreInfFilter />
        <StoreSmallText />
      </SmallTextContainer>

      <CheckboxContainer>
        <Checkbox {...label} defaultChecked />I have read and agree to the Terms
        & Conditions of Bookinglet
      </CheckboxContainer>
      <ButtonContainer>
        <StoreInfButton left variant="contained">
          Preview
        </StoreInfButton>

        <StoreInfButton variant="contained">Save</StoreInfButton>
      </ButtonContainer>
    </WholeContainer>
  </StoreInfWrapper>
);

export default PersonalSetting;
