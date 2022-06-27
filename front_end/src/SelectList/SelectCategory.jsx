import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCategory() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-category">Category</InputLabel>
            <Select
              labelId="demo-select-category"
              id="demo-select-category"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Dining</MenuItem>
              <MenuItem value={2}>Life</MenuItem>
              <MenuItem value={1}>Education</MenuItem>
            </Select>
        </FormControl>
    </div>
  );
}