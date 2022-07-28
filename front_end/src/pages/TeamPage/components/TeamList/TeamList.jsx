
import styled from 'styled-components';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MemberCard from './MemberCard'
import DevelopsCard from './DevelopsCard'
import DevopsCard from './DevopsCard';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const BoxList = styled(Box)`
    margin-top: 100px;
    justify-content: center;
    align-items:center;
`
const BoxTitle = styled(Box)`
    display:flex;
    justify-content:center;
    align-items:center;
    margin: 0 auto;
`
export default function TeamList() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BoxList sx={{ width: '100%' }}>
      <BoxTitle sx={{ borderBottom: 1.5, borderColor: '#a4a4a4',width: '60%' }}>
        <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="basic tabs example" 
        textColor="secondary" 
        indicatorColor="secondary"
        variant="fullWidth"
        sx={{ width: '100%' }}
    >

          <Tab sx={{ fontSize:18 }} label="Developers" {...a11yProps(0)} />
          <Tab sx={{ fontSize:18 }} label="DevOps" {...a11yProps(1)} />
          <Tab sx={{ fontSize:18 }} label="Tutors" {...a11yProps(2)} />
        </Tabs>
      </BoxTitle>
      <TabPanel value={value} index={0} >
        <DevelopsCard/>
      </TabPanel>
      <TabPanel value={value} index={1} >  
        <DevopsCard/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MemberCard/>
      </TabPanel>
    </BoxList>
  );
}
