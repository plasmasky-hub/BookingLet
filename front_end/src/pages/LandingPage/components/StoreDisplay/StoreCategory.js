import React from 'react';
import StoreCard from './StoreCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 80%;
  margin: 60px auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ViewButton = styled.a`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 3px;
  text-decoration: none;
  color: #000;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
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
          view <ArrowForwardIcon />
        </ViewButton>
      </Header>
      <CardsWrapper>{renderedCard}</CardsWrapper>
    </Container>
  );
};

export default StoreCategory;
