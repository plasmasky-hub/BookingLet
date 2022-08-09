import React from "react";
import styled from "@emotion/styled";
import { UpcomingBookings } from "./components/UpcomingBookings";
import { PreviousBookings } from "./components/PreviousBookings";
import { useParams } from "react-router-dom";
import { useGetStoreQuery } from "../../store/api/storeApi";

//Time picking
// const prevOrdersAll = [];
// const prevOrdersThisYear = [];
// const prevOrdersThisMonth = [];

// let currentTime = new Date();
// let currentYear = currentTime.getFullYear();
// let currentMonth = currentTime.getMonth();

// let orders = orders.filter((order) => {
//   let orderYear = order.orderTime.date.getFullYear() + '';
//   let orderMonth = order.orderTime.date.getMonth() < 9 ? ('0' + (order.orderTime.date.getMonth() + 1)) : ((order.orderTime.date.getMonth() + 1) + '');
//   let orderDate = order.orderTime.date.getDate() < 10 ? ('0' + order.orderTime.date.getDate()) : (order.orderTime.date.getDate() + '')

//   let startTime = order.orderTime.startTime.length < 2 ? ('000' + order.orderTime.startTime)
//     : order.orderTime.startTime.length < 3 ? ('00' + order.orderTime.startTime)
//       : order.orderTime.startTime.length < 4 ? ('0' + order.orderTime.startTime)
//         : order.orderTime.startTime;

//   let orderHour = startTime.substring(0, 2);
//   let orderMinute = startTime.substring(2, 4);
//   let orderSecond = '00';

//   let orderTime = new Date(`${orderYear}-${orderMonth}-${orderDate} ${orderHour}:${orderMinute}:${orderSecond}`)
//   if (!(orderTime > currentTime)) { prevOrdersAll.push(order) };
//   if (!(orderTime > currentTime) && order.orderTime.date.getFullYear() === currentYear) { prevOrdersThisYear.push(order) };
//   if (!(orderTime > currentTime) && order.orderTime.date.getFullYear() === currentYear && order.orderTime.date.getMonth() === currentMonth) { prevOrdersThisMonth.push(order) };
//   return orderTime > currentTime;
// });


// const resultOfOrders = Grouping(orders);
// const resultOfPrevOrdersAll = Grouping(prevOrdersAll);
// const resultOfPrevOrdersThisYear = Grouping(prevOrdersThisYear);
// const resultOfPrevOrdersThisMonth = Grouping(prevOrdersThisMonth);

// function Grouping(orders) {
//   const serviceInfoArr = [];
//   orders.map((order) => {
//     if (serviceInfoArr.indexOf(order.serviceInfoId.name) < 0) {
//       serviceInfoArr.push(order.serviceInfoId.name);
//     };
//   });

//   const serviceInfoGroup = {};
//   serviceInfoArr.map((service) => {
//     serviceInfoGroup[service] = [];
//   })

//   Object.keys(serviceInfoGroup).forEach((serviceKey) => {
//     orders.map((order) => {
//       if (order.serviceInfoId.name === serviceKey) {
//         serviceInfoGroup[serviceKey].push(order);
//       };
//     });
//   })
//   return ({ serviceInfoArr, serviceInfoGroup })
// };
/* -------------------------------------------------------------------------- */

const StoreBookingWrapper = styled.div`
  min-width: 1000px;
  width: 100%;
  height: 100vh;
  background-color: #e1e6ed;
  padding: 80px 80px;
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

const ViewOrdersButton = styled.button`
  background-color: #d69636;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  border-style: none;
  border-radius: 5px;
  padding: 5px 15px;
`;

export const StoreBookingManagement = () => {
    let { id } = useParams();
    const { data: store } = useGetStoreQuery(id);
    return (
        <>
            {store && (
                <StoreBookingWrapper>
                    <ServiceName>{store.name}</ServiceName>
                    <ViewOrdersButton>View orders in calendar</ViewOrdersButton>
                    <UpcomingBookings />
                    <PreviousBookings />
                </StoreBookingWrapper>
            )}
            ;
        </>
    );
};
