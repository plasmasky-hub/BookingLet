import styled from 'styled-components';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const StoreInfoBarWrapper =styled.div`
    display:flex;
    justify-content:space-between;
    color:#FFFFFF;
    position: relative;
`
const VerticalDivider = styled.div`
    width:2px;
    margin:0 1rem;
    background-color:#FFFFFF;

`
const NameAndCateory = styled.div`
    display:flex;
    font-family: 'Helvetica';
    font-style: normal;
    color: #FFFFFF;
`

const StoreName =styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    
`

const StoreCategory = styled.div`
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    text-align:center;
`
const StoreInfoBar = () => (
    <StoreInfoBarWrapper>
        <div>
    <NameAndCateory>
       <StoreName> name </StoreName>
        <VerticalDivider />
       <StoreCategory>category </StoreCategory>
    </NameAndCateory>
    <div>Address</div>
    </div>
    <FormControlLabel control={<Switch defaultChecked color="buttonOrange" />} label="current status" />
    </StoreInfoBarWrapper>
);
 
export default StoreInfoBar;