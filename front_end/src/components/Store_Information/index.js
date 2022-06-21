import React from "react";
import styled from "styled-components";
import StoreText from "./components/StoreInfText/StoreInfText";
import StoreSmallText from "./components/StoreInfSmallText/StoreSmallText";

const Wrapper = styled.div`
  width: 1233px;
  height: 964px;
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
  width: 397px;
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

const StoreInf = () => (
  <Wrapper>
    <Title>Store Information</Title>
    <Container>
      <StoreText />
      <StoreText />
      <StoreText />
    </Container>

    <ContainerSmallText>
      <StoreSmallText />
      
    </ContainerSmallText>
  </Wrapper>
);

export default StoreInf;
