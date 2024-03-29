import styled from '@emotion/styled';
import { useState } from 'react';
import { Container, Chip, Stack } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { BookingTable } from '../BookingTable/BookingTable';
import {
  useGetOrdersQuery,
  // useUpdateOrderQuery,
} from '../../../../store/api/orderApi';

const BookingPageWrapper = styled(Container)`
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  background-color: #fff;
`;

const StyledChips = styled(Chip)`
  height: 22px;
  padding: 0 10px;
  font-size: 0.7rem;
  text-align: center;
  align-items: center;
  cursor: pointer;
  transition: ease-in-out 0.4s;
`;

const chipItems = ['All', 'Uncomfirmed', 'Confirmed'];

export const BookingHistory = () => {
  const { data, isSuccess } = useGetOrdersQuery();

  const [clicked, setClicked] = useState(0);

  const statusIndicator = chipItems.map((chipItem, index) => (
    <StyledChips
      label={chipItem}
      key={chipItem}
      onClick={() => setClicked(index)}
      sx={{ backgroundColor: index === clicked && '#7B8B6F' }}
    ></StyledChips>
  ));

  let fiterOrders = isSuccess
    ? clicked === 0
      ? data
      : clicked === 1
      ? data.filter((e) => !e.bookingStatus)
      : clicked === 2
      ? data.filter((e) => e.bookingStatus)
      : data.filter((e) => e.bookingStatus)
    : '';
  console.log(fiterOrders);
  if (!fiterOrders) return <>no orders</>;
  if (fiterOrders === '') return <>no orders</>;

  return (
    // <>booking</>
    <BookingPageWrapper>
      <h2>My Bookings</h2>
      <Stack direction="row" spacing={1}>
        <FilterAltOutlinedIcon sx={{ mr: 1 }} />
        <span>
          <strong>Filter by booking status</strong>
        </span>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ py: 2 }}>
        {statusIndicator}
      </Stack>
      <BookingTable data={fiterOrders[0]} />
      <BookingTable data={fiterOrders[0]} />
      <BookingTable data={fiterOrders[0]} />
      <BookingTable data={fiterOrders[0]} />
    </BookingPageWrapper>
  );
};
