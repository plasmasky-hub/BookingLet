import { Card, CardContent, CardMedia, Button } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import AddIcon from './AddIcon';
import food from '../../../../assets/food.jpg';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)`
  display: flex;
  max-width: 580px;
  padding: 15px;
  gap: 20px;
`;

const Img = styled(CardMedia)`
  max-width: 180px;
`;

const Content = styled(CardContent)`
  position: relative;
  padding: 0;
  h4 {
    margin: 0 0 8px 0;
  }
  span,
  p {
    font-size: 12px;
    color: #595959;
  }
  p {
    margin-bottom: 18px;
  }
`;

const CardButton = styled(Button)`
  font-size: 10px;
  background-color: #d18e8e;
  border-radius: 50px;
  font-weight: 600;
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
`;

const StoreCard = ({
  item: { _id, name, location, favoriteUsersSize, description },
}) => {
  const { state, city, postcode } = location;
  const address = `${postcode} ${city} ${state}`;

  const navigate = useNavigate();

  return (
    <StyledCard variant="outlined" sx={{ m: 1 }}>
      {/* need data */}
      <Img component="img" image={food} alt="" />
      <Content>
        <h4>{name}</h4>
        <span>{`${address} | ${favoriteUsersSize} people add to booklet`}</span>
        <p>{description}</p>
        <AddIcon />
        <CardButton
          onClick={() => navigate(`/BookingPage/${_id}`)}
          variant="contained"
          size="small"
        >
          Learn more
        </CardButton>
      </Content>
    </StyledCard>
  );
};

export default StoreCard;
