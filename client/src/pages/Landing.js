import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Hidden,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../assets/background.png';
require('dotenv').config();
const useStyles = makeStyles({
  noUnderlineLink: {
    textDecoration: 'none'
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
  loginButton: {
    marginLeft: '10%'
  },
  marginBottom5: {
    marginBottom: '5%',
  },
  marginBottom20: {
    marginBottom: '20%',
  },
  errors: {
    color: 'red',
  },
  grayText: {
    color: '#9c9c9c'
  }, 
  createButton: {
    width: '60%',
    margin: 'auto'
  }
});

export default function Landing() {
  const history = useHistory();
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState('');

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLanguage, setErrorLanguage] = useState(false);
  const [errorBackend, setErrorBackend] = useState(false);
  const [backendErrorMsg, setBackendErrorMsg] = useState('');

  useEffect(() => {
    if (isName(name)) setErrorName(false);
    if (isEmail(email)) setErrorEmail(false);
    if (password.length > 5) setErrorPassword(false);
    if (primaryLanguage) setErrorLanguage(false);

    //clears backend error msg
    let timer;
    if (errorBackend) {
      timer = setTimeout(() => {
        setErrorBackend(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  });

  const isEmail = (email) => /^\S+@\S+$/.test(email);
  const isName = (name) => /^[A-Z]+$/i.test(name);
  const errors = () => {
    return (
      errorName || errorEmail || errorPassword || errorLanguage || errorBackend
    );
  };
  const handleSubmit = async () => {
    if (!isEmail(email)) setErrorEmail(true);
    if (!isName(name)) setErrorName(true);
    if (!password) setErrorPassword(true);
    if (!primaryLanguage) setErrorLanguage(true);

    if (!errors()) {
      let res = await signUpUser();
      if (res && (res.status === 200 || res.status === 201)) {
        history.push('/messenger');
      }
    }
  };

  const signUpUser = async () => {
    //POST config header values
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      let res = await axios.post(
        '/user/signup',
        {
          name,
          email,
          password,
          primaryLanguage,
        },
        config,
      );
      return res;
    } catch (err) {
      if (err.message.includes('400')) {
        setErrorBackend(true);
        setBackendErrorMsg('User already exists.');
      }

      if (err.message.includes('500')) {
        setErrorBackend(true);
        setBackendErrorMsg('Server error');
      }
    }
  };

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
          <Typography variant="subtitle1" className={classes.grayText}>Already have an account? </Typography>
          <Link to="/login" className={classes.noUnderlineLink}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              className={classes.loginButton}
            >
              Login
            </Button>
          </Link>
        </Box>

        <Typography
          variant="h4"
          fontWeight="fontWeightBold"
          className={classes.marginBottom5}
        >
          Create an Account.
        </Typography>
        <Box display="flex" flexDirection="column">
          <TextField
            label="Name"
            onChange={(event) => setName(event.target.value)}
            className={classes.marginBottom5}
            required
            error={errorName}
            helpertext={errorName && 'Name required.'}
          />
          <Typography variant="h6" className={classes.errors}>
            {errorName}
          </Typography>
          <TextField
            label="Email"
            onChange={(event) => setEmail(event.target.value)}
            className={classes.marginBottom5}
            required
            error={errorEmail}
            helpertext={errorEmail && 'Invalid email.'}
          />
          <Typography variant="h6" className={classes.errors}>
            {errorEmail}
          </Typography>
          <TextField
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className={classes.marginBottom5}
            required
            error={errorPassword}
            helpertext={
              errorPassword && 'Password must be at least 6 characters.'
            }
          />
          <Typography variant="h6" className={classes.errors}>
            {errorPassword}
          </Typography>
          <FormControl
            className={classes.marginBottom20}
            helpertext={errorLanguage && 'Please select a language.'}
          >
            <InputLabel id="language-select">Select a Language</InputLabel>
            <Select
              id="language-select"
              value={primaryLanguage}
              onChange={(event) => setPrimaryLanguage(event.target.value)}
              error={errorLanguage}
            >
              <MenuItem value={'English'}>English</MenuItem>
              <MenuItem value={'Spanish'}>Spanish</MenuItem>
              <MenuItem value={'French'}>French</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" className={classes.errors}>
            {errorLanguage}
          </Typography>
          <Button 
            className={classes.createButton}
            variant="contained" 
            size="large"
            color="primary" 
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Box>
      </Box>
      {/* Error alerts */}
      <Snackbar
        open={errorBackend}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          {backendErrorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
