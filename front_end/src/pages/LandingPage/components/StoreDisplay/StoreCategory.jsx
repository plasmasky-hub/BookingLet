import React from 'react';
import StoreCard from './StoreCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const Container = styled.div`
  width: 1065px;
  margin: 60px auto;
  font-family: Helvetica;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  text-shadow: 0 3px 1px #d5d5d5;
  h2 {
    font-size: 22px;
    font-weight: 500;
  }
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
  justify-content: space-between;
`;

const StoreCategory = ({ category, cardData }) => {
  const renderedCard = cardData.map((data) => {
    return <StoreCard data={data} />;
  });

  return (
    <Container>
      <Header>
        <h2>{category}</h2>
        <ViewButton href="#">
          view all <ArrowForwardIcon fontSize="small" />
        </ViewButton>
      </Header>
      <CardsWrapper>{renderedCard}</CardsWrapper>
    </Container>
  );
};

export default StoreCategory;
