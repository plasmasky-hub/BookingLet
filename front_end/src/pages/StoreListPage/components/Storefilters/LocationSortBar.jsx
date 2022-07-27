import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListIcon from '@mui/icons-material/List';
import MenuItem from '@mui/material/MenuItem';
  
const Wrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  
 
`
const Iconset = styled.div`
  display:flex;
  align-items:center;
`
export default function ToggleButtons() {
 
  const [sort,setSort] =  React.useState(() => ['Default']);


 
  const handleSort = (event, newSort) => {
    setSort(newSort);
  };
  return (
    <Wrapper>
    

    <Box>
    <Iconset>
    <ListIcon color="action"  sx={{ fontSize: 25, marginRight:'5px'}} />
    <ToggleButtonGroup
      value={sort}
      exclusive
      onChange={handleSort}
      size="small"
    >
      
      
      <ToggleButton value="Default">Default
      </ToggleButton>
      <ToggleButton value="Popularity">Popularity
      </ToggleButton>
      <ToggleButton value="Distance">Distance
      </ToggleButton>

    </ToggleButtonGroup>
    </Iconset>
    </Box>
    
    </Wrapper>
  );
}
