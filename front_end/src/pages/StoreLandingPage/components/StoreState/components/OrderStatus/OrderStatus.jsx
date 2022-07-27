
import Button from '@mui/material/Button';
import * as React from 'react';
import styled from 'styled-components';;

const OrdersWrapper= styled.div`
    color:#FFFFFF;
`

const ViewAndEditButton = styled.div`
    border-radius:10px;
    color:#ffff;
    text-align: right;
    /* float:right; */
    width:90%;
`

const ViewStoreButton = styled(Button)`
    font-size: 11px;
    height: 37px;
    width:25%;
    font-family: 'Helvetica';
    
    
`

const EditStoreInfoButton = styled(Button)`
    font-size: 11px;
    height: 37px;
    width:25%;
    margin-right:10px;
    /* float:right; */

`
const OrderStatus = () =>{ 
    
    return(
    <OrdersWrapper>
    <div>2 New bookings need to be comfirmed now</div>
    <div>12 Coming bookings today</div>
    <ViewAndEditButton>
    <EditStoreInfoButton variant="contained" color ="buttonBlue">Edit Store Information</EditStoreInfoButton>
    <ViewStoreButton variant="contained" color ="buttonOrange">View Store Bookings</ViewStoreButton>
    </ViewAndEditButton>
    </OrdersWrapper>
)};
 
export default OrderStatus;