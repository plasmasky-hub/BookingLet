import React from 'react';
import styled from '@emotion/styled';
import Banner from './components/Banner';
import StoreInfo from './components/StoreInfo';
import BookingPanel from './components/BookingPanel/BookingPanel';
import Layout from '../../components/shared/Layout';
import { Header } from '../../components/shared/Header/Header';
import { useParams } from 'react-router-dom';
import { useGetStoreQuery } from '../../store/api/storeApi';

const PageContainer = styled.div`
  width: 1233px;
  margin: 100px auto;
  box-sizing: border-box;
`;

const StoreInfoWrapper = styled.div`
  width: 95%;
  margin: -25px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const BookingPage = () => {
  let { _id } = useParams();
  const storeData = useGetStoreQuery(_id);
  const { data, isLoading, isSuccess, isError, error } = storeData;

  return (
    <Layout>
      <Header />
      {isError && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <PageContainer>
          <Banner />
          <StoreInfoWrapper>
            <StoreInfo store={data} />
            <BookingPanel />
          </StoreInfoWrapper>
        </PageContainer>
      )}
    </Layout>
  );
};

export default BookingPage;
