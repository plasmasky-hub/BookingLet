import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  width: 100%;
  height: 376px;
  padding: 0 20px;
  max-height: 650px;
  box-sizing: border-box;
  /* background-color: yellow; */
  margin-top: 100px;
  margin: 0 auto;
  background: #d9d9d9;
  /* background-image: url(../../assets/img/p.jpg);
  background-repeat: no-repeat; */
`;
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 800px;
  margin: 0 auto;
  padding-top: 100px;
`;
const Discover = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
`;
const Category = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 124px;
  height: 122px;
  font-family: "Helvetica Light";
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
  margin-top: 10px;
`;

const CategoryAbout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 124px;
  height: 70px;
  font-family: "Helvetica Light";
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
  margin-top: 10px;
`;

const Text = styled.div`
  display: flex;
  margin-left: 500px;
  margin-top: 60px;
`;
const TextLeft = styled.div`
  padding-left: 15px;
`;
const TextIcon = styled.div`
  padding-left: 15px;
`;

const Footer = () => (
  <FooterWrapper>
    <FooterContainer>
      <Discover>
        <Title>Discover</Title>
        <Category>
          <div>Dining</div>
          <div>Entertainment</div>
          <div>Health&Beauty</div>
          <div>Life Service</div>
          <div>All Businesses</div>
        </Category>
      </Discover>
      <div>
        <Title>About Us</Title>
        <CategoryAbout>
          <div>Contact</div>
          <div>Join Our Team</div>
          <div>Blog</div>
        </CategoryAbout>
      </div>
      <Discover>
        <Title>Discover</Title>
        <Category>
          <div>Dining</div>
          <div>Entertainment</div>
          <div>Health&Beauty</div>
          <div>Life Service</div>
          <div>All Businesses</div>
        </Category>
      </Discover>
      <Discover>
        <Title>Discover</Title>
        <Category>
          <div>Dining</div>
          <div>Entertainment</div>
          <div>Health&Beauty</div>
          <div>Life Service</div>
          <div>All Businesses</div>
        </Category>
      </Discover>
    </FooterContainer>

    <Text>
      <TextLeft>Terms of use </TextLeft>
      <TextIcon>|</TextIcon>
      <TextLeft>Privacy </TextLeft>
      <TextIcon>|</TextIcon>
      <TextLeft>@2022Bookinglet</TextLeft>
    </Text>
  </FooterWrapper>
);

export default Footer;
