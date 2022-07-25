import React from 'react';
import styled from '@emotion/styled';
import { Stack, Chip } from '@mui/material';
import { ServiceDropdown } from './ServiceDropdown';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { BookingManageWrapper } from './UpcomingBookings'
import { BookingManageCategory } from './ServiceDropdown'
// import { BookingManagementTable } from './BookingManagementTable';
import { PrevBookingTable } from './PrevBookingTable';

const PreviousBookingWrappepr = styled.div`
  min-width: 800px;
  width: 100%;
  height: 500px;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const PreviousBookingTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

const BookingDateFilterWrapper = styled.div`
  width: 540px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const DateWrapper = styled.div`
  width: 133px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const BookingDateChips = ['All', 'This week', 'This month', 'This year'];

const StyledBookingDateChips = styled(Chip)`
    height: 22px;
    background-color: #fff;
    padding: 0 10px;
    font-size: 0.7rem;
    text-align: center;
    align-items: center;
    cursor: pointer;
`;

const ServiceDropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
`; 

export const PreviousBookings = () => {
  const BookingDateFilter = BookingDateChips.map((BookingDateChips) => 
  <StyledBookingDateChips label={BookingDateChips} variant="filled"/>
  );

  return (
    <PreviousBookingWrappepr>
      <PreviousBookingTitle>
        Previous Bookings
      </PreviousBookingTitle>
      <BookingManageWrapper>
        <BookingDateFilterWrapper>
          <DateWrapper>
              <DateRangeOutlinedIcon sx={{width: '20px', height: '20px'}}/>
            <BookingManageCategory>Booking Date</BookingManageCategory>
          </DateWrapper>
          <Stack direction="row" spacing={2}>
            {BookingDateFilter}
          </Stack>
        </BookingDateFilterWrapper>
        <ServiceDropdownWrapper>
          <ServiceDropdown/>
        </ServiceDropdownWrapper>
      </BookingManageWrapper>
      {/* <BookingManagementTable /> */}
      <PrevBookingTable />
      <PrevBookingTable />
      <PrevBookingTable />
      <PrevBookingTable />
    </PreviousBookingWrappepr>
  )
};