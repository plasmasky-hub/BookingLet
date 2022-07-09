import styled from '@emotion/styled';
import { Box, TableRow, TableCell, Paper, Typography } from '@mui/material';
// import { useState } from 'react';
import BodyRelaxing from '../../../../assets/BodyRelaxing.png';

const StyledTableContainer = styled(Box)`
    min-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: #f0f0f0;
    margin-bottom: 6px;
`

const TableCellImg = styled.img`
    width: 150px;
    height: 100px;
`;

const TableHead = {
    name: 'Facial',
    date: 'Date',
    time: 'Time',
    status: 'Status'
};

const TableFoot = {
    address: 'Adelaide',
    date: '18/06/2022',
    time: '13:00',
    status: 'Unconfirmed'
};

export const BookingTable = () => {
    // const CheckStatus = () => {
    //     const [confirmed, setConfirmed] = useState('unconfirmed');
    //     const StatusConfirmation = () => {
    //         setConfirmed(TableFoot.status === 'unconfirmed' ? <Typography sx={{ color: '#7B8B6F' }} /> : <Typography sx={{ color: '#CEA02C' }} />)
    //     }
    // };
    return (
        <StyledTableContainer component={Paper}>
            <TableRow direction='column' sx={{ width: '1000px' }}>
                <TableCell sx={{ px: 3 }}>
                    <TableCellImg src={BodyRelaxing} />
                </TableCell>
                <TableCell sx={{ pr: 10 }}>
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
                    <Typography
                        varient='p'
                    >
                        {TableFoot.status}
                    </Typography>
                </TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>
                    <p>Order detail</p>
                </TableCell>
            </TableRow>
        </StyledTableContainer>
    )
};