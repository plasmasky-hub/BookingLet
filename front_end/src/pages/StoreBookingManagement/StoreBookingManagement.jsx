import React from "react";
import styled from "@emotion/styled";
import { UpcomingBookings } from "./components/UpcomingBookings";
import { PreviousBookings } from "./components/PreviousBookings";
import { useParams } from "react-router-dom";
import { useGetStoreQuery } from "../../store/api/storeApi";

const StoreBookingWrapper = styled.div`
  min-width: 1000px;
  width: 100%;
  height: 180vh;
  background-color: #e1e6ed;
  padding: 80px 80px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  align-content: flex-start;
  margin-top: 80px;
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
          {store.serviceInfos.map((serviceInfo) => (
            <ServiceName key={serviceInfo.id}>{serviceInfo.name}</ServiceName>
          ))}

          <ViewOrdersButton>View orders in calendar</ViewOrdersButton>
          <UpcomingBookings store={store} />
          <PreviousBookings store={store} />
        </StoreBookingWrapper>
      )}
      ;
    </>
  );
};
