import * as React from 'react';
import styled, { ThemeProvider } from "styled-components"
import { theme } from '../../UI/theme';
import Box from '@mui/material/Box';

export const Logo = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                pr: 3,
                fontSize: 24,
                fontWeight: 700,
                cursor: "pointer"
            }}
        >
            Bookinglet
        </Box>
    )
}