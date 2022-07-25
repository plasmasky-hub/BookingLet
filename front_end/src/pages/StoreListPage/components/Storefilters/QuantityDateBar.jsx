import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const Wrapper = styled.div`
  margin-top: 7px;
  display:flex;
  align-items:center;
  `
const people = [
    {
      value: '1',
      label: '1 Person',
    },
    {
      value: '2',
      label: '2 People',
    },
    {
      value: '3',
      label: '3 People',
    },
    {
      value: '4',
      label: '4 People',
    },
    {
      value: '5',
      label: '5 People',
    },
  ];


export default function SelectVariants() {
  const [person, setPerson] = React.useState('');

  const handleChange = (event) => {
    setPerson(event.target.value);
  };
  const [value, setValue] = React.useState(null);



  return (
    <Wrapper>
      <PeopleAltIcon color="action"  sx={{ fontSize: 25 }}/>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '15rem' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <div>
        <TextField
          id="filled-select-currency"
          select
          label="Quantity of people"
          value={person}
          onChange={handleChange}
        
          variant="filled"
        >
          {people.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      
    </Box>
    <CalendarTodayIcon color="action"  sx={{ fontSize: 25, marginRight: '5px'}}/>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        variant="filled"
      />
    </LocalizationProvider>
    </Wrapper>
  );
}
