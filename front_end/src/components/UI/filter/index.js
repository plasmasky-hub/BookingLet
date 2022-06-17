import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./filter.css";

export default function SelectVariants() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className='wrapper_filter'>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 150, marginTop:5 }}>
        <InputLabel id="demo-simple-select-standard-label">Calendar</InputLabel>
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
          <MenuItem value={10}>3 June 2022</MenuItem>
          <MenuItem value={20}>4 June 2022</MenuItem>
          <MenuItem value={30}>5 June 2022</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 150, marginTop:5 }}>
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
      <FormControl variant="standard" sx={{ m: 1, minWidth: 150, marginTop:5 }}>
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
    </div>
  );
}