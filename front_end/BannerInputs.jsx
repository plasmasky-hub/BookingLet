import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import { LocalizationProvider } from '@mui/lab';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { useGetStoresQuery } from '../../../../store/api/storeApi';

const WrapperFilter = styled.div`
  margin-left: -5px;
`;

const BanerInputs = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [FormData, setFormData] = useState({
    date: new Date(),
    category: '',
    state: '',
    search: '',
  });

  const date = `${FormData.date.getFullYear()}-${
    FormData.date.getMonth() + 1 < 10
      ? `0${FormData.date.getMonth() + 1}`
      : FormData.date.getMonth() + 1
  }-${FormData.date.getDate()}`;

  const { data, isSuccess } = useGetStoresQuery(
    `category=${category}&state=${state}&date=${date}&query=${query}`
  );

  return (
    <WrapperFilter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
      </LocalizationProvider>

      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 150, marginTop: 5 }}
      >
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Dining</MenuItem>
          <MenuItem value={20}>Entertainment</MenuItem>
          <MenuItem value={30}>Health&Beauty</MenuItem>
          <MenuItem value={40}>Life Service</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 150, marginTop: 5 }}
      >
        <InputLabel id="demo-simple-select-standard-label">state</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>NSW</MenuItem>
          <MenuItem value={20}>VIC</MenuItem>
          <MenuItem value={30}>SA</MenuItem>
          <MenuItem value={40}>TAS</MenuItem>
          <MenuItem value={50}>WA</MenuItem>
        </Select>
      </FormControl>
    </WrapperFilter>
  );
};

export default BanerInputs;
