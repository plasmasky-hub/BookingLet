import React from "react";
import SelectVariants from "../Filter";
import CustomizedInputBase from "../searchBar";
import styled from "styled-components";
import homebg from "../../../../assets/home-bg.jpg";
import "./styles.css";

const WrapperHomePage = styled.div`
  height: calc(100vh - 120px);
  width: 100vw;
  padding: 0 20px;
  max-height: 650px;
  box-sizing: border-box;
  /* background-color: yellow; */
  background-image: url(${homebg});
  background-repeat: no-repeat;
`;

const ContainerHomePage = styled.div`
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

const ButtonHomePage = styled.button`
  /* color: rgb(41, 43, 50); */
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

const Banner = () => (
  <WrapperHomePage>
    <ContainerHomePage>
      <LabelHomePage>What would you like to book today?</LabelHomePage>

      <SelectVariants />
      <CustomizedInputBase />

      <button type="button" className="button" onClick={() => {}}>
        SEARCH
      </button>
    </ContainerHomePage>
  </WrapperHomePage>
);

export default Banner;
