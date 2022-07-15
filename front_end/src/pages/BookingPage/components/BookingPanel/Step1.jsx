import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MenuItem } from '@mui/material';
import StyledTextField from './StyledTextField';

const Step1 = ({ FormData, setFormData, FakeData }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={FormData.date}
          onChange={(newValue) => {
            setFormData({ ...FormData, date: newValue });
          }}
          renderInput={(params) => (
            <StyledTextField {...params} variant="standard" p1="true" />
          )}
        />
      </LocalizationProvider>

      <StyledTextField
        select
        label="Number of people"
        value={FormData.people}
        onChange={(event) => {
          setFormData({ ...FormData, people: event.target.value });
        }}
        variant="standard"
        p1="true"
      >
        {FakeData.PeopleOptions.map((option) => (
          <MenuItem key={option} value={option} className="menuItem">
            {option} person
          </MenuItem>
        ))}
      </StyledTextField>

      <StyledTextField
        select
        label="Service"
        value={FormData.service}
        onChange={(event) => {
          setFormData({ ...FormData, service: event.target.value });
        }}
        variant="standard"
        p1="true"
      >
        {FakeData.ServiceOptions.map((option) => (
          <MenuItem key={option} value={option} className="menuItem">
            {option}
          </MenuItem>
        ))}
      </StyledTextField>
    </>
  );
};

export default Step1;
