import styled from 'styled-components';
import OrderStatus from './components/OrderStatus/OrderStatus';
import StoreInfoBar from './components/StoreInfoBar/StoreInfoBar';

const StoreInfoWrapper = styled.div`
    width:100%;
    background-color: #FBFBFB;
    display:flex;
    justify-content: center;
    align-items:center;
`
const StoreInfoContainer = styled.div`
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
    margin:0 auto;
    padding: 30px;
    align-items:center;
    justify-content:center;
    background-color:blue;
    border-radius: 10px;
    border-radius:32px;
    box-shadow: 0 0 16px rgb(0 0 0 / 50%);
    .hr{
        border-top: 0.8px solid #a4a4a4;
    }

`


const StoreState = () =>(
        <StoreInfoWrapper>
            <StoreInfoContainer>
            <h2>Opened Stores</h2>
            <StoreContainer>
                <StoreInfoBar />
                <hr />
                <OrderStatus />
            </StoreContainer>
            <h2>Closed Stores</h2>
            </StoreInfoContainer>
        </StoreInfoWrapper>
);

export default StoreState;