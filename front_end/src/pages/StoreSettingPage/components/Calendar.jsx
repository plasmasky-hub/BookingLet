import React from 'react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';

const CalendarWrapper = styled(Paper)`
  width: 613px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Calendar = ({ a }) => {
  return <CalendarWrapper>{a} Calendar</CalendarWrapper>;
};

export default Calendar;
