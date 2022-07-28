import styled from 'styled-components';
import React from 'react';
import LocationSortBar from './LocationSortBar';
import Select from '@mui/material/Select';
import { Typography, Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DatePicker from '@mui/lab/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const SearchContainer = styled(Box)`
  width: 1130px;
  height: 120px;
  margin: 20px auto;
`;

const WrapperFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const WrapperCategory = styled.div``;

const LocalizationProviderNew = styled(LocalizationProvider)`
  padding-top: 110px;
`;

// const FakeData = {
//     PeopleOptions: [1, 2, 3, 4, 5, 6, 7, 8],

//   };

// const Forms = [LocationSortBar, QuantityDateBar, SearchCategoryBar,];

const StoreFilters = () => {
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

  const [FormData, setFormData] = useState({
    date: new Date(),
    category: '',
    state: '',
    search: '',
    isSearch: false,
    q: '',
  });

  const searchSubmit = (data) => {
    console.log(data);
  };
  return (
    <SearchContainer component="form" onSubmit={searchSubmit}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '22px',
          lineHeight: '28px',
          color: 'white',
        }}
      >
        All restaurant in QLD with 109 results
      </Typography>
      <WrapperFilter>
        <WrapperCategory>
          <LocalizationProviderNew dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={FormData.date}
              onChange={(newValue) => {
                setFormData({ ...FormData, date: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" p1="true" />
              )}
            />
          </LocalizationProviderNew>
          <FormControl variant="standard" sx={{ ml: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-standard-label">
              State
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={FormData.state}
              onChange={(e) =>
                setFormData({
                  ...FormData,
                  state: e.target.value,
                })
              }
              label="Age"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={'NSW'}>NSW</MenuItem>
              <MenuItem value={'VIC'}>VIC</MenuItem>
              <MenuItem value={'QLD'}>QLD</MenuItem>
              <MenuItem value={'SA'}>SA</MenuItem>
              <MenuItem value={'TAS'}>TAS</MenuItem>
              <MenuItem value={'WA'}>WA</MenuItem>
              <MenuItem value={'ACT'}>ACT</MenuItem>
              <MenuItem value={'NT'}>NT</MenuItem>
            </Select>
          </FormControl>
        </WrapperCategory>
        <LocationSortBar />
      </WrapperFilter>
    </SearchContainer>
  );
};
export default StoreFilters;
