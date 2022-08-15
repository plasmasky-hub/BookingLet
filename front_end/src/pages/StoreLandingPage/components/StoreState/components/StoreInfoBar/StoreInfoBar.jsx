import styled from 'styled-components';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useGetStoreQuery } from '../../../../../../store/api/storeApi';


const StoreInfoBarWrapper =styled.div`
    display:flex;
    justify-content:space-between;
    color:#FFFFFF;
    position: relative;
    font-size:14px;
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
    margin-bottom:10px;
`

const StoreName =styled.div`
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
`

const StoreCategory = styled.div`
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    text-align:center;
    padding-top:10px;
`

const StoreInfoBar = ({storeId}) =>{
    console.log(storeId);
    const storeData = useGetStoreQuery(storeId);

    const {
      data: store,
      isLoading,
      isSuccess,
      isError,
      error,
    } = storeData;
    const makeCategoryName = (rootCategories) => {
        // return categoryIds[0].name;
        return rootCategories.map((c) => c.name).join('/')
    };
    
    const makeAddress = (addresses) => {
        return addresses;
    };
return (
    <StoreInfoBarWrapper>
        {isError && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {isSuccess && (
            <div>
                <NameAndCateory>
                <StoreName> {store.name} </StoreName>
                <VerticalDivider />
                <StoreCategory> {makeCategoryName(store.rootCategories)}</StoreCategory>
                </NameAndCateory>
                    <i>{makeAddress(store.location.street)},{makeAddress(store.location.suburb)},{makeAddress(store.location.city)},{makeAddress(store.location.state)},{makeAddress(store.location.postcode)}</i>
            </div>
        )}
        
    </StoreInfoBarWrapper>
)};
 
export default StoreInfoBar;