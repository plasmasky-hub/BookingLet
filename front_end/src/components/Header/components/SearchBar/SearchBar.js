import React from "react";
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <div className="SearchBar">
            <div className="SearchBarIcon">
                <SearchIcon />
            </div>
        </div>
    )
}

export default SearchBar;