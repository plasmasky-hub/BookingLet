import styled from '@emotion/styled';
import { Container, Chip, Card, Box, Table } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const BookingPageWrapper = styled(Container)({
    minWidth: '1000px',
    width: '100%',
    height: '100%',
    padding: '20px 30px',
    backgroundColor: '#fff',

});

export const BookingPage = () => {
    return(
        <BookingPageWrapper>
            <h2>My Bookings</h2>
            <FilterAltOutlinedIcon />
            <p>Filter by booking status</p>
        </BookingPageWrapper>
    )
};