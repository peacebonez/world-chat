import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { theme } from './themes/theme';
import Register from './pages/Register';
import Login from './pages/Login';
import Messenger from './pages/Messenger';
import { UserProvider } from './contexts/userContext';
document.body.style.overflow = 'hidden';
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProvider>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/messenger" component={Messenger} />
        </UserProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
