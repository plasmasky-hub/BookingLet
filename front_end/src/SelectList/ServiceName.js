import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectName() {
  const [service, setService] = React.useState('');

  const handleChange = (event) => {
    setService(event.target.value);
  };

  return (
    <div>
        <FormControl sx={{ m: 1, minWidth: 145 }} size="small">
            <InputLabel id="demo-select-name">Service</InputLabel>
            <Select
              labelId="demo-select-category"
              id="demo-select-category"
              value={service}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Foot Massage</MenuItem>
              </Select>
        </FormControl>
    </div>
  );
}