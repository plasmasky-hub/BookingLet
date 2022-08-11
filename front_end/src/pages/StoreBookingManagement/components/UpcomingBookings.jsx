import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ServiceDropdown } from "./ServiceDropdown";
import { SwitchButton } from "./SwitchButton";
import { BookingManagementTable } from "./BookingManagementTable";
import { useParams } from "react-router-dom";
import {
  useGetOrdersByStoreIdQuery,
  useGetOrdersByServiceInfoIdQuery,
} from "../../../store/api/orderApi";
import { useGetStoreQuery } from "../../../store/api/storeApi";
import { BasicPagination } from "./Pagination";

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
  const { data: orders, isSuccess } = useGetOrdersByStoreIdQuery(id);

  // console.log(orders, "111");
  const { data: store } = useGetStoreQuery(id);

  if (!orders) return <>no orders</>;
  if (orders === "") return <>no orders</>;

  return (
    <>
      {orders && isSuccess && store && (
        <UpcomingBookingWrappepr>
          <UpcomingBookingTitle>Upcoming Bookings</UpcomingBookingTitle>
          <BookingManageWrapper>
            <ServiceDropdown data={store} />
            <SwitchButton />
          </BookingManageWrapper>
          {/* Table */}
          {orders.map((order) => {
            return <BookingManagementTable data={order} key={order.id} />;
          })}
          <BasicPagination />
        </UpcomingBookingWrappepr>
      )}
    </>
  );
};
