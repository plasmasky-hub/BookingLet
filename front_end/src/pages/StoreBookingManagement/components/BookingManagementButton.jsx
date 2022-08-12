import React, { useState } from "react";
import styled from "@emotion/styled";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {
  useConfirmOrderMutation,
  useDeleteOrderMutation,
} from "../../../store/api/orderApi";

const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledConfirmButton = styled.button`
  width: 120px;
  height: 42px;
  border-style: none;
  border-radius: 15px;
  color: #fff;
  background-color: #d69636;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const ConfirmButton = ({ onClickEvent }) => {
  return (
    <StyledConfirmButton onClick={(e) => onClickEvent(e, true)}>
      <DateRangeOutlinedIcon sx={{ width: "20px", height: "20px" }} />
      {UpcomingBookingStatus[0]}
    </StyledConfirmButton>
  );
};

const StyledDeclineButton = styled.button`
  width: 120px;
  height: 42px;
  border-style: none;
  border-radius: 15px;
  color: #fff;
  background-color: #8e8e8e;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const DeclineButton = ({ onClickEvent }) => {
  return (
    <StyledDeclineButton onClick={(e) => onClickEvent(e, false)}>
      <CancelOutlinedIcon sx={{ width: "20px", height: "20px" }} />
      {UpcomingBookingStatus[1]}
    </StyledDeclineButton>
  );
};

const StyledActionResult = styled.div`
  width: 242px;
  height: 42px;
  border-radius: 15px;
  color: #2f72bd;
  background-color: #dce2e9;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const ShowActionResult = ({ message }) => {
  return (
    <StyledActionResult>
      <DoneOutlinedIcon />
      Order has been {message}
    </StyledActionResult>
  );
};

const UpcomingBookingStatus = ["Confirm", "Decline"];

const ShowMessageText = ["confirmed", "canceled"];

export const BookingManagementButton = ({ data }) => {
  const [
    confirmOrder, // This is the destructured mutation result
  ] = useConfirmOrderMutation();

  const [
    declineOrder, // This is the destructured mutation result
  ] = useDeleteOrderMutation();

  const [isClick, setIsClick] = useState(
    data.bookingStatus || data.cancelStatus
  );
  const [isShowConfirmedMessage, setIsShowConfirmedMessage] = useState(
    data.bookingStatus
  );

  const onConfirm = (_e, isConfirmed) => {
    setIsClick(true);
    setIsShowConfirmedMessage(isConfirmed);
    if (isConfirmed) {
      confirmOrder(data._id);
    } else {
      declineOrder(data._id);
    }
  };

  return (
    <ActionButtonWrapper>
      {!isClick ? (
        [
          <ConfirmButton onClickEvent={onConfirm} key={"confirmButton"} />,
          <DeclineButton onClickEvent={onConfirm} key={"declineButton"} />,
        ]
      ) : (
        <ShowActionResult
          message={
            isShowConfirmedMessage ? ShowMessageText[0] : ShowMessageText[1]
          }
        />
      )}
    </ActionButtonWrapper>
  );
};
