import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Stack, Chip } from "@mui/material";
import { ServiceDropdown } from "./ServiceDropdown";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { BookingManageWrapper } from "./UpcomingBookings";
import { BookingManageCategory } from "./ServiceDropdown";
// import { BookingManagementTable } from "./BookingManagementTable";
import { PrevBookingTable } from "./PrevBookingTable";
import { useParams } from "react-router-dom";
import { useGetOrdersByParamsQuery } from "../../../store/api/orderApi";
import { BasicPagination } from "./Pagination";

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

const BookingDateChips = ["All", "This month", "This year"];

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

export const PreviousBookings = (props) => {
  // const orders = props.orders;
  let { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: ordersInfo, isSuccess } = useGetOrdersByParamsQuery({
    storeId: id,
    periodLimiter: "allPrev",
    page: currentPage,
  });

  const [orders, setOrders] = useState(ordersInfo?.orders);

  useEffect(() => {
    setOrders(ordersInfo?.orders);
  }, [ordersInfo]);

  const handlePageClick = (_event, page) => {
    setCurrentPage(page);
    setOrders(ordersInfo.orders);
  };
  const store = props.store;
  // console.log(orders);

  // const { data: store } = useGetStoreQuery(id);
  const [clicked, setClicked] = useState(0);

  const BookingDateFilter = BookingDateChips.map((BookingDateChips, index) => (
    <StyledBookingDateChips
      key={BookingDateChips}
      label={BookingDateChips}
      variant="filled"
      onClick={() => setClicked(index)}
      sx={{ backgroundColor: index === clicked && "#397CC2" }}
    />
  ));

  // if (orders.length === 0) return <>no orders</>;
  // if (ordersInfo === undefined) return <>no orders</>;

  const pageQty = ordersInfo?.pageQty;

  return (
    <>
      {orders && isSuccess && (
        <PreviousBookingWrappepr>
          <PreviousBookingTitle>Previous Bookings</PreviousBookingTitle>
          <BookingManageWrapper>
            <BookingDateFilterWrapper>
              <DateWrapper>
                <DateRangeOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                <BookingManageCategory>Booking Date</BookingManageCategory>
              </DateWrapper>
              <Stack direction="row" spacing={2}>
                {BookingDateFilter}
              </Stack>
            </BookingDateFilterWrapper>
            <ServiceDropdownWrapper>
              <ServiceDropdown data={store} />
            </ServiceDropdownWrapper>
          </BookingManageWrapper>
          {/* {orders.map((order) => (
            <BookingManagementTable data={order} key={order.id} />
          ))} */}
          {orders.length === 0 && <>no orders</>}
          {orders?.map((order) => (
            <PrevBookingTable data={order} key={order._id} />
          ))}
          <BasicPagination
            pageQty={pageQty}
            handlePageClick={handlePageClick}
          />
        </PreviousBookingWrappepr>
      )}
    </>
  );
};
