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
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-name">Service</InputLabel>
            <Select
              labelId="demo-select-name"
              id="demo-select-name"
              value={service}
              label="Service"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Foot Massage</MenuItem>
            </Select>
        </FormControl>
    </div>
  );
}