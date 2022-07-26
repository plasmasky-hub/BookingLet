import styled from "@emotion/styled";
import {
  Box,
  TableRow,
  TableCell,
  Paper,
  Collapse,
  ButtonGroup,
  Button,
} from "@mui/material";
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

const TableFoot = {
  address: "Adelaide",
  date: "18/06/2022",
  time: "13:00 - 14:00",
  status: ["Confirmed", "Unconfirmed", "Cancelled"],
};

const StatusColor = ["#7B8B6F", "#CEA02C", "#D76D6D"];

const StyledButtonGroup = styled(ButtonGroup)`
  width: 150px;
  height: 25px;
`;

const ConfirmButton = styled(Button)`
  width: 75px;
`;

const CancelButton = styled(Button)`
  width: 75px;
`;

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

export const BookingTable = () => {
  const [statusIndex, setStatusIndex] = useState(1);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <StyledTableContainer component={Paper}>
        <TableRow direction="column" sx={{ width: "1000px" }}>
          <TableCell sx={{ px: 3 }}>
            <TableCellImg src={BodyRelaxing} />
          </TableCell>
          <TableCell sx={{ pr: 8 }}>
            <h4>{TableHead.name}</h4>
            <p>{TableFoot.address}</p>
          </TableCell>
          <TableCell sx={{ pr: 8 }}>
            <h4>{TableHead.date}</h4>
            <p>{TableFoot.date}</p>
          </TableCell>
          <TableCell sx={{ pr: 8 }}>
            <h4>{TableHead.time}</h4>
            <p>{TableFoot.time}</p>
          </TableCell>
          <TableCell sx={{ pr: 8 }}>
            <h4>{TableHead.status}</h4>
            <p style={{ color: `${StatusColor[statusIndex]}` }}>
              {TableFoot.status[statusIndex]}
            </p>
          </TableCell>
          <TableCell sx={{ cursor: "pointer" }}>
            <p onClick={handleClick}>Order detail</p>
            <StyledButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              {statusIndex === 1 ? (
                <ConfirmButton
                  onClick={() => {
                    setStatusIndex(0);
                  }}
                >
                  Confirm
                </ConfirmButton>
              ) : (
                <ConfirmButton
                  onClick={() => {
                    setStatusIndex(0);
                  }}
                  disabled
                >
                  Confirm
                </ConfirmButton>
              )}

              {statusIndex === 1 ? (
                <CancelButton
                  onClick={() => {
                    setStatusIndex(2);
                  }}
                >
                  Cancel
                </CancelButton>
              ) : (
                <CancelButton
                  onClick={() => {
                    setStatusIndex(2);
                  }}
                  disabled
                >
                  Cancel
                </CancelButton>
              )}
            </StyledButtonGroup>
          </TableCell>
        </TableRow>
        <TableRow>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CollapsibleTableWrapper>
              <CollapsibleTable>
                <CollapsedTitle>
                  <p>Service Name</p>
                  <p>Reference Number</p>
                  <p>Contact Number</p>
                </CollapsedTitle>
                <div>
                  <p>Chinese Medicine Consultation </p>
                  <p>R088034029385</p>
                  <p>0414123456</p>
                </div>
                <CollapsedTitle>
                  <p>Time of Order</p>
                  <p>Time of Booking</p>
                  <p style={{ color: "#8E8E8E" }}>Note</p>
                </CollapsedTitle>
                <div>
                  <p>15 Jun 2022 18:00:54</p>
                  <p>18 Jun 2022 13:00</p>
                  <p></p>
                </div>
              </CollapsibleTable>
              <CollapsedNotice>
                Waiting for comfirmation from store. If no response, order will
                be cancelled in 16 Jun 2022 18:00
              </CollapsedNotice>
            </CollapsibleTableWrapper>
          </Collapse>
        </TableRow>
      </StyledTableContainer>
    </>
  );
};
