import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Hidden,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import Background from '../assets/background.png';

require('dotenv').config();

const useStyles = makeStyles({
  inline: {
    inline: 'true',
  },
  outerMargins: {
    marginTop: '2%',
    paddingLeft: '10%',
  },
  image: {
    height: '100vh',
  },
  marginBottom50: {
    marginBottom: '50%',
  },
  marginLeft15: {
    marginLeft: '15%',
  },
  marginBottom5: {
    marginBottom: '5%',
  },
});

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [backendErrorMsg, setBackendErrorMsg] = useState('');

  const handleClick = () => {
    if (!email) return setErrorEmail(true);
    if (!password) return setErrorPassword(true);
    login();
  };

  const login = async () => {
    try {
      const res = await axios.post('/user/login', { email, password });
      if (res && (res.status === 200 || res.status === 201)) {
        history.push('/messenger');
      }

      return res;
    } catch (err) {
      setBackendError(true);
      if (err.message.includes('400'))
        setBackendErrorMsg('Invalid credentials');
      if (err.message.includes('404')) setBackendErrorMsg('User not found');
      if (err.message.includes('500')) setBackendErrorMsg('Server Error');
    }
  };
  //deactivates errors when user inputs into form
  useEffect(() => {
    if (email) setErrorEmail(false);
    if (password) setErrorPassword(false);

    //clears the backend error alert msg
    let timer;
    if (backendError) {
      timer = setTimeout(() => {
        setBackendError(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  });

  return (
    <Box display="flex">
      {/** The left side: Image saying "Converse with anyone with any language" */}
      <Hidden smDown>
        <Box>
          <img
            src={Background}
            className={classes.image}
            alt="People talking and texting, with purpose of the web app."
          />
        </Box>
      </Hidden>

      {/** The right side, the sign up */}
      <Box className={classes.outerMargins}>
        <Box display="flex" className={classes.marginBottom50}>
          <Typography variant="h5">Don't have an account? </Typography>
          <Link to="/">
            <Button
              variant="outlined"
              color="primary"
              className={classes.marginLeft15}
            >
              Create account
            </Button>
          </Link>
        </Box>

        <Typography
          variant="h4"
          fontWeight="fontWeightBold"
          className={classes.marginBottom5}
        >
          Welcome back!
        </Typography>
        <Box display="flex" flexDirection="column">
          <TextField
            label="Email"
            onChange={(event) => setEmail(event.target.value)}
            className={classes.marginBottom5}
            required
            error={errorEmail}
            helperText={errorEmail && 'Invalid email.'}
          />
          <TextField
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className={classes.marginBottom5}
            required
            error={errorPassword}
            helperText={
              errorPassword && 'Password must be at least 6 characters.'
            }
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Login
          </Button>
        </Box>
      </Box>
      {/* Error alerts */}
      <Snackbar
        open={backendError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          {backendErrorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
