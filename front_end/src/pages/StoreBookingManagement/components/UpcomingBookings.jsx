import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ServiceDropdown } from "./ServiceDropdown";
import { SwitchButton } from "./SwitchButton";
import { BookingManagementTable } from "./BookingManagementTable";
import { useParams } from "react-router-dom";
import { useGetOrdersByStoreIdQuery } from "../../../store/api/orderApi";

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

  // // Time picking
  // const prevOrdersAll = [];
  // const prevOrdersThisYear = [];
  // const prevOrdersThisMonth = [];

  // let currentTime = new Date();
  // let currentYear = currentTime.getFullYear();
  // let currentMonth = currentTime.getMonth();

  // let orders1;
  // if (orders) {
  //   orders1 = orders.filter((order) => {
  //     const bookingDate = new Date(order.orderTime.date);

  //     let orderYear = bookingDate.getFullYear() + "";
  //     let orderMonth =
  //       bookingDate.getMonth() < 9
  //         ? "0" + (bookingDate.getMonth() + 1)
  //         : bookingDate.getMonth() + 1 + "";
  //     let orderDate =
  //       bookingDate.getDate() < 10
  //         ? "0" + bookingDate.getDate()
  //         : bookingDate.getDate() + "";

  //     let startTime =
  //       order.orderTime.startTime.length < 2
  //         ? "000" + order.orderTime.startTime
  //         : order.orderTime.startTime.length < 3
  //         ? "00" + order.orderTime.startTime
  //         : order.orderTime.startTime.length < 4
  //         ? "0" + order.orderTime.startTime
  //         : order.orderTime.startTime;

  //     let orderHour = startTime.substring(0, 2);
  //     let orderMinute = startTime.substring(2, 4);
  //     let orderSecond = "00";

  //     let orderTime = new Date(
  //       `${orderYear}-${orderMonth}-${orderDate} ${orderHour}:${orderMinute}:${orderSecond}`
  //     );
  //     if (!(orderTime > currentTime)) {
  //       prevOrdersAll.push(order);
  //     }
  //     if (
  //       !(orderTime > currentTime) &&
  //       bookingDate.getFullYear() === currentYear
  //     ) {
  //       prevOrdersThisYear.push(order);
  //     }
  //     if (
  //       !(orderTime > currentTime) &&
  //       bookingDate.getFullYear() === currentYear &&
  //       bookingDate.getMonth() === currentMonth
  //     ) {
  //       prevOrdersThisMonth.push(order);
  //     }

  //     return orderTime > currentTime;
  //   });
  // }
  // const resultOfOrders = orders1 && Grouping(orders1);
  // const resultOfPrevOrdersAll = isSuccess && Grouping(prevOrdersAll);
  // const resultOfPrevOrdersThisYear = isSuccess && Grouping(prevOrdersThisYear);
  // const resultOfPrevOrdersThisMonth =
  //   isSuccess && Grouping(prevOrdersThisMonth);

  // function Grouping(orders) {
  //   const serviceInfoArr = [];
  //   orders.map((order) => {
  //     if (serviceInfoArr.indexOf(order.serviceInfoId.name) < 0) {
  //       serviceInfoArr.push(order.serviceInfoId.name);
  //     }
  //   });

  //   const serviceInfoGroup = {};
  //   serviceInfoArr.map((service) => {
  //     serviceInfoGroup[service] = [];
  //   });

  //   Object.keys(serviceInfoGroup).forEach((serviceKey) => {
  //     orders.map((order) => {
  //       if (order.serviceInfoId.name === serviceKey) {
  //         serviceInfoGroup[serviceKey].push(order);
  //       }
  //     });
  //   });
  //   return { serviceInfoArr, serviceInfoGroup };
  // }

  if (!orders) return <>no orders</>;
  if (orders === "") return <>no orders</>;

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
        </UpcomingBookingWrappepr>
      )}
    </>
  );
};
