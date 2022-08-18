import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Collapse,
  Table,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@mui/material";
import { UpcomingBookingtTableRowButton } from "./UpcomingBookingtTableRowButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton, Typography } from "@mui/material";

// const TableWrapper = styled(Box)`
//   min-width: 1000px;
//   width: 100%;
//   height: 100px;
//   background: #fff;
//   padding: 10px;
// `;

const itemTitle = ["Date", "Time", "Person", "Service"];

const StyledItemTitle = styled.h4`
  font-weight: 600;
`;

// const StyledTableRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;
// `;

// const TableCell = styled.div`
//   width: 90px;
//   height: 70px;
//   border-bottom: none;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   &:nth-of-type(4) {
//     width: 180px;
//   }
//   &:nth-of-type(5) {
//     width: 220px;
//   }
// `;

// const TableCell = styled.div`
//   width: 75px;
//   height: 18px;
//   color: #8e8e8e;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   cursor: pointer;
// `;

const CollapsibleTableRowWrapper = styled.table`
  min-width: 1000px;
  width: 100%;
  height: 90px;
  padding-top: 10px;
  background-color: #8e8e8e;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;
  color: #fff;
  box-shadow: inset 1px 1px 15px rgba(0, 0, 0, 0.5);
`;

// const CollapedTableRow = styled.div`
//   min-width: 1000px;
//   width: 100%;
//   height: 70px;
//   padding: 10px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

// const TableCell = styled.div`
//   width: 250px;
//   height: 70px;
//   border-bottom: none;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   color: #fff;
// `;

const ShowDetailsWrapper = styled.div`
  width: 75px;
  height: 18px;
  color: #8e8e8e;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
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

const StyledCollapedTableRowText = styled.p`
  color: #fff;
  font-weight: 400;
`;

// const useStyles = makeStyles((theme) => ({
//   TableRow: {
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "colomn",
//     },
//   },
// }));

export const UpcomingBookingTableRow = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {data && (
        <>
          <Table sx={{ mb: 0.2 }}>
            <TableBody>
              <TableRow
                direction={{ xs: "row", sm: "row", md: "colomn" }}
                sx={{
                  minWidth: {
                    xs: "300px",
                    sm: "550px",
                    md: "1000px",
                  },
                  backgroundColor: "#fff",
                }}
              >
                <TableCell>
                  <StyledItemTitle>
                    <strong>{itemTitle[0]}</strong>
                  </StyledItemTitle>
                  <p>
                    {new Intl.DateTimeFormat("en-AU", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(Date.parse(data.bookingTime))}
                  </p>
                </TableCell>
                <TableCell>
                  <StyledItemTitle>
                    <strong>{itemTitle[1]}</strong>
                  </StyledItemTitle>
                  <p>
                    {new Intl.DateTimeFormat("en-AU", {
                      hour: "2-digit",
                      minute: "numeric",
                      hourCycle: "h23",
                    }).format(Date.parse(data.bookingTime))}
                  </p>
                </TableCell>
                <TableCell>
                  <StyledItemTitle>
                    <strong>{itemTitle[2]}</strong>
                  </StyledItemTitle>
                  <p>{data.peopleNumber}</p>
                </TableCell>
                <TableCell>
                  <StyledItemTitle>
                    <strong>{itemTitle[3]}</strong>
                  </StyledItemTitle>
                  <p>{data.serviceInfoId.name}</p>
                </TableCell>
                <TableCell>
                  <UpcomingBookingtTableRowButton data={data} />
                </TableCell>
                <TableCell>
                  <ShowDetailsWrapper
                    onClick={() => setOpen(!open)}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IconButton aria-label="expand row" size="small">
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                    <Typography>Details</Typography>
                  </ShowDetailsWrapper>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableBody>
              <TableRow>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <CollapsibleTableRowWrapper>
                    <TableRow
                      sx={{
                        minWidth: "1000px",
                        height: "80px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        pt: 2,
                      }}
                    >
                      <TableCell>
                        <StyledCollapedTableRowTitle>
                          {CollapedTableRowTitle[0]}
                        </StyledCollapedTableRowTitle>
                        <StyledCollapedTableRowText>
                          {data._id}
                        </StyledCollapedTableRowText>
                      </TableCell>
                      <TableCell>
                        <StyledCollapedTableRowTitle>
                          {CollapedTableRowTitle[1]}
                        </StyledCollapedTableRowTitle>
                        <StyledCollapedTableRowText>
                          {data.userId.tel}
                        </StyledCollapedTableRowText>
                      </TableCell>
                      <TableCell>
                        <StyledCollapedTableRowTitle>
                          {CollapedTableRowTitle[2]}
                        </StyledCollapedTableRowTitle>
                        <StyledCollapedTableRowText>{`${data.bookingTime.substring(
                          0,
                          10
                        )} ${data.bookingTime.substring(
                          12,
                          16
                        )}`}</StyledCollapedTableRowText>
                      </TableCell>
                      <TableCell>
                        <StyledCollapedTableRowTitle>
                          {CollapedTableRowTitle[3]}
                        </StyledCollapedTableRowTitle>
                        <StyledCollapedTableRowText>
                          {data.optionInfo}
                        </StyledCollapedTableRowText>
                      </TableCell>
                    </TableRow>
                  </CollapsibleTableRowWrapper>
                </Collapse>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};
