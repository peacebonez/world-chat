import React, { useState, useEffect, useContext } from 'react';
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
import { UserContext } from '../contexts/userContext';

require('dotenv').config();

const useStyles = makeStyles({
  noUnderlineLink: {
    textDecoration: 'none',
  },
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
  grayText: {
    color: '#9c9c9c',
  },
  marginBottom5: {
    marginBottom: '5%',
  },
  createAccountButton: {
    marginLeft: '15%',
    outline: 'none',
  },
  loginButton: {
    marginTop: '15%',
    width: '60%',
    margin: 'auto',
  },
});

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { userActions, userState } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const handleClick = () => {
    if (!email) return setErrorEmail(true);
    if (!password) return setErrorPassword(true);
    userActions.login(email, password);
  };

  const isEmail = (email) => /^\S+@\S+$/.test(email);

  //deactivates errors when user inputs into form
  useEffect(() => {
    if (isEmail(email)) setErrorEmail(false);
    if (password.length > 5) setErrorPassword(false);
  }, [email, password.length, userState.user]);

  console.log('userState:', userState);

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
          <Typography variant="subtitle1" className={classes.grayText}>
            Don't have an account?{' '}
          </Typography>
          <Link to="/signup" className={classes.noUnderlineLink}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              className={classes.createAccountButton}
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
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleClick}
            className={classes.loginButton}
          >
            Login
          </Button>
        </Box>
      </Box>
      {/* Error alerts */}
      <Snackbar
        open={userState.user.errorMsg}
        autoHideDuration={2000}
        onClose={userState.user.errorMsg === ''}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          {userState.user.errorMsg ? userState.user.errorMsg : ''}
        </Alert>
      </Snackbar>
    </Box>
  );
}
