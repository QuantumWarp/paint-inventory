import { createTheme } from "@mui/material";

const lightTheme = {
  palette: {
    background: {
      default: '#f0f0f0',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        scrollbarColor: '#555 #f1f1f1',
        '&::-webkit-scrollbar': { width: '4px', height: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#555',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#333',
        },
      },
    },
  },
};

const darkTheme = {
  palette: {
    background: {
      default: '#1b1b1b',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        scrollbarColor: '#888 #333',
        '&::-webkit-scrollbar': { width: '4px', height: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      },
    },
  },
};

export const theme = createTheme({
  colorSchemes: {
    light: lightTheme,
    dark: darkTheme,
  }
});
