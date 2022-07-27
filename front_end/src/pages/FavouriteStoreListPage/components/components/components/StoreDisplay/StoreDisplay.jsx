import React from 'react';
import StoreCard from './StoreCard';
import styled from '@emotion/styled';


const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StoreDisplay = ({favoriteStores}) => {

    const RenderCard = favoriteStores.map((item) => {
      return <StoreCard item={item} key={item._id} />;
    });
  
    return <CardsWrapper >{RenderCard}</CardsWrapper>;
  };

export default StoreDisplay;