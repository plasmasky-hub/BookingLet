import React from 'react';
import StoreCard from './StoreCard';
import { Container } from '@mui/system';
import styled from '@emotion/styled';
import Data from './Data';

const ListWrapper = styled(Container)`
  max-width: 1024px;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 1px;
`;

const StoreDisplay = () => {
  const RenderCard = Data.map((item) => {
    return <StoreCard item={item} />;
  });

  return <ListWrapper>{RenderCard}</ListWrapper>;
};

export default StoreDisplay;
