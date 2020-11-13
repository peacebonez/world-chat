import React, { useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Invitation from "./components/Invitation";
import { theme } from "./themes/theme";
import { UserProvider } from "./userContext";

import Messenger from "./components/Messenger";

function App() {
  useEffect(() => {
    //load user, check if JWT token active
  }, []);
  console.log(<UserProvider></UserProvider>);
  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Route path="/" exact>
            <Messenger />
          </Route>
          <Invitation />
        </BrowserRouter>
      </UserProvider>
    </MuiThemeProvider>
  );
}

export default App;
