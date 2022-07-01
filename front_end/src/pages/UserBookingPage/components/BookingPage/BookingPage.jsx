import styled from '@emotion/styled';
import { Container, Chip, Stack, TableContainer, Table, TableRow, TableCell, Paper } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useState } from 'react';
import BodyRelaxing from '../../../../assets/BodyRelaxing.png';


const BookingPageWrapper = styled(Container)`
    min-width: 1000px;
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    background-color: #fff;
`;

// const chipMembers = () => {
//     const [clicked, setClicked] = useState([0]);
//     const data = [
//         {id: 1, name: 'All'},
//         {id: 2, name: 'Uncomfirmed'},
//         {id: 3, name: 'Confirmed'},
//         {id: 4, name: 'Done'},
//     ];
// };

const StyledChips = styled(Chip)`
    height: 22px;
    padding: 0 10px;
    font-size: 0.7rem;
    text-align: center;
    align-items: center;
    cursor: pointer;
    transition: ease-in-out 0.4s;
    &:hover {
        font-weight: 700;
        color: #fff;
        background-color: #7B8B6F;
    };
`;

// const TableRowWrapper = styled(Box)`
//     min-width: 1000px;
//     min-height: 130px;
// `;

const TableCellImg = styled.img`
    width: 150px;
    height: 100px;
`;

const TableHead = {
    name: 'Facial',
    date: 'Date',
    time: 'Time',
    stutas: 'Status'
};

const TableFoot = {
    address: 'Adelaide',
    date: '18/06/2022',
    time: '13:00',
    stutas: 'Unconfirmed'
};

const StyledTableHead = styled.span`
    font-weight: 700;
    font-size: 0.7rem;
`;

const StyledTableFoot = styled.span`
    font-size: 0.7rem;
`;

export const BookingPage = () => (
    <BookingPageWrapper>
        <h2>My Bookings</h2>
        <Stack direction="row" spacing={1}>
            <FilterAltOutlinedIcon sx={{ mr: 1 }} />
            <span><strong>Filter by booking status</strong></span>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ py: 2 }}>
            {/* {[data].map((chipMembers) => (
            <Chip className='chipMembers'>{chipMembers}</Chip>
        ))} */}
            <StyledChips label='All'></StyledChips>
            <StyledChips label='Uncomfirmed'></StyledChips>
            <StyledChips label='Confirmed'></StyledChips>
            <StyledChips label='Done'></StyledChips>
        </Stack>
        <TableContainer component={Paper}>
            <TableRow direction='row'>
                <TableCell>
                    <TableCellImg src={BodyRelaxing} />
                </TableCell>
                <TableCell>
                <StyledTableHead>
                    {TableHead.name}
                </StyledTableHead>
                </TableCell>
                <TableCell>
                <StyledTableHead>
                    {TableHead.date}
                </StyledTableHead>
                </TableCell>
                <TableCell>
                <StyledTableHead>
                    {TableHead.time}
                </StyledTableHead>
                </TableCell>
                <TableCell>
                <StyledTableHead>
                    {TableHead.status}
                </StyledTableHead>
                </TableCell>
            </TableRow>
        </TableContainer>
    </BookingPageWrapper>
);