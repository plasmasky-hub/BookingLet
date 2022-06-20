import React from "react";
import styled from "styled-components";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

const StyledSearchBar = styled(Box)`
    flex-grow: 2;
    background: #D9D9D9;
    display: block;
    border-radius: 10px;
` 
const StyledSearchIcon = styled(SearchIcon)`
    color: #848484;
    font-size: medium;
    margin: 4px 0 0 5px;
    cursor: pointer;
`

const SearchBar = () => {
    return (
        <StyledSearchBar>
            <StyledSearchIcon />
        </StyledSearchBar >
    )
};

export default SearchBar;