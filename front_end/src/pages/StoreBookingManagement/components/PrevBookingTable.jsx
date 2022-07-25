import styled from "@emotion/styled";
import { Table, TableRow, TableCell, TableBody, Collapse } from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton, Typography } from "@mui/material";

const itemTitle = ["Date", "Time", "Person", "Service"];

const itemContent = ["20 Feb 2020", "14:00 - 15:00", "2", "Oil massage"];

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
  height: 100px;
  background-color: #8e8e8e;
  display: flex;
  flex-direction: row;
  color: #fff;
  box-shadow: inset 1px 1px 15px rgba(0, 0, 0, 0.5);
`;

const CollapedTableRowTitle = ["Ref No.", "Contact No.", "Book Time", "Note"];

const CollapedTableRowContent = [
  "1234567890",
  "0412345678",
  "18 Jun 2022 13:00",
  "We would like to know about the membership card.",
];

export const PrevBookingTable = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Table>
        <TableBody>
          <TableRow direction="column" sx={{ minWidth: "800px" }}>
            <TableCell sx={{ pl: 10, pt: 3 }}>
              <h4>
                <strong>{itemTitle[0]}</strong>
              </h4>
              <p>{itemContent[0]}</p>
            </TableCell>
            <TableCell sx={{ px: 5, pt: 3 }}>
              <h4>
                <strong>{itemTitle[1]}</strong>
              </h4>
              <p>{itemContent[1]}</p>
            </TableCell>
            <TableCell sx={{ px: 5, pt: 3 }}>
              <h4>
                <strong>{itemTitle[2]}</strong>
              </h4>
              <p>{itemContent[2]}</p>
            </TableCell>
            <TableCell sx={{ px: 5, pt: 3 }}>
              <h4>
                <strong>{itemTitle[3]}</strong>
              </h4>
              <p>{itemContent[3]}</p>
            </TableCell>
            <TableCell sx={{ pl: 5, pt: 3 }}>
              <Typography sx={{ color: "#8E8E8E", fontWeight: 700, pr: 4 }}>
                The order have been finished{" "}
              </Typography>
            </TableCell>
            <TableCell>
              <ShowDetailsWrapper onClick={() => setOpen(!open)}>
                <IconButton aria-label="expand row" size="small">
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                    <p>{CollapedTableRowContent[0]}</p>
                  </TableCell>
                  <TableCell sx={{ px: 5, pt: 3 }}>
                    <h4>
                      <strong>{CollapedTableRowTitle[1]}</strong>
                    </h4>
                    <p>{CollapedTableRowContent[1]}</p>
                  </TableCell>
                  <TableCell sx={{ px: 5, pt: 3 }}>
                    <h4>
                      <strong>{CollapedTableRowTitle[2]}</strong>
                    </h4>
                    <p>{CollapedTableRowContent[2]}</p>
                  </TableCell>
                  <TableCell sx={{ px: 5, pt: 3 }}>
                    <h4>
                      <strong>{CollapedTableRowTitle[3]}</strong>
                    </h4>
                    <p>{CollapedTableRowContent[3]}</p>
                  </TableCell>
                </CollapsibleTableRowWrapper>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
