
import Button from '@mui/material/Button';
import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const OrdersWrapper= styled.div`
    color:#fff;
    font-family: 'Helvetica';
    justify-content:center;
`

const ViewAndEditButton = styled.div`
    /* width:90%; */
    display:flex;
    justify-content: flex-end;
    padding-top:50px;
    margin-right:0px;
`

const ViewStoreButton = styled(Button)`
    width:60%;
    height: 37px;
    width:25%;
    font-family: 'Helvetica';
    justify-items:end;
    margin-right:0px;
`

const EditStoreInfoButton = styled(Button)`
    width:60%;
    height: 37px;
    width:25%;

`
const OrderStatus = (props) =>{ 
    
    const navigate = useNavigate();
    const orderSize = props.orders.length;
    const favoriteUsersSize = props.favoriteUsersSize;

    return(
    <OrdersWrapper>
        <div style={{color:'#FA8279'}}>
          {orderSize} New bookings need to be confirmed now</div>
        <div> {favoriteUsersSize} users have add this store to their favorite. </div>

        <ViewAndEditButton>
            <EditStoreInfoButton sx={{ mr:2,textTransform: 'capitalize',borderRadius: 5,backgroundColor: "#FA8279", color:"#FFFF"  }}
                variant="contained" 
                onClick={ () => navigate(`/StoreSettingPage/${props.storeId}`) }
            >
                Edit Store Information
            </EditStoreInfoButton>
            <ViewStoreButton 
                sx={{textTransform: 'capitalize' ,borderRadius: 5 ,backgroundColor: "#93B3F4", color:"#FFFF" }}
                variant="contained"   
            >
                View Store Bookings
            </ViewStoreButton>
        </ViewAndEditButton>
    </OrdersWrapper>
)};
 
export default OrderStatus;