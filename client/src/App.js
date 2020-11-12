import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Invitation from "./components/Invitation";
import { theme } from "./themes/theme";
import Messenger from "./components/Messenger";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/">
          <Messenger />
        </Route>
        <Invitation />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
