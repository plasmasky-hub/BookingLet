import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ServiceDropdown } from "./ServiceDropdown";
import { SwitchButton } from "./SwitchButton";
import { BookingManagementTable } from "./BookingManagementTable";
import { useParams } from "react-router-dom";
import { useGetOrdersQuery, useGetOrdersByStoreIdQuery } from "../../../store/api/orderApi";

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
  let { id } = useParams();
  const { data: orders, isSuccess } = useGetOrdersByStoreIdQuery(
    `62d5572a30f835c4513d6c4e`
  );

  const { data: users, success } = useGetOrdersQuery(id);
  console.log(success && users);
  return (
    <>
      {orders && isSuccess && (
        <UpcomingBookingWrappepr>
          <UpcomingBookingTitle>Upcoming Bookings</UpcomingBookingTitle>
          <BookingManageWrapper>
            <ServiceDropdown />
            <SwitchButton />
          </BookingManageWrapper>
          {/* Table */}
          {orders.map((order) => (
            <BookingManagementTable data={order} key={order.id} />
          ))}
          {users.map((user) => (
            <BookingManagementTable data={user} key={user.id} />
          ))}
        </UpcomingBookingWrappepr>
      )}
    </>
  );
};
