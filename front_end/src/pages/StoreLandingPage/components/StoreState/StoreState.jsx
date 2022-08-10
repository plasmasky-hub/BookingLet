// import styled from 'styled-components';
import OrderStatus from './components/OrderStatus/OrderStatus';
import StoreInfoBar from './components/StoreInfoBar/StoreInfoBar';
import foodBg from '../../../../assets/foodBg.jpeg';
import {useGetUserStoresQuery} from '../../../../store/api/userApi';
import { styled } from '@mui/material/styles';

import { Box } from '@mui/material';


const StoreInfoWrapper = styled(Box)( ({theme}) => ({
    [theme.breakpoints.up(600)]: {
        width: '500px',

    },
    [theme.breakpoints.up(1000)]: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'1000px',
    },
    
    /* background-color: #aabb9d; */
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    /* background-color: #ffffff5a;
    backdrop-filter: blur(20px);
    /* border-radius: 15px; */
    /* padding: 30px; */
    margin: 'auto',

}));

const StoreContainer = styled(Box)( ({theme}) => ({

    width: '100%',
    height: '257px',
    // background-image: url(${foodBg}) ;
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
    padding: '30px',
    //filter: brightness(50%);
    backgroundColor: '#ffffff71',
    backgroundSize: "cover",
    borderRadius: '32px',

    boxShadow: '0 0 16px rgb(0 0 0 / 50%)',
    backdropFilter: 'blur(20px)',
    // '@hr'{
    //     border-top: 0.8px solid #a4a4a4;
    // }

    color: '#000',

}));

 const StoreState= (props) => {
    const id = '62d43d784d61d2e252076471';
    // const id = props.userId;
    console.log("🚀 ~ file: StoreState.jsx ~ line 55 ~ StoreState ~ id", id)

    const {
      data: user,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetUserStoresQuery(id);

    console.log(user);
    // const UserStores = useGetUserStoresQuery(_id)
    // const StoreContainers = 

    return ( 
        <StoreInfoWrapper>
            {isError && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
            {isSuccess && (
                user.stores !== undefined && ( user?.stores.map((store) => 
                    (<StoreContainer >
                        <StoreInfoBar storeId={store._id} />
                    
                        <hr />
                        <OrderStatus  storeId={store._id} orders={store.orders}/>
                    </StoreContainer>
                    )
                ))
                
            )}
        </StoreInfoWrapper>
     );
}
 
export default StoreState;