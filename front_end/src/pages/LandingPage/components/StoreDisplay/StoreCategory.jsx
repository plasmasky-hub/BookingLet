import React from 'react';
import StoreCard from './StoreCard';
import { Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import dining from '../../../../assets/dining_category.jpg';

const Container = styled.div`
  width: 100%;
  display: flex;
  background-image: url(${dining});
  background-repeat: no-repeat;
  background-size: cover;
`;

const ViewButton = styled(Button)`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 3px;
  color: #ffffff;
`;

const ServiceCardContent = styled(Box)`
  backdrop-filter: blur(20px);
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StoreCategory = ({ category, cardData: stores }) => {
  // const { data: stores, isLoading, isSuccess, isError, error } = cardData;

  // const filteredStores = isSuccess
  //   ? stores.filter((store) => store.rootCategories[0] === category._id)
  //   : error;

  const filteredStores = stores.filter(
    (store) => store.rootCategories[0] === category._id
  );

  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ height: '90px' }} id={category.name} />
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '240px',
            p: 2,
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography
            sx={{ color: 'white', fontSize: '26px', fontWeight: 'bold' }}
          >
            {category.name}
          </Typography>
          <ViewButton
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo(0, 0);
              navigate(`/StoreListPage?category=${category.id}`);
            }}
          >
            view all
            <ArrowForwardIcon fontSize="small" />
          </ViewButton>
        </Box>
        <ServiceCardContent
          sx={{ pl: 3, pb: 3, background: 'rgba(236, 236, 234, 0.6)' }}
        >
          <CardsWrapper>
            <>
              {filteredStores.slice(0, 8).map((store) => {
                return (
                  <StoreCard id={store.id} key={store._id} store={store} />
                );
              })}
            </>
          </CardsWrapper>
        </ServiceCardContent>
      </Container>
    </>
  );
};

export default StoreCategory;
