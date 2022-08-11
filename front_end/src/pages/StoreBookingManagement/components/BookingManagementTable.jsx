import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box, Collapse } from "@mui/material";
import {
  BookingManagementButton,
  // ConfirmButton,
  // DeclineButton,
} from "./BookingManagementButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton, Typography } from "@mui/material";

const TableWrapper = styled(Box)`
  min-width: 800px;
  width: 100%;
  height: 100px;
  background: #fff;
  padding: 10px 50px;
`;

const itemTitle = ["Date", "Time", "Person", "Service"];

const StyledItemTitle = styled.h4`
  font-weight: 600;
`;

const StyledTableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledTableCell = styled.div`
  width: 100px;
  height: 73px;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ShowDetailsWrapper = styled.div`
  width: 75px;
  height: 18px;
  color: #8e8e8e;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const CollapsibleTableRowWrapper = styled.div`
  min-width: 800px;
  width: 100%;
  height: 80px;
  padding: 10px 50px;
  background-color: #8e8e8e;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  color: #fff;
  box-shadow: inset 1px 1px 15px rgba(0, 0, 0, 0.5);
`;

const CollapedTableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
`;

const CollapedTableCell = styled.div`
  width: 200px;
  height: 63px;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #fff;
  &:last-child {
    width: 400px;
  }
`;

const CollapedTableRowTitle = [
  "Reference Number.",
  "Contact Number.",
  "Book Time",
  "Note",
];

const StyledCollapedTableRowTitle = styled.h4`
  min-width: 107px;
  height: 20px;
  color: #fff;
  font-weight: 600;
`;

export const BookingManagementTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  // console.log(data, "222");
  // console.log(data[1].orders, "333");

  return (
    <>
      {data && (
        <>
          <TableWrapper>
            <StyledTableRow>
              <StyledTableCell>
                <StyledItemTitle>
                  <strong>{itemTitle[0]}</strong>
                </StyledItemTitle>
                <p>
                  {data[0].orders.orderTime.date.toString().substring(0, 10)}
                </p>
              </StyledTableCell>
              <StyledTableCell>
                <StyledItemTitle>
                  <strong>{itemTitle[1]}</strong>
                </StyledItemTitle>
                <p>{`${data.orders.orderTime.startTime.substring(
                  0,
                  2
                )}:${data.orders.orderTime.startTime.substring(2, 4)}`}</p>
              </StyledTableCell>
              <StyledTableCell>
                <StyledItemTitle>
                  <strong>{itemTitle[2]}</strong>
                </StyledItemTitle>
                <p>{data.orders.peopleNumber}</p>
              </StyledTableCell>
              <StyledTableCell>
                <StyledItemTitle>
                  <strong>{itemTitle[3]}</strong>
                </StyledItemTitle>
                <p>{data.orders.serviceInfoId.name}</p>
              </StyledTableCell>
              <StyledTableCell>
                <BookingManagementButton />
              </StyledTableCell>
              <StyledTableCell>
                <ShowDetailsWrapper onClick={() => setOpen(!open)}>
                  <IconButton aria-label="expand row" size="small">
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                  <Typography>Details</Typography>
                </ShowDetailsWrapper>
              </StyledTableCell>
            </StyledTableRow>
          </TableWrapper>

          <StyledTableRow>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <CollapsibleTableRowWrapper>
                <CollapedTableRow>
                  <CollapedTableCell>
                    <StyledCollapedTableRowTitle>
                      {CollapedTableRowTitle[0]}
                    </StyledCollapedTableRowTitle>
                    <p>{data.orders._id}</p>
                  </CollapedTableCell>
                  <CollapedTableCell>
                    <StyledCollapedTableRowTitle>
                      {CollapedTableRowTitle[1]}
                    </StyledCollapedTableRowTitle>
                    <p>{data.orders.userId.tel}</p>
                  </CollapedTableCell>
                  <CollapedTableCell>
                    <StyledCollapedTableRowTitle>
                      {CollapedTableRowTitle[2]}
                    </StyledCollapedTableRowTitle>
                    <p>{`${data.orders.bookingTime.substring(
                      0,
                      10
                    )} ${data.orders.bookingTime.substring(12, 16)}`}</p>
                  </CollapedTableCell>
                  <CollapedTableCell>
                    <StyledCollapedTableRowTitle>
                      {CollapedTableRowTitle[3]}
                    </StyledCollapedTableRowTitle>
                    <p>{data.orders.optionInfo}</p>
                  </CollapedTableCell>
                </CollapedTableRow>
              </CollapsibleTableRowWrapper>
            </Collapse>
          </StyledTableRow>
        </>
      )}
    </>
  );
};
