import React from 'react';
import styled from '@emotion/styled';
import Banner from './components/Banner';
import StoreIntro from './components/StoreInfo';
import BookingPanel from './components/BookingPanel/BookingPanel';
import Layout from '../../components/shared/Layout';

const PageContainer = styled.div`
  width: 1233px;
  margin: 30px auto;
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
  return (
    <Layout>
      header
      <PageContainer>
        <Banner />
        <StoreInfoWrapper>
          <StoreIntro />
          <BookingPanel />
        </StoreInfoWrapper>
      </PageContainer>
    </Layout>
  );
};

export default BookingPage;
