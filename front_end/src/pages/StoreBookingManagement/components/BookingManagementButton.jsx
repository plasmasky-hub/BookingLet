import styled from '@emotion/styled';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

const UpcomingBookingButton = styled.button`
  width: 130px;
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
`;

const UpcomingBookingStatus = ['confirmed', 'unconfirmed'];

export const BookingManagementButton = () => {
  return (
    <UpcomingBookingButton>
      <DateRangeOutlinedIcon sx={{width: '20px', height: '20px'}}/>
      {UpcomingBookingStatus[0]}
    </UpcomingBookingButton>
  )
};
