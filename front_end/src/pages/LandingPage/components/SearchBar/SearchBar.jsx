import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

const SearchPaper = styled(Paper)({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: 476,
  marginTop: 15,
  marginLeft: 0.31,
  opacity: 0.6,
});

export default function CustomizedInputBase() {
  return (
    <SearchPaper component="form">
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Name, service ..."
        inputProps={{ 'aria-label': 'Name, service ...' }}
      />
    </SearchPaper>
  );
}
