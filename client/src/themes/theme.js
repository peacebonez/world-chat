import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
  },
  palette: {
    primary: { main: '#3C8FFF', gray: '#F5F7FB', blue: '#4097E8' },
    secondary: { main: '#E9EEF9', green: '#4DED84' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 767,
      lg: 1280,
      xl: 1920,
    },
  },
});
