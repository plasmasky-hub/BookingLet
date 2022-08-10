import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import food from '../../../assets/food.jpg';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAddOrCancelFavoriteStoreMutation } from '../../../store/api/userApi';

const StoreInfoWrapper = styled(Paper)`
  width: 714px;
  padding: 20px 60px;
  box-sizing: border-box;
  position: relative;
  h2 {
    margin-bottom: 0;
  }
  p {
    font-size: 15px;
    font-style: italic;
    margin-top: 10px;
  }
  hr {
    border-top: 0.8px solid #a4a4a4;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0 100px 0;
`;

const StoreIntro = styled.div`
  width: 335px;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
`;

const StoreImg = styled.div`
  width: 218px;
  img {
    width: 100%;
  }
`;

const BookingButton = styled(Button)`
  font-size: 11px;
  background-color: #7b8b6f;
  color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 25px;
`;

const ExpandButton = styled(Button)`
  font-size: 12px;
  color: #d76d6d;
  font-weight: 600;
  padding-left: 0;
`;

const StoreInfo = ({
  store: { name, description, location, favoriteUsers },
  id,
}) => {
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  const favorite = favoriteUsers.includes(userId);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const buttonText = isFavorite ? 'cancel favourite' : 'Add to my favourite';

  const [AddOrCancelFavoriteStore] = useAddOrCancelFavoriteStoreMutation();

  const { street, city, state, postcode } = location;

  const address = `${street}, ${city}, ${state} ${postcode}`;

  const [expand, setExpand] = React.useState(false);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <StoreInfoWrapper elevation={3}>
      <h2>{name}</h2>
      <p>{address}</p>
      <hr />
      <ContentWrapper>
        <StoreIntro>
          <Collapse in={expand} collapsedSize={125}>
            {description}
          </Collapse>
          <ExpandButton onClick={handleClick}>
            {expand ? '- Read Less' : '+ Read More'}
          </ExpandButton>
        </StoreIntro>
        <StoreImg>
          <img src={food} alt="StoreImage" />
        </StoreImg>
      </ContentWrapper>
      <BookingButton
        variant="contained"
        onClick={() => {
          AddOrCancelFavoriteStore({ userId, id });
          setIsFavorite(!favorite);
        }}
      >
        <BookmarkIcon fontSize="inherit" />
        &nbsp;{buttonText}
      </BookingButton>
    </StoreInfoWrapper>
  );
};

export default StoreInfo;
