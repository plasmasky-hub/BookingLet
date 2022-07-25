import styled from 'styled-components';
import React, { useState } from 'react';
import LocationSortBar from './LocationSortBar'
import QuantityDateBar from './QuantityDateBar'
import SearchCategoryBar from './SearchCategoryBar'
const SearchContainer = styled.div`
    width:1173px;
    height:190px;
    margin: 90px auto;
    padding-left:24px;
`

const FakeData = {
    PeopleOptions: [1, 2, 3, 4, 5, 6, 7, 8],
    
  };
  
const Forms = [LocationSortBar, QuantityDateBar, SearchCategoryBar,];

const StoreFilters = () =>{
    const [step, setStep] = useState(0);

    const Display = Forms[step];
    const [FormData, setFormData] = useState({
        date: new Date(),
        category: '',
        person: 1,
        state: 'all',
        sortMethod: 'favoriteUserSize',
        query: '',
      });
    return(
        <SearchContainer>
        <h2>All restaurant in QLD with 109 results</h2>
        <SearchCategoryBar />
        <QuantityDateBar />
        <LocationSortBar />
        </SearchContainer>
    )
}
export default StoreFilters;