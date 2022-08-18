import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Stack, Chip, Table, TableBody } from "@mui/material";
import { ServiceDropdown } from "./ServiceDropdown";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { BookingManageWrapper } from "./UpcomingBookings";
import { BookingManageCategory } from "./ServiceDropdown";
import { PrevBookingTableRow } from "./PrevBookingTableRow";
import { useParams } from "react-router-dom";
import { useGetOrdersByParamsQuery } from "../../../store/api/orderApi";
import { BasicPagination } from "./Pagination";

const PreviousBookingWrappepr = styled.div`
  min-width: 1000px;
  width: 100%;
  padding: 30px 0;
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
  justify-content: flex-start;
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

const BookingDateChips = {
  allPrev: "All",
  monthPrev: "This month",
  yearPrev: "This year",
};

const StyledBookingDateChips = styled(Chip)`
  height: 22px;
  background-color: #fff;
  padding: 0 10px;
  font-size: 0.7rem;
  text-align: center;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
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
  const [currentPeriod, setCurrentPeriod] = useState("allPrev");
  const [currentService, setCurrentService] = useState("");

  const handleSelectService = (e) => {
    setCurrentService(e.target.value);
  };

  const { data: ordersInfo, isSuccess } = useGetOrdersByParamsQuery(
    {
      storeId: id,
      periodLimiter: currentPeriod,
      page: currentPage,
      serviceInfoId: currentService,
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 2000,
    }
  );

  const [orders, setOrders] = useState(ordersInfo?.orders);

  useEffect(() => {
    setOrders(ordersInfo?.orders);
  }, [ordersInfo]);

  const handlePageClick = (_event, page) => {
    setCurrentPage(page);
  };

  const setPeriod = (_event, period) => {
    setCurrentPeriod(period);
  };
  const store = props.store;

  const BookingDateFilter = () => {
    let result = [];
    for (const key in BookingDateChips) {
      if (Object.hasOwnProperty.call(BookingDateChips, key)) {
        result.push(
          <StyledBookingDateChips
            key={key}
            label={BookingDateChips[key]}
            variant="filled"
            onClick={(e) => setPeriod(e, key)}
            sx={{
              backgroundColor: currentPeriod === key && "#397CC2",
            }}
          />
        );
      }
    }
    return result;
  };

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
                {BookingDateFilter()}
              </Stack>
            </BookingDateFilterWrapper>
            <ServiceDropdownWrapper>
              <ServiceDropdown
                options={[{ id: "", name: "All" }].concat(store.serviceInfos)}
                currentOption={currentService}
                onChangeEvent={handleSelectService}
              />
            </ServiceDropdownWrapper>
          </BookingManageWrapper>
          {orders.length === 0 && <>no orders</>}
          <Table>
            <TableBody>
              {orders?.map((order) => {
                return <PrevBookingTableRow data={order} key={order._id} />;
              })}
            </TableBody>
          </Table>

          <BasicPagination
            pageQty={pageQty}
            handlePageClick={handlePageClick}
          />
        </PreviousBookingWrappepr>
      )}
    </>
  );
};
