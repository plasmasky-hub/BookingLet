import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Wrapper = styled.div`
  width: 1173px;
  display: flex;
  align-items: center;
  color: #d76d6d;
`;
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

export default function SearchBar() {
  const [category, setCategory] = React.useState('All');
  const [person, setPerson] = React.useState('');
  const handleChangePerson = (event) => {
    setPerson(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  return (
    <Wrapper>
      <PeopleAltIcon color="action" sx={{ fontSize: 25 }} />
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
            id="filled-person-quantity"
            select
            label="Quantity of people"
            value={person}
            onChange={handleChangePerson}
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

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '10rem' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="filled-category"
            select
            label="Category"
            value={category}
            onChange={handleChangeCategory}
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
    </Wrapper>
  );
}
