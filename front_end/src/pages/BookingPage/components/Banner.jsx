import React from 'react';
import styled from '@emotion/styled';
import food from '../../../assets/food.jpg';

const BannerWrapper = styled.div`
  width: 100%;
  height: 256px;
  background-image: url(${food});
  background-size: cover;
  border-radius: 10px;
`;

const Banner = () => {
  return <BannerWrapper></BannerWrapper>;
};

export default Banner;
