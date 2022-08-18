import styled from "@emotion/styled";
import { Table, TableRow, TableCell, TableBody, Collapse } from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton, Typography } from "@mui/material";

const itemTitle = ["Date", "Time", "Person", "Service"];

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

const CollapsibleTableRowWrapper = styled.div`
  min-width: 1000px;
  width: 100%;
  height: 80px;
  background-color: #8e8e8e;
  display: flex;
  flex-direction: row;
  color: #fff;
  box-shadow: inset 1px 1px 15px rgba(0, 0, 0, 0.5);
`;

const CollapedTableRowTitle = [
  "Reference No.",
  "Contact No.",
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

export const PrevBookingTableRow = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {data && (
        <>
          <Table>
            <TableBody>
              <TableRow
                direction="column"
                sx={{ minWidth: "1000px", backgroundColor: "#fff" }}
              >
                <TableCell>
                  <h4>
                    <strong>{itemTitle[0]}</strong>
                  </h4>
                  <p>
                    {new Intl.DateTimeFormat("en-AU", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(Date.parse(data.bookingTime))}
                  </p>
                </TableCell>
                <TableCell>
                  <h4>
                    <strong>{itemTitle[1]}</strong>
                  </h4>
                  <p>
                    {new Intl.DateTimeFormat("en-AU", {
                      hour: "2-digit",
                      minute: "numeric",
                      hourCycle: "h23",
                    }).format(Date.parse(data.bookingTime))}
                  </p>
                </TableCell>
                <TableCell>
                  <h4>
                    <strong>{itemTitle[2]}</strong>
                  </h4>
                  <p>{data.peopleNumber}</p>
                </TableCell>
                <TableCell>
                  <h4>
                    <strong>{itemTitle[3]}</strong>
                  </h4>
                  <p>{data.serviceInfoId.name}</p>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "#8E8E8E", fontWeight: 700, pr: 4 }}>
                    Order Finished
                  </Typography>
                </TableCell>
                <TableCell>
                  <ShowDetailsWrapper onClick={() => setOpen(!open)}>
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
                    <TableRow direction="column" sx={{ minWidth: "1000px" }}>
                      <TableCell>
                        <StyledCollapedTableRowTitle>
                          <strong>{CollapedTableRowTitle[0]}</strong>
                        </StyledCollapedTableRowTitle>
                        <StyledCollapedTableRowText>
                          {data._id}
                        </StyledCollapedTableRowText>
                      </TableCell>
                      <TableCell>
                        <StyledCollapedTableRowTitle>
                          <strong>{CollapedTableRowTitle[1]}</strong>
                        </StyledCollapedTableRowTitle>
                        <StyledCollapedTableRowText>
                          {data.userId.tel}
                        </StyledCollapedTableRowText>
                      </TableCell>
                      <TableCell>
                        <StyledCollapedTableRowTitle>
                          <strong>{CollapedTableRowTitle[2]}</strong>
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
                          <strong>{CollapedTableRowTitle[3]}</strong>
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
