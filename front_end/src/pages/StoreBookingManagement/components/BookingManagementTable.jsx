import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Collapse } from "@mui/material";
import { BookingManagementButton } from "./BookingManagementButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton, Typography } from "@mui/material";

const TableWrapper = styled(Box)`
  min-width: 1000px;
  width: 100%;
  height: 100px;
  background: #fff;
  padding: 10px;
`;

const itemTitle = ["Date", "Time", "Person", "Service"];

const StyledItemTitle = styled.h4`
  font-weight: 600;
`;

const StyledTableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StyledTableCell = styled.div`
  width: 90px;
  height: 70px;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  &:nth-of-type(4) {
    width: 180px;
  }
  &:nth-of-type(5) {
    width: 220px;
  }
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
  min-width: 1000px;
  width: 100%;
  height: 70px;
  padding: 10px;
  background-color: #8e8e8e;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  color: #fff;
  box-shadow: inset 1px 1px 15px rgba(0, 0, 0, 0.5);
`;

const CollapedTableRow = styled.div`
  min-width: 1000px;
  width: 100%;
  height: 70px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CollapedTableCell = styled.div`
  width: 250px;
  height: 70px;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #fff;
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
                <p>{data.orderTime.date.toString().substring(0, 10)}</p>
              </StyledTableCell>
              <StyledTableCell>
                <StyledItemTitle>
                  <strong>{itemTitle[1]}</strong>
                </StyledItemTitle>
                <p>{`${data.orderTime.startTime.substring(
                  0,
                  2
                )}:${data.orderTime.startTime.substring(2, 4)}`}</p>
              </StyledTableCell>
              <StyledTableCell>
                <StyledItemTitle>
                  <strong>{itemTitle[2]}</strong>
                </StyledItemTitle>
                <p>{data.peopleNumber}</p>
              </StyledTableCell>
              <StyledTableCell>
                <StyledItemTitle>
                  <strong>{itemTitle[3]}</strong>
                </StyledItemTitle>
                <p>{data.serviceInfoId.name}</p>
              </StyledTableCell>
              <StyledTableCell>
                <BookingManagementButton data={data} />
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
                    <p>{data._id}</p>
                  </CollapedTableCell>
                  <CollapedTableCell>
                    <StyledCollapedTableRowTitle>
                      {CollapedTableRowTitle[1]}
                    </StyledCollapedTableRowTitle>
                    <p>{data.userId.tel}</p>
                  </CollapedTableCell>
                  <CollapedTableCell>
                    <StyledCollapedTableRowTitle>
                      {CollapedTableRowTitle[2]}
                    </StyledCollapedTableRowTitle>
                    <p>{`${data.bookingTime.substring(
                      0,
                      10
                    )} ${data.bookingTime.substring(12, 16)}`}</p>
                  </CollapedTableCell>
                  <CollapedTableCell>
                    <StyledCollapedTableRowTitle>
                      {CollapedTableRowTitle[3]}
                    </StyledCollapedTableRowTitle>
                    <p>{data.optionInfo}</p>
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
