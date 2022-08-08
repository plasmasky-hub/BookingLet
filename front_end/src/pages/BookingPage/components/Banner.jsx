import styled from '@emotion/styled';
import food from '../../../assets/food.jpg';

const Banner = styled.div`
  width: 100%;
  height: 256px;
  background-image: url(${food});
  background-size: cover;
  border-radius: 10px 10px 0 0;
`;

export default Banner;
