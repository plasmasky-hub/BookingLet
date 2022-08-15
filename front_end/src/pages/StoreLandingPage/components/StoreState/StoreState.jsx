import styled from 'styled-components';
import OrderStatus from './components/OrderStatus/OrderStatus';
import StoreInfoBar from './components/StoreInfoBar/StoreInfoBar';
import foodBg from '../../../../assets/foodBg.jpeg';
import {useGetUserStoresQuery} from '../../../../store/api/userApi';



const StoreInfoContainer = styled.div`
    display:absolute;
    width: 90%;
    /* margin-left:-70x; */
    margin: auto;
    background-color:#ffffff58;
    backdrop-filter: blur(8px);
    padding: 20px;
    border-radius: 15px;
    margin-top:-30px;
`

const StoreContainer = styled.div`
    width: 90%;
    height: 257px;
    background-image:url(${foodBg}) ;
    align-items:center;
    justify-content:center;
    margin:20px auto;
    padding: 25px;
    //filter: brightness(50%);
    background-size: cover;
    border-radius:10px;
    box-shadow: 0 0 16px rgb(0 0 0 / 50%);
    .hr{
        border-top: 0.8px solid #a4a4a4;
    }

`

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
            <StoreInfoContainer>
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
            
            </StoreInfoContainer>
        
     );
}
 
export default StoreState;