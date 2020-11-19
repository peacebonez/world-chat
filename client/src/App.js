import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { theme } from './themes/theme';
import LandingPage from './pages/Landing';
import Login from './pages/Login';
import Messenger from './pages/Messenger';
import { UserProvider } from './contexts/userContext';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/messenger" component={Messenger} />
        </BrowserRouter>
      </UserProvider>
    </MuiThemeProvider>
  );
}

export default App;
