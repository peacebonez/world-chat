import React, { useEffect, useReducer } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Invitation from "./components/Invitation";
import { theme } from "./themes/theme";
import { UserContext } from "./userContext";
import userReducer from "./reducers/userReducer";
import Messenger from "./components/Messenger";

function App() {
  const [user, dispatch] = useReducer(userReducer, {});
  useEffect(() => {
    //load user, check if JWT token active
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
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
