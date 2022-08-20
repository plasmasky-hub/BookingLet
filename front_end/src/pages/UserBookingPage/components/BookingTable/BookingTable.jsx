import styled from "@emotion/styled";
import {
  Box,
  TableRow,
  TableCell,
  Paper,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledTableContainer = styled(Box)`
  min-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  margin-bottom: 8px;
`;

const TableCellImg = styled.img`
  width: 150px;
  height: 100px;
`;

const TableHead = {
  name: "Facial",
  date: "Date",
  time: "Time",
  status: "Status",
};

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

const CollapsibleTableWrapper = styled(Box)`
  min-width: 1000px;
  width: 100%;
  height: 180px;
  /* background-color: #fff; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const CollapsibleTable = styled(Box)`
  min-width: 1000px;
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const CollapsedTitle = styled(Box)`
  font-weight: 600;
  font-size: 1rem;
`;

const CollapsedNotice = styled(Box)`
  width: 100%;
  font-style: italic;
  color: #d76d6d;
  /* background-color: #fff; */
  padding: 0 0 5px 40px;
`;

export const BookingTable = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {data && (
        <>
          <StyledTableContainer component={Paper}>
            <TableRow direction="column" sx={{ width: "1000px" }}>
              <TableCell>
                <TableCellImg src={data.storeId.photo[0]} />
              </TableCell>
              <TableCell sx={{ pr: 8 }}>
                <h4>
                  <strong>{TableHead.address}</strong>
                </h4>
              </TableCell>
              <TableCell sx={{ pr: 8 }}>
                <h4>
                  <strong>{TableHead.date}</strong>
                </h4>
                <p>
                  {new Intl.DateTimeFormat("en-AU", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(Date.parse(data.bookingTime))}
                </p>
              </TableCell>
              <TableCell sx={{ pr: 8 }}>
                <h4>
                  <strong>{TableHead.time}</strong>
                </h4>
                <p>
                  {new Intl.DateTimeFormat("en-AU", {
                    hour: "2-digit",
                    minute: "numeric",
                    hourCycle: "h23",
                  }).format(Date.parse(data.bookingTime))}
                </p>
              </TableCell>
              <TableCell sx={{ pr: 8 }}>
                <h4>
                  <strong>{TableHead.status}</strong>
                </h4>
                <p
                  style={{ color: data.bookingStatus ? "#7B8B6F" : "#CEA02C" }}
                >
                  {data.bookingStatus ? "Confirmed" : "Unconfirmed"}
                </p>
              </TableCell>
              <TableCell sx={{ cursor: "pointer" }}>
                <ShowDetailsWrapper
                  onClick={handleClick}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <IconButton aria-label="expand row" size="small">
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                  <Typography>Details</Typography>
                </ShowDetailsWrapper>
              </TableCell>
            </TableRow>
            <TableRow>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <CollapsibleTableWrapper>
                  <CollapsibleTable>
                    <CollapsedTitle>
                      <p>Store Name</p>
                      <p>Reference Number</p>
                      <p>Contact Number</p>
                    </CollapsedTitle>
                    <div>
                      <p>{data.storeId.name} </p>
                      <p>{data._id}</p>
                      <p>{data.storeId.tel}</p>
                    </div>
                    <CollapsedTitle>
                      <p>Service Name</p>
                      <p>Time of Booking</p>
                      <p style={{ color: "#8E8E8E" }}>Note</p>
                    </CollapsedTitle>
                    <div>
                      <p>{data.serviceInfoId.name}</p>
                      <p>{`${new Intl.DateTimeFormat("en-AU", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(
                        Date.parse(data.bookingTime)
                      )} ${new Intl.DateTimeFormat("en-AU", {
                        hour: "2-digit",
                        minute: "numeric",
                        hourCycle: "h23",
                      }).format(Date.parse(data.bookingTime))}`}</p>
                      <p></p>
                    </div>
                  </CollapsibleTable>
                  <CollapsedNotice>
                    Waiting for confirmation from store. If no response, order
                    will be considered as confirmed.
                  </CollapsedNotice>
                </CollapsibleTableWrapper>
              </Collapse>
            </TableRow>
          </StyledTableContainer>
        </>
      )}
    </>
  );
};
