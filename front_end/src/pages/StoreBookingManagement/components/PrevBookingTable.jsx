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
  height: 100px;
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

export const PrevBookingTable = ({ data }) => {
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
                <TableCell sx={{ pl: 10, pt: 3 }}>
                  <h4>
                    <strong>{itemTitle[0]}</strong>
                  </h4>
                  <p>{data.orderTime.date.toString().substring(0, 10)}</p>
                </TableCell>
                <TableCell sx={{ px: 5, pt: 3 }}>
                  <h4>
                    <strong>{itemTitle[1]}</strong>
                  </h4>
                  <p>{`${data.orderTime.startTime.substring(
                    0,
                    2
                  )}:${data.orderTime.startTime.substring(2, 4)}`}</p>
                </TableCell>
                <TableCell sx={{ px: 5, pt: 3 }}>
                  <h4>
                    <strong>{itemTitle[2]}</strong>
                  </h4>
                  <p>{data.peopleNumber}</p>
                </TableCell>
                <TableCell sx={{ px: 5, pt: 3 }}>
                  <h4>
                    <strong>{itemTitle[3]}</strong>
                  </h4>
                  <p>{data.serviceInfoId.name}</p>
                </TableCell>
                <TableCell sx={{ pl: 5, pt: 3 }}>
                  <Typography sx={{ color: "#8E8E8E", fontWeight: 700, pr: 4 }}>
                    Order Finished{" "}
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
                <TableCell>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <CollapsibleTableRowWrapper>
                      <TableCell sx={{ pl: 10, pt: 3 }}>
                        <h4>
                          <strong>{CollapedTableRowTitle[0]}</strong>
                        </h4>
                        <p>{data._id}</p>
                      </TableCell>
                      <TableCell sx={{ px: 5, pt: 3 }}>
                        <h4>
                          <strong>{CollapedTableRowTitle[1]}</strong>
                        </h4>
                        <p>{data.userId.tel}</p>
                      </TableCell>
                      <TableCell sx={{ px: 5, pt: 3 }}>
                        <h4>
                          <strong>{CollapedTableRowTitle[2]}</strong>
                        </h4>
                        <p>{`${data.bookingTime.substring(
                          0,
                          10
                        )} ${data.bookingTime.substring(12, 16)}`}</p>
                      </TableCell>
                      <TableCell sx={{ px: 5, pt: 3 }}>
                        <h4>
                          <strong>{CollapedTableRowTitle[3]}</strong>
                        </h4>
                        <p>{data.optionInfo}</p>
                      </TableCell>
                    </CollapsibleTableRowWrapper>
                  </Collapse>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};
