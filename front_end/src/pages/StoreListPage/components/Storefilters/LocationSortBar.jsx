import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListIcon from '@mui/icons-material/List';
  
const Wrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  
  margin-top: 20px;
`
const Iconset = styled.div`
  display:flex;
  align-items:center;
`
export default function ToggleButtons() {
  const [state, setState] = React.useState('');
  const [sort,setSort] =  React.useState(() => ['Default']);


  const handleState = (event, newState) => {
    setState(newState);
  };

  const handleSort = (event, newSort) => {
    setSort(newSort);
  };
  return (
    <Wrapper>
    <Box >
    <Iconset>
    <LocationOnIcon color="action"  sx={{ fontSize: 25, marginRight:'5px'}} />

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
