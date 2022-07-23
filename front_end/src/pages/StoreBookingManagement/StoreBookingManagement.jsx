// import React, { useState } from 'react';
import styled from '@emotion/styled';
import { UpcomingBookings } from './components/UpcomingBookings';
import { PreviousBookings } from './components/PreviousBookings';

const StoreBookingWrapper = styled.div`
  min-width: 1000px;
  width: 100%;
  height: 100vh;
  background-color: #E1E6ED;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  align-content: flex-start;
`;

const ServiceName = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
`;

const services = 'Traditional Chinese Massage';

const ViewOrdersButton = styled.button`
  background-color: #D69636;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  border-style: none;
  border-radius: 5px;
  padding: 5px 15px;
`;

export const StoreBookingManagement = () => {
  return (
    <>
      <StoreBookingWrapper>
        <ServiceName>{services}</ServiceName>
        <ViewOrdersButton>
          View orders in calendar
        </ViewOrdersButton>
        <UpcomingBookings />
        <PreviousBookings />
      </StoreBookingWrapper>
    </>
  )
};
