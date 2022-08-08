import styled from 'styled-components';
import React from 'react';
import LocationSortBar from './LocationSortBar';
import Select from '@mui/material/Select';
import { Typography, Box, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import DatePicker from '@mui/lab/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const SearchButton = styled(Button)({
  width: 120,
  height: 35,
  borderStyle: 'none',
  cursor: 'pointer',
  '&.MuiButton-root': {
    backgroundColor: '#D08888',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
  },
});

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

const StoreFilters = ({ setQuery, stores, queryStr }) => {
  const [FormData, setFormData] = useState({
    date: new Date(),
    state: '',
  });
  const date = `${FormData.date.getFullYear()}-${
    FormData.date.getMonth() + 1 < 10
      ? `0${FormData.date.getMonth() + 1}`
      : FormData.date.getMonth() + 1
  }-${
    FormData.date.getDate() < 10
      ? `0${FormData.date.getDate()}`
      : FormData.date.getDate()
  }`;

  const state = FormData.state;

  const searchQuery = `?${state ? `&state=${state}` : ''}${
    date ? `&date=${date}` : null
  }`;
  const query = `${searchQuery}${queryStr ? `&${queryStr}` : ''}`;

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
        {stores.length} results found
      </Typography>
      <WrapperFilter>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
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
          <SearchButton
            variant="contained"
            disableRipple
            sx={{
              mt: 3,
            }}
            onClick={() => {
              setQuery(query);
              window.history.pushState(null, '', `/StoreListPage${query}`);
            }}
          >
            SEARCH
          </SearchButton>
        </div>

        <LocationSortBar />
      </WrapperFilter>
    </SearchContainer>
  );
};
export default StoreFilters;
