import styled from 'styled-components';
import React from 'react';
import LocationSortBar from './LocationSortBar';
import QuantityDateBar from './QuantityDateBar';
import SearchCategoryBar from './SearchCategoryBar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
  width: 1173px;
  height: 190px;
  margin: 90px auto;
  padding-left: 24px;
`;
const SortBar = styled.div`
  width: 1173px;
  display: flex;
  align-items: center;
  color: #ffffff;
  justify-content: space-between;
  margin-top: 20px;
  padding-right: 50px;
`;

const WrapperFilter = styled.div`
  margin-left: 5px;
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
          fontSize: '24px',
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
          {/* <FormControl variant="standard" sx={{ ml: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              value={FormData.category}
              onChange={(e) =>
                setFormData({
                  ...FormData,
                  category: e.target.value,
                })
              }
              label="Age"
            >
              {success &&
                rootCategory.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl> */}
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
                <em>None</em>
              </MenuItem>
              <MenuItem value={'NSW'}>NSW</MenuItem>
              <MenuItem value={'VIC'}>VIC</MenuItem>
              <MenuItem value={'SA'}>SA</MenuItem>
              <MenuItem value={'TAS'}>TAS</MenuItem>
              <MenuItem value={'WA'}>WA</MenuItem>
              <MenuItem value={'ACT'}>ACT</MenuItem>
              <MenuItem value={'NT'}>NT</MenuItem>
            </Select>
          </FormControl>
        </WrapperCategory>
      </WrapperFilter>

      {/* <SearchCategoryBar />
      <QuantityDateBar /> */}
      <SortBar>
        {/* <Stack>
          <Button variant="contained" type="submit" color="storelistbutton">
            SEARCH
          </Button>
        </Stack> */}
        <LocationSortBar />
      </SortBar>
    </SearchContainer>
  );
};
export default StoreFilters;
