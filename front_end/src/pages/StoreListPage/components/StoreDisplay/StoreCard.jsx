import { Card, CardContent, CardMedia, Button } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import AddIcon from './AddIcon';
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
    margin-bottom: -5px;
  }
  p {
    font-size: 12px;
    color: #595959;
  }
  p {
    margin-bottom: 18px;
  }
`;

const StyledSpan = styled.span`
  font-size: 12px;
  color: #595959;
  display: inline-block;
  margin-bottom: 10px;
`;

const AvlLabel = styled.span`
  font-size: 11px;
  padding: 4px 14px 3px 14px;
  background-color: #7b8b6f;
  border-radius: 50px;
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
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
  item: {
    _id,
    name,
    location,
    favoriteUsersSize,
    favoriteUsers,
    description,
    isAvailableToday,
    photo,
  },
}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;

  const { state, city, postcode } = location;
  const address = `${postcode} ${city} ${state}`;

  const navigate = useNavigate();

  return (
    <StyledCard variant="outlined" sx={{ m: 1 }}>
      <Img component="img" image={photo[0]} alt="" />
      <Content>
        <h4>{name}</h4>
        <StyledSpan>{`${address} | ${favoriteUsersSize} people add to booklet`}</StyledSpan>
        <p>{description}</p>
        <AddIcon userId={userId} id={_id} favoriteUsers={favoriteUsers} />
        {isAvailableToday && <AvlLabel>AVAILABLE TODAY</AvlLabel>}
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
