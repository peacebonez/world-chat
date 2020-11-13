import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*, *::before, *::after": {
          boxSizing: "border-box",
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
    primary: { main: "#3C8FFF", gray: "#F5F7FB" },
  },
});
