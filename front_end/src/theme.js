import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#ececea',
    },
    secondary: {
      main: '#7f96af',
    },
    background: {
      default: '#ececea',
    },
    storelistbutton: {
      main: '#7b8b6f',
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
