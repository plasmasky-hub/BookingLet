import styled from '@emotion/styled';
import { TableRow, TableCell, Paper, Collapse, Box } from '@mui/material';
import { BookingManagementButton } from './BookingManagementButton';
import { useState } from 'react';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { Typography } from '@mui/material';

const TableWrapper = styled(Paper)`
  min-width: 800px;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

const itemTitle = ['Date', 'Time', 'Person', 'Service'];

const itemContent = ['20 Feb 2020', '14:00 - 15:00', '2', 'Oil massage'];

const ShowDetailsWrapper = styled.div`
  width: 75px;
  height: 18px;
  color: #8E8E8E;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const CollapsibleTableRowWrapper = styled(Box)`
  min-width: 800px;
  width: 100%;
  height: 160px;
  background-color: #8E8E8E;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const CollapsibleTableRow = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const CollapedTableRowTitle = ['Ref No.', 'Contact No.', 'Book Time', 'Note'];

const CollapedTableRowContent = ['1234567890', '0412345678', '18 Jun 2022 13:00', 'qwertyuioopllkkjhgfdssxxcvbnmm'];

export const BookingManagementTable = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <TableWrapper>
        <TableRow direction='column' sx={{ minWidth: '800px' }}>
          <TableCell sx={{ pl: 10, pt: 3 }}>
          <h4><strong>{itemTitle[0]}</strong></h4>
          <p>{itemContent[0]}</p>
        </TableCell>
        <TableCell sx={{ px: 5, pt: 3 }}>
          <h4><strong>{itemTitle[1]}</strong></h4>
          <p>{itemContent[1]}</p>
        </TableCell>
        <TableCell sx={{ px: 5, pt: 3 }}>
          <h4><strong>{itemTitle[2]}</strong></h4>
          <p>{itemContent[2]}</p>
        </TableCell>
        <TableCell sx={{ px: 5, pt: 3 }}>
          <h4><strong>{itemTitle[3]}</strong></h4>
          <p>{itemContent[3]}</p>
        </TableCell>
        <TableCell sx={{ px: 5, pt: 3 }}>
          <BookingManagementButton />
        </TableCell>
        <TableCell>
          <BookingManagementButton />
        </TableCell>
        <TableCell>
          <ShowDetailsWrapper>
            <ListOutlinedIcon />
            <Typography onClick={handleClick}>Details</Typography>
          </ShowDetailsWrapper>
        </TableCell>
      </TableRow>
      
      <TableRow>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CollapsibleTableRowWrapper>
            <CollapsibleTableRow direction='column'>
            <TableCell sx={{ pl: 10, pt: 3 }}>
          <h4><strong>{CollapedTableRowTitle[0]}</strong></h4>
          <p>{CollapedTableRowContent[0]}</p>
        </TableCell>
        <TableCell sx={{ px: 5, pt: 3 }}>
          <h4><strong>{CollapedTableRowTitle[1]}</strong></h4>
          <p>{CollapedTableRowContent[1]}</p>
        </TableCell>
        <TableCell sx={{ px: 5, pt: 3 }}>
          <h4><strong>{CollapedTableRowTitle[2]}</strong></h4>
          <p>{CollapedTableRowContent[2]}</p>
        </TableCell>
        <TableCell sx={{ px: 5, pt: 3 }}>
          <h4><strong>{CollapedTableRowTitle[3]}</strong></h4>
          <p>{CollapedTableRowContent[3]}</p>
        </TableCell>
            </CollapsibleTableRow>
          </CollapsibleTableRowWrapper>
        </Collapse>
        </TableRow>
    </TableWrapper>
  )
};