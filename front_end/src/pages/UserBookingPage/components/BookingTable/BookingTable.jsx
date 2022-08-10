import styled from "@emotion/styled";
import { Box, TableRow, TableCell, Paper, Collapse } from "@mui/material";
import { useState } from "react";
import BodyRelaxing from "../../../../assets/BodyRelaxing.png";

const StyledTableContainer = styled(Box)`
  min-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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

const CollapsibleTableWrapper = styled(Box)`
  min-width: 1000px;
  width: 100%;
  height: 160px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const CollapsibleTable = styled(Box)`
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
  background-color: #fff;
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
              <TableCell sx={{ px: 3 }}>
                <TableCellImg src={BodyRelaxing} />
              </TableCell>
              <TableCell sx={{ pr: 8 }}>
                <h4>{TableHead.address}</h4>
              </TableCell>
              <TableCell sx={{ pr: 8 }}>
                <h4>{TableHead.date}</h4>
                <p>{data.orders.orderTime.date.toString().substring(0, 10)}</p>
              </TableCell>
              <TableCell sx={{ pr: 8 }}>
                <h4>{TableHead.time}</h4>
                <p>{`${data.orders.orderTime.startTime.substring(
                  0,
                  2
                )}:${data.orders.orderTime.startTime.substring(2, 4)}`}</p>
              </TableCell>
              <TableCell sx={{ pr: 8 }}>
                <h4>{TableHead.status}</h4>
                <p
                  style={{ color: data.bookingStatus ? "#7B8B6F" : "#CEA02C" }}
                >
                  {data.orders.bookingStatus ? "Confirmed" : "Unconfirmed"}
                </p>
              </TableCell>
              <TableCell sx={{ cursor: "pointer" }}>
                <p onClick={handleClick}>Order detail</p>
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
                      <p>{`${data.bookingTime.substring(
                        0,
                        10
                      )} ${data.bookingTime.substring(11, 19)}`}</p>
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
