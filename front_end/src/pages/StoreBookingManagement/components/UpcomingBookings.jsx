import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NoOrder } from "../../../components/shared/NoOrders";
import { ServiceDropdown } from "./ServiceDropdown";
import { SwitchButton } from "./SwitchButton";
import { UpcomingBookingTableRow } from "./UpcomingBookingTableRow";
import { useParams } from "react-router-dom";
import { useGetOrdersByParamsQuery } from "../../../store/api/orderApi";
import { BasicPagination } from "./Pagination";

const UpcomingBookingWrappepr = styled.div`
  min-width: 800px;
  width: 100%;
  /* height: 900px; */
  padding: 80px 0;
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

export const UpcomingBookings = (props) => {
  let { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [currentService, setCurrentService] = useState("");

  const handleSelectService = (e) => {
    setCurrentService(e.target.value);
  };

  const [switchStatus, setSwitchStatus] = useState(false);

  const handleSwitchButton = (e) => {
    setSwitchStatus(e.target.checked);
  };

  const { data: ordersInfo, refetch } = useGetOrdersByParamsQuery({
    storeId: id,
    periodLimiter: "coming",
    page: currentPage,
    serviceInfoId: currentService,
    onlyShowUnconfirmedBooking: switchStatus,
  });

  const [orders, setOrders] = useState(ordersInfo?.orders);

  useEffect(() => {
    setOrders(ordersInfo?.orders);
  }, [ordersInfo]);

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  useEffect(() => {
    refetch();
  }, [currentService, refetch]);

  useEffect(() => {
    refetch();
  }, [switchStatus, refetch]);

  const handlePageClick = (_event, page) => {
    setCurrentPage(page);
  };
  const store = props.store;
  // const { data: store } = useGetStoreQuery(id);
  // if (!ordersInfo) return <>no orders</>;
  // if (orders.length === 0) return <>no orders</>;

  if (ordersInfo === undefined) return <NoOrder />;

  const pageQty = ordersInfo?.pageQty;

  return (
    <>
      {orders && store && (
        <UpcomingBookingWrappepr>
          <UpcomingBookingTitle>Upcoming Bookings</UpcomingBookingTitle>
          <BookingManageWrapper>
            <ServiceDropdown
              options={[{ id: "", name: "All" }].concat(store.serviceInfos)}
              currentOption={currentService}
              onChangeEvent={handleSelectService}
            />
            <SwitchButton
              switchStatus={switchStatus}
              onChangeEvent={handleSwitchButton}
            />
          </BookingManageWrapper>
          {orders.length === 0 ? (
            <NoOrder />
          ) : (
            [
              orders.map((order) => {
                return <UpcomingBookingTableRow data={order} key={order._id} />;
              }),
              <BasicPagination
                pageQty={pageQty}
                handlePageClick={handlePageClick}
                key="upcoming_pagination"
              />,
            ]
          )}
        </UpcomingBookingWrappepr>
      )}
    </>
  );
};
