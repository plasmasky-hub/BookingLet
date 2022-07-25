import styled from '@emotion/styled';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import React, { useState } from 'react';

const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ConfirmButton = styled.button`
  width: 120px;
  height: 42px;
  border-style: none;
  border-radius: 15px;
  color: #fff;
  background-color: #D69636;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const DeclineButton = styled.button`
width: 120px;
height: 42px;
border-style: none;
border-radius: 15px;
color: #fff;
background-color: #8E8E8E;
font-weight: 700;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
`;

const ConfirmedButton = styled.div`
  width: 242px;
  height: 42px;
  border-radius: 15px;
  color: #2F72BD;
  background-color: #DCE2E9;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const UpcomingBookingStatus = ['Confirm', 'Decline'];

export const BookingManagementButton = () => {
  const [show, setShow] = useState(false);
  return (
    <ActionButtonWrapper>
      <ConfirmButton
        onClick={() => setShow(true)}>
        <DateRangeOutlinedIcon sx={{width: '20px', height: '20px'}}/>
        {UpcomingBookingStatus[0]}
      </ConfirmButton>
      <DeclineButton>
        <CancelOutlinedIcon sx={{width: '20px', height: '20px'}}/>
        {UpcomingBookingStatus[1]}
      </DeclineButton>
      {show === true ?
      <ConfirmedButton>
        <DoneOutlinedIcon />
        Order has been confirmed
        </ConfirmedButton> : ''}
    </ActionButtonWrapper>
  )
};
