import React from "react";
// import styled from "styled-components";
import StoreText from "./components/StoreInfText/StoreInfText";
import StoreSmallText from "./components/StoreInfSmallText/StoreSmallText";
import StoreInfFilter from "./components/StoreInfFilter/StoreInfFilter";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import Description from "./components/Description/Description";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const Wrapper = styled.div`
  width: 1233px;
  height: 1204px;
  /* height: 964px; */
  background-color: azure;
  margin-left: 97px;
  margin-top: 38px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 87px;
  /* padding-top: 157px; */
  padding-top: 117px;
  /* height: 429px; */
  height: 430px;
`;

const ContainerSmallText = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 87px;
  padding-top: 117px;
  /* width: 397px; */
  width: 422px;
  margin-top: -100px;
`;

const Title = styled.div`
  position: absolute;
  width: 201px;
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

const StoreInfButton1 = styled(Button)`
  width: 92px;
  height: 34px;
  background-color: #d3ac72;
  &:hover {
    background: #d3ac72;
  }
`;

const StoreInfButton2 = styled(Button)`
  width: 92px;
  height: 34px;
`;

const ButtonContainer = styled(Button)`
  width: 250px;
  margin-top: 30px;
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

const PhotoMenu = styled.div`
  width: 478px;
  height: 100px;
  margin-left: 88px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
`;

const Photo = styled.div`
  width: 237px;
  height: 168px;
  margin-left: 88px;
  margin-bottom: 40px;
  background-color: #d9d9d9;
`;

const PhotoContainer = styled.div`
  width: 237px;
  height: 200px;
  margin-left: 628px;
  margin-top: 98px;
  position: absolute;
`;

const CheckboxContainer = styled(Button)`
  margin-left: 70px;
  margin-top: 10px;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StoreInf = () => (
  <Wrapper>
    <Title>Store Information</Title>
    <PhotoContainer>
      <StoreInfName>Photo</StoreInfName>
      <Photo />
    </PhotoContainer>
    <Container>
      <StoreText />
      <StoreText />
      <StoreText />
    </Container>

    <ContainerSmallText>
      <StoreSmallText />
      <StoreInfFilter />
      <StoreSmallText />
    </ContainerSmallText>

    <CategoryFilter />

    <StoreInfName>Photos of menu (Optional)</StoreInfName>
    <PhotoMenu />

    <Description />
    <CheckboxContainer>
      <Checkbox {...label} defaultChecked />
      I have read and agree to the Terms & Conditions of Bookinglet
    </CheckboxContainer>
    <ButtonContainer>
      <StoreInfButton1
        variant="contained"
        // sx={{
        //   bgcolor: '#D3AC72',
        // }}
      >
        Preview
      </StoreInfButton1>

      <StoreInfButton2 variant="contained">Save</StoreInfButton2>
    </ButtonContainer>
  </Wrapper>
);

export default StoreInf;
