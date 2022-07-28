import React from 'react';
import styled from 'styled-components';
import vectorimg from '../../../../assets/vectorbackground.png'

const VecImg = styled.div`
position: absolute;
right: 5vh;
top: 22vh;
margin-right: 100px;
margin-bottom:100px;
display:absolute;
width: 15vw;
height:20vh;
/* background-color: #000000; */
background-image: url(${vectorimg});
background-size: cover;


`;
const BannerWrapper = styled.div`
  /* height: calc(100vh - 120px); */
  height:40vh;
  margin: -25px auto;
  /* padding: 0 20px; */
  max-height: 650px;
  box-sizing: border-box;
  background-color:#85B7AB;
  color: #FFFFFF;
  display:relative;
`;

const BannerContainer = styled.div`
  position: relative;
  padding-left: 200px;
  padding-top: 150px;
 
`;

const TitleOfUs =styled.div`
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 53px;
    margin-bottom:20px;
`
const SubTitleOfUs = styled.div`
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;

  color: #FFFFFF;
`

// const LabelHomePage = styled.div`
//   color: rgb(41, 43, 50);
//   font-family: museo-bold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande',
//     sans-serif;
//   font-size: 24px;
//   font-weight: bold;
//   line-height: 32px;
//   letter-spacing: -0.15px;
//   width: 374px;
//   height: 46px;
// `;

const TopBanner = () => (
    <BannerWrapper >
      <BannerContainer>
        <TitleOfUs color='#ececea'>Meet Our Team</TitleOfUs>  
        <SubTitleOfUs>Get to know our talented team with Developers and DevOps</SubTitleOfUs>
        <VecImg/>
      </BannerContainer>
    </BannerWrapper>
  );
  
  export default TopBanner;