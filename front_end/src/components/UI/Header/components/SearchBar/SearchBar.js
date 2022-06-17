import React from "react";
import { theme } from "../../../theme";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <Box
            sx={{
                flexGrow: 2, display: { xs: 'none', sm: 'block' },
                background: theme.palette.background.paper,
                p: 0.1,
                borderRadius: 2
            }}
        >
            <SearchIcon sx={{
                color: theme.palette.select.main,
                fontSize: 'medium',
                mt: 0.6,
                ml: 2,
                cursor: "pointer"
            }} />
        </Box >
    )
};

export default SearchBar;