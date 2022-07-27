import styled from 'styled-components';
import React from 'react';
import LocationSortBar from './LocationSortBar'
import QuantityDateBar from './QuantityDateBar'
import SearchCategoryBar from './SearchCategoryBar'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

const SearchContainer = styled(Box)`
    width:1173px;
    height:190px;
    margin: 90px auto;
    padding-left:24px;
`
const SortBar = styled.div`
  width: 1173px;
  display:flex;
  align-items:center;
  color: #ffffff;
  justify-content:space-between;
  margin-top: 20px;
  padding-right: 50px;
`

// const FakeData = {
//     PeopleOptions: [1, 2, 3, 4, 5, 6, 7, 8],
    
//   };
  
// const Forms = [LocationSortBar, QuantityDateBar, SearchCategoryBar,];

const StoreFilters = () =>{
    // const [step, setStep] = useState(0);

    // const Display = Forms[step];
    // const [FormData, setFormData] = useState({
    //     date: new Date(),
    //     category: '',
    //     person: 1,
    //     state: 'all',
    //     sortMethod: 'favoriteUserSize',
    //     query: '',
    //   });
    const searchSubmit = (data) =>{
       console.log(data);
    }
    return(
        <SearchContainer component='form' onSubmit={searchSubmit}>
        <h2>All restaurant in QLD with 109 results</h2>
        
        <SearchCategoryBar />
        <QuantityDateBar />
        <SortBar>
          <Stack>
          <Button variant="contained" type='submit' color='storelistbutton'>SEARCH</Button>
          </Stack>
        <LocationSortBar />
        </SortBar>
        </SearchContainer>
    )
}
export default StoreFilters;