import React from 'react';
import { Card, Typography, Box, Chip } from '@mui/material';
// import AddIcon from './AddIcon';
import styled from '@emotion/styled';
// import Button from '@mui/material/Button';
import food from '../../../../assets/food.jpg';
import { useNavigate } from 'react-router-dom';

const CardWrapper = styled(Card)`
  width: 220px;
  height: 320px;
  border-radius: 10px;
  margin-right: 24px;
  margin-top: 24px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ImgWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
  img {
    width: 100%;
    height: 200px;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
  }

  span {
    font-size: 11px;
    padding: 5px 14px 3px 14px;
    background-color: #7b8b6f;
    border-radius: 50px;
    color: #fff;
    position: absolute;
    bottom: -8px;
    right: 1px;
  }
`;

const StoreNameLabel = styled(Typography)({
  fontSize: 14,
  fontWeight: 700,
});

const AddressLabel = styled(Typography)({
  fontSize: 12,
});

const BookletLabel = styled(Typography)({
  fontSize: 12,
});

const StoreCard = ({
  store: {
    _id,
    name,
    location,
    favoriteUsersSize,
    favoriteUsers,
    isAvailableToday,
    maxPersonPerSectionForStore,
  },
}) => {
  const { state, city, postcode } = location;
  const address = `${postcode} ${city} ${state}`;
  const navigate = useNavigate();

  return (
    <CardWrapper
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate(`/BookingPage/${_id}`);
      }}
    >
      <ImgWrapper>
        {/* need data */}
        <img src={food} alt="food" />
        {/* need user data and function */}
        {/* <AddIcon favoriteUsers={favoriteUsers} /> */}
        {isAvailableToday ? <span>AVAILABLE TODAY</span> : null}
      </ImgWrapper>
      <Box sx={{ pl: 2 }}>
        <StoreNameLabel>{name}</StoreNameLabel>
        <AddressLabel>{address}</AddressLabel>
        <Chip
          label={`Max ${maxPersonPerSectionForStore} ppl.`}
          size="small"
          sx={{
            fontSize: 11,
            backgroundColor: '#C4B8A5',
            color: '#FFFFFF',
            mt: '4px',
            mb: '4px',
          }}
        />
        <BookletLabel>{favoriteUsersSize} people add to booklet</BookletLabel>
      </Box>
    </CardWrapper>
  );
};

export default StoreCard;
