import { Card, CardContent, CardMedia, Button } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import AddIcon from './AddIcon';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)`
  display: flex;
  max-width: 1072.41px;
  height: 149px;
  padding: 15px;
  gap: 20px;
  border: 0px;
  background-color: rgba(217, 217, 217, 0.4);
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
  item: {
    _id,
    name,
    location,
    favoriteUsersSize,
    favoriteUsers,
    description,
    photo,
  },
}) => {
  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user)._id : null;
  const { state, city, postcode } = location;
  const address = `${postcode} ${city} ${state}`;

  const navigate = useNavigate();

  return (
    <StyledCard variant="outlined">
      {/* need data 
      <Img component="img" image={food} alt="" />
      */}
      <Img component="img" image={photo[0]} alt="" />
      <Content>
        <h4>{name}</h4>
        <span>{`${address} | ${favoriteUsersSize} people add to booklet`}</span>
        <p>{description}</p>
        <AddIcon userId={userId} id={_id} favoriteUsers={favoriteUsers} />
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
