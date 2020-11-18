import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { theme } from './themes/theme';

// import { UserProvider } from './userContext';

import LandingPage from './pages/Landing';
import Login from './pages/Login';
import Messenger from './pages/Messenger';

//creates a context
export const UserContext = createContext({});

function App() {
  // const testUserId = '5fadeb4e66d8372cd6d05d89';
  // const [user, setUser] = useState({});
  // useEffect(async () => {
  //   //load user, check if JWT token active
  //   //test load user function
  //   (async function fetchUser() {
  //     const res = await axios.get(`/user/get_by_id/${testUserId}`);
  //     const testUser = res.data;
  //     setUser(testUser);
  //   })();
  // }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/messenger" component={Messenger} />
        </BrowserRouter>
      </UserContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
