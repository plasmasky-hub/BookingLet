import styled from 'styled-components';
import OrderStatus from './components/OrderStatus/OrderStatus';
import StoreInfoBar from './components/StoreInfoBar/StoreInfoBar';
import foodBg from '../../../../assets/foodBg.jpeg';
import {useGetUserStoresQuery} from '../../../../store/api/userApi';


const StoreInfoWrapper = styled.div`
    width:100%;
    background-color: #aabb9d;
    display:flex;
    justify-content: center;
    align-items:center;
    
`
const StoreInfoContainer = styled.div`
    display:relative;
    margin-top: 50px;
    width: 90%;
    margin-left:-70x;
    .h2{
        font-family: 'Helvetica';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 26px;
        color: #000000;

    }
    
`

const StoreContainer = styled.div`
    width: 90%;
    height: 257px;
    background-image:url(${foodBg}) ;
    align-items:center;
    justify-content:center;
    margin:20px auto;
    padding: 30px;
    //filter: brightness(50%);
    background-size: cover;
    border-radius: 10px;
    border-radius:32px;
    box-shadow: 0 0 16px rgb(0 0 0 / 50%);
    .hr{
        border-top: 0.8px solid #a4a4a4;
    }

`

 const StoreState= ({userId}) => {
    // userId = '62d43d784d61d2e252076471';
    userId = sessionStorage.getItem('userId');
    const userData = useGetUserStoresQuery(userId);

    const {
      data: user,
      isLoading,
      isSuccess,
      isError,
      error,
    } = userData;
    console.log(user,userData);
    // const UserStores = useGetUserStoresQuery(_id)
    // const StoreContainers = 

    return ( 
        <StoreInfoWrapper>
            <StoreInfoContainer>
            <h2>Opened Stores</h2>
            {isError && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
            {isSuccess && (
                 user.stores!== undefined &&(user?.stores.map((store) => 
                  (<StoreContainer key= {store._id} >
                     <StoreInfoBar storeId={store._id} />
                     
                     <hr />
                     <OrderStatus />
                 </StoreContainer>
                 )
                ))
                
            )}
            
            <h2>Closed Stores</h2>
            </StoreInfoContainer>
        </StoreInfoWrapper>
     );
}
 
export default StoreState;