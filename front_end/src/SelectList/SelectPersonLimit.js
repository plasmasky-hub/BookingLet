import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectPersonLimit() {
    const [personLimit, setPersonLimit] = React.useState('');

    const handleChange = (event) => {
        setPersonLimit(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-personLimit">Person</InputLabel>
                <Select
                    labelId="demo-select-personLimit"
                    id="demo-select-personLimit"
                    value={personLimit}
                    label="personLimit"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}