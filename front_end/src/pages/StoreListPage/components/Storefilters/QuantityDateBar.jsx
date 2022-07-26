import * as React from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Wrapper = styled.div`
  margin-top: 7px;
  display:flex;
  align-items:center;
  margin-rightL 50px;
  `
const Iconset = styled.div`
    display:flex;
    align-items:center;
  `


export default function SelectVariants() {
  const [state, setState] = React.useState('');
  const [value, setValue] = React.useState(null);

  const handleState = (event, newState) => {
    setState(newState);
  };




  return (
    <Wrapper>
      
    <CalendarTodayIcon color="action"  sx={{ fontSize: 25, marginRight: '5px'}}/>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Choose time"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        variant="filled"
      />
    </LocalizationProvider>

    <Box >
    <Iconset>
    <LocationOnIcon color="action"  sx={{ fontSize: 25, marginLeft:'15px'}} />

    <ToggleButtonGroup
      value={state}
      exclusive
      onChange={handleState}
      variant="text" 
      
    >
      <ToggleButton value="ALL">ALL
      </ToggleButton>
      <ToggleButton value="NSW">NSW
      </ToggleButton>
      <ToggleButton value="VIC">VIC
      </ToggleButton>
      <ToggleButton value="QLD">QLD
      </ToggleButton>
      <ToggleButton value="SA" >SA
      </ToggleButton>
      <ToggleButton value="WA"  >WA
      </ToggleButton>
      <ToggleButton value="TAS" >TAS
      </ToggleButton>
      <ToggleButton value="NT"  >NT
      </ToggleButton>
      <ToggleButton value="ACT"  >ACT
      </ToggleButton>
    </ToggleButtonGroup>
    </Iconset>
    </Box>
    </Wrapper>
  );
}
