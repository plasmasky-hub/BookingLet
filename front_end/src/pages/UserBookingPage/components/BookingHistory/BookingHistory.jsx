import styled from "@emotion/styled";
import { useState } from "react";
import { Container, Chip, Stack } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { BookingTable } from "../BookingTable/BookingTable";
import {
  useGetOrdersQuery,
  useUpdateOrderQuery,
} from "../../../../store/api/orderApi";

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

const ChipBackground = "#7B8B6F";

const chipItems = ["All", "Uncomfirmed", "Confirmed", "Done"];

export const BookingHistory = () => {
  const { data, isSuccess } = useGetOrdersQuery();
  const orders = isSuccess && data;

  const [clicked, setClicked] = useState(ChipBackground);
  const statusIndicator = chipItems.map((chipItems) => (
    <StyledChips
      label={chipItems}
      sx={{ color: `${ChipBackground[clicked]}` }}
      onClick={() => {
        setClicked(ChipBackground);
      }}
    ></StyledChips>
  ));
  return (
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
      <BookingTable />
      <BookingTable />
      <BookingTable />
      <BookingTable />
    </BookingPageWrapper>
  );
};
