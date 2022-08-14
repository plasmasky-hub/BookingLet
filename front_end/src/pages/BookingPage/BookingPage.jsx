import React from 'react';
import styled from '@emotion/styled';
import StoreInfo from './components/StoreInfo';
import BookingPanel from './components/BookingPanel/BookingPanel';
import { useParams } from 'react-router-dom';
import { useGetStoreQuery } from '../../store/api/storeApi';
import ServiceList from './components/ServiceList';
import { Box } from '@mui/material';

const PageContainer = styled.div`
  width: 1240px;
  margin: 100px auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const StoreInfoWrapper = styled.div`
  width: 96%;
  margin: -25px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Banner = styled.div`
  width: 100%;
  height: 256px;
  background-size: cover;
  border-radius: 10px 10px 0 0;
`;

const BookingPage = () => {
  let { _id } = useParams();
  const storeData = useGetStoreQuery(_id);
  const { data, isLoading, isSuccess, isError, error } = storeData;

  return (
    <>
      {isError && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <PageContainer>
          <Box
            sx={{
              width: '1180px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              borderRadius: '10px',
              background:
                'linear-gradient(250.42deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 101.65%)',
            }}
          >
            <Banner style={{ backgroundImage: `url(${data.photo[0]})` }} />
            <StoreInfoWrapper>
              <StoreInfo store={data} id={_id} />
              <BookingPanel id={_id} />
            </StoreInfoWrapper>
            <ServiceList id={_id} />
          </Box>
        </PageContainer>
      )}
    </>
  );
};

export default BookingPage;
