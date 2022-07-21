import React from 'react';
import StoreCard from './StoreCard';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useGetStoresQuery } from '../../../../../../store/api/storeApi';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Container = styled.div`
  width: 1065px;
  margin: 60px auto;
  font-family: Helvetica;
`;



const ViewButton = styled(Button)`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 3px;
  color: #000;
`;

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