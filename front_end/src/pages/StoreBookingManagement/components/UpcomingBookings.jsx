import React from "react";
import styled from "@emotion/styled";
import { ServiceDropdown } from "./ServiceDropdown";
import { SwitchButton } from "./SwitchButton";
import { BookingManagementTable } from "./BookingManagementTable";

const UpcomingBookingWrappepr = styled.div`
  min-width: 800px;
  width: 100%;
  height: 800px;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const UpcomingBookingTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

export const BookingManageWrapper = styled.div`
  min-width: 800px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 30px;
`;

export const UpcomingBookings = () => {
  return (
    <UpcomingBookingWrappepr>
      <UpcomingBookingTitle>Upcoming Bookings</UpcomingBookingTitle>
      <BookingManageWrapper>
        <ServiceDropdown />
        <SwitchButton />
      </BookingManageWrapper>
      {/* Table */}
      <BookingManagementTable />
      {/* <BookingManagementTable />
      <BookingManagementTable />
      <BookingManagementTable /> */}
    </UpcomingBookingWrappepr>
  );
};
