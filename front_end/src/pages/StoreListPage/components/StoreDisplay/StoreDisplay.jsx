import React from 'react';
import StoreCard from './StoreCard';
import { Container } from '@mui/system';
import styled from '@emotion/styled';

const ListWrapper = styled(Container)`
  max-width: 1024px;
  margin: 100px auto 50px auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 1px;
`;

const StoreDisplay = ({ stores }) => {
  const RenderCard = stores.map((item) => {
    return <StoreCard item={item} key={item._id} />;
  });

  return <ListWrapper>{RenderCard}</ListWrapper>;
};

export default StoreDisplay;
