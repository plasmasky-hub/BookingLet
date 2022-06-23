import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectDuration() {
    const [duration, setDuration] = React.useState('');

    const handleChange = (event) => {
        setDuration(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-duration">Duration</InputLabel>
                <Select
                    labelId="demo-select-duration"
                    id="demo-select-duration"
                    value={duration}
                    label="duration"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>30min</MenuItem>
                    <MenuItem value={2}>45min</MenuItem>
                    <MenuItem value={3}>60min</MenuItem>
                    <MenuItem value={4}>90min</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}