// import styled from 'styled-components';
import OrderStatus from './components/OrderStatus/OrderStatus';
import StoreInfoBar from './components/StoreInfoBar/StoreInfoBar';
import foodBg from '../../../../assets/foodBg.jpeg';
import {useGetUserStoresQuery} from '../../../../store/api/userApi';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// =======
// const StoreInfoWrapper = styled.div`
//     width:100%;
//     background-color: #aabb9d;
//     display:flex;
//     justify-content: center;
//     align-items:center;
    
// `
// const StoreInfoContainer = styled.div`
//     display:relative;
//     margin-top: 50px;
//     width: 90%;
//     margin-left:-70x;
//     .h2{
//         font-family: 'Helvetica';
//         font-style: normal;
//         font-weight: 700;
//         font-size: 20px;
//         line-height: 26px;
//         color: #000000;
// >>>>>>> Stashed changes

const StoreInfoWrapper = styled(Box)( ({theme}) => ({
    [theme.breakpoints.up(600)]: {
        width: '500px',

    },
    [theme.breakpoints.up(1000)]: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'1200px',
    },
    
    /* background-color: #aabb9d; */
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // background-color: #ffffff5a;
    // backdrop-filter: blur(20px);
    // border-radius: 15px;
    // padding: 30px;
    marginTop:'50px',
    borderRadius: '20px',
    backdropFilter: 'blur(8px)',
    backgroundColor: '#ffffff7b',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    padding:'30px',


}));

const StoreContainer = styled(Box)( ({theme}) => ({
    width: '1000px',
    height: '257px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px auto',
    padding: '30px',
// =======
// const StoreContainer = styled.div`
//     width: 90%;
//     height: 257px;
//     /* background-image:url(${foodBg}) ; */
//     align-items:center;
//     justify-content:center;
//     margin:20px auto;
//     padding: 30px;
// >>>>>>> Stashed changes
// =======
// const StoreContainer = styled.div`
//     width: 90%;
//     height: 257px;
//     /* background-image:url(${foodBg}) ; */
//     align-items:center;
//     justify-content:center;
//     margin:20px auto;
//     padding: 30px;
// >>>>>>> Stashed changes
    //filter: brightness(50%);
    // backgroundColor: '#ffffff71',
    backgroundSize: "cover",
    borderRadius: '32px',
    // backgroundImage: `url(${foodBg})`,
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
    const background =props.userBackgroundPhoto;
    const {
      data: user,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetUserStoresQuery(id);
    // const name = props.userName;
    
   
    console.log(user); 
    // const UserStores = useGetUserStoresQuery(_id)
    // const StoreContainers = 
    // const makeBackgroundPhoto = (backgroundPhoto) => {
    //     // return categoryIds[0].name;
    //     return backgroundPhoto;

    return ( 
        <StoreInfoWrapper>
            {isError && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
            {isSuccess && (
                user.stores !== undefined && ( user?.stores.map((store) => 
// <<<<<<< Updated upstream
//                     (<StoreContainer
//                         // style={{backgroundImage:`url(${makeBackgroundPhoto(user.backgroundPhoto)})`}}
//                         style={{backgroundImage:`url(${store.backgroundPhoto})`}} 
//                         // style={{backgroundImage:`url(${background})`}}    
// =======
                    (<StoreContainer 
                        style={{backgroundImage:`url(${store.backgroundPhoto})`}} 

                    >
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