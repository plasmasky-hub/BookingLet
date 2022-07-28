
import Button from '@mui/material/Button';
import * as React from 'react';
import styled from 'styled-components';

const OrdersWrapper= styled.div`
    color:#FFFFFF;
    font-family: 'Helvetica';
    justify-content:center;
`

const ViewAndEditButton = styled.div`
    width:90%;
    display:flex;
    justify-content: flex-end;
`

const ViewStoreButton = styled(Button)`
    width:60%;
    height: 37px;
    width:25%;
    font-family: 'Helvetica';
    justify-items:end;
    
`

const EditStoreInfoButton = styled(Button)`
    width:60%;
    height: 37px;
    width:25%;

`
const OrderStatus = () =>{ 
    
    return(
    <OrdersWrapper>
    <div>
        <b>2</b>
     New bookings need to be comfirmed now</div>
    <div>12 Coming bookings today</div>
    <ViewAndEditButton>
    <EditStoreInfoButton sx={{ mr:2,textTransform: 'capitalize'  }}
    variant="contained" 
    color ="buttonBlue">Edit Store Information</EditStoreInfoButton>
    <ViewStoreButton 
    sx={{textTransform: 'capitalize'  }}
    variant="contained" 
    color ="buttonOrange">View Store Bookings</ViewStoreButton>
    </ViewAndEditButton>
    </OrdersWrapper>
)};
 
export default OrderStatus;