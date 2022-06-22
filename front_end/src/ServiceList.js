import * as React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const ListTitle = styled.h3`
    color: #397CC2;
    font-family: Helvetica, sans-serif;
    font-size: 1.3rem;
    text-align: center;
    padding-top: 80px;
  `;

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 285, height: '100vh' ,background: '#D9D9D9', boxShadow: '-10px 0px 3px 0px rgba(0, 0, 0, 0.2)' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <ListTitle>Service List</ListTitle>
      <List>
        <Divider />
        {['Facial', 'Foot Massage', 'Relaxing Massage', 'Remedial Massage'].map((text, index) => (
          <ListItem key={text} disablePadding divider={true}>
            <ListItemButton>
              <ListItemText primary={text} sx={{pl: 4}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List component="nav">
          <ListItem disablePadding divider={true}>
            <ListItemButton>
                <AddIcon sx={{pr: 1, color: '#999999'}}/>
              <ListItemText primary='Add New Services' disablePadding sx={{color: '#999999'}}/>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}