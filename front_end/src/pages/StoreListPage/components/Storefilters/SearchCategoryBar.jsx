import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


const Wrapper = styled.div`
  width: 1173px;
  display:flex;
  align-items:center;
  color: #d76d6d;
  `
const categories = [
  {
    value: 'dining',
    label: 'Dining',
  },
  {
    value: 'entertainment',
    label: 'Entertainment',
  },
  {
    value: 'healthbeauty',
    label: 'Health&Beauty',
  },
  {
    value: 'lifeservice',
    label: 'LifeService',
  },
  {
    value: 'sports',
    label: 'Sports',
  },
];

export default function SearchBar() {
  const [category, setCategory] = React.useState('All');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <Wrapper>
      <SearchIcon color="action"  sx={{ fontSize: 25 }}/>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25rem',},
      }}
      noValidate
      autoComplete="off"
      
    >
      <TextField id="filled-basic" label="Keyword, services..." variant="filled" />
    </Box>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '10rem', },
      }}
      noValidate
      autoComplete="off"
    >
      
      <div>
        <TextField
          id="filled-select-currency"
          select
          label="Category"
          value={category}
          onChange={handleChange}
        
          variant="filled"
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      
    </Box>
    <Button variant="search" color=" #d76d6d">SEARCH</Button>
    </Wrapper>
  );
}