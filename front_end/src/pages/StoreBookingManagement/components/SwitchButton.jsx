import React from "react";
import styled from "@emotion/styled";
import { BookingManageCategory } from "./ServiceDropdown";
import { Switch } from "@mui/material";

const BookingManagementFilter = styled.div`
  min-width: 200px;
  width: 100%;
  height: 50px;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: baseline;
`;

export const SwitchButton = (props) => {
  const switchStatus = props.switchStatus;
  const onChangeEvent = props.onChangeEvent;

  return (
    <>
      {
        <BookingManagementFilter>
          <Switch
            color="buttonBlue"
            size="small"
            onChange={(e) => onChangeEvent(e)}
            checked={switchStatus}
          />
          <BookingManageCategory>
            Only show unconfirmed bookings
          </BookingManageCategory>
        </BookingManagementFilter>
      }
    </>
  );
};
