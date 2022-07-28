import React from 'react';
import styled from 'styled-components';
import StoreDisplay from './components/StoreDisplay';
import { useLocation } from 'react-router-dom';
import StoreFilters from './components/Storefilters/StoreFilters';
import { useGetStoresQuery } from '../../store/api/storeApi';
import bannerbg from '../../assets/sushi.png';
import { Box } from '@mui/material';

const StoreResultBanner = styled.div`
  width: 100vw;
  margin-left: calc((1240px - 100vw) / 2);
  padding: 0 20px;
  height: 360px;
  box-sizing: border-box;
  background-image: url(${bannerbg});
  background-repeat: no-repeat;
  background-size: cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const StoreListPage = () => {
  const location = useLocation();
  const query = location.search;
  const { data: stores, isSuccess } = useGetStoresQuery(query);
  console.log(query);

  //const { data: stores, isLoading, isSuccess, isError, error } = storesData;
  //const storesData = JSON.parse(useGetStoresQuery().currentData);

  return (
    <>
      <StoreResultBanner />
      <Box sx={{ width: '1240px', display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            width: '1180px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '10px',
            mt: -19,
            mb: 5,
            pt: 1,
            background:
              'linear-gradient(250.42deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 101.65%)',
          }}
        >
          <StoreFilters />
          {isSuccess && <StoreDisplay stores={stores} />}
        </Box>
      </Box>
    </>
  );
};

export default StoreListPage;
