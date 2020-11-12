import React, { useEffect, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Invitation from "./components/Invitation";
import { theme } from "./themes/theme";
import { UserContext } from "./userContext";
import Messenger from "./components/Messenger";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    //load user, check if JWT token active
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Route path="/" exact>
            <Messenger />
          </Route>
          <Invitation />
        </BrowserRouter>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
