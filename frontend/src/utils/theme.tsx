import { createTheme, colors } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#22333b",
      "100": "#f0f4f8",
    },
    secondary: {
      main: '#7392B7',
    },
  },
  typography: {
    fontWeightLight: 'lighter',

  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px', // Custom height for Toolbar
          '@media (min-width:600px)': {
            minHeight: '80px', // Custom height for larger screens
          },
          backgroundColor: colors.blue[500], // Custom background color
        },
      },
    },
  },
});

export default theme;
