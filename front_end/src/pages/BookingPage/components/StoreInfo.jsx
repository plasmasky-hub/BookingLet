import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import food from '../../../assets/food.jpg';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const data = {
  image: food,
  name: 'Lucky Sushi & Ramen Bar',
  address: '35 Pitt Street, Sydney, New South Whales 2000',
  intro:
    'Named after the Japanese word for rainbow, Niji Sushi Bar presents a colourful, contemporary take on Japanese cuisine. Located in the heart of Kingsford, we offer a fresh, modern Japanese menu infused with traditional Izakaya-style dishes, perfect for sharing. Stop by and sample some of our sushi train favourites or take a seat at one of our indoor or outdoor tables and choose from the extensive a la carté menu. We are Fully Licensed and BYO Wine Only!Stop by and sample some of our sushi train favourites or take a seat at one of our indoor or outdoor tables and choose from the extensive a la carté menu. We are Fully Licensed and BYO Wine Only!',
};

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

const StoreInfo = () => {
  const [expand, setExpand] = React.useState(false);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <StoreInfoWrapper elevation={3}>
      <h2>{data.name}</h2>
      <p>{data.address}</p>
      <hr />
      <ContentWrapper>
        <StoreIntro>
          <Collapse in={expand} collapsedSize={125}>
            {data.intro}
          </Collapse>
          <ExpandButton onClick={handleClick}>
            {expand ? '- Read Less' : '+ Read More'}
          </ExpandButton>
        </StoreIntro>
        <StoreImg>
          <img src={data.image} alt="StoreImage" />
        </StoreImg>
      </ContentWrapper>
      <BookingButton variant="contained">
        <BookmarkIcon fontSize="inherit" />
        &nbsp;Add to my favourite
      </BookingButton>
    </StoreInfoWrapper>
  );
};

export default StoreInfo;
