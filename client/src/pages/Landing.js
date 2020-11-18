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
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../assets/background.png';
require('dotenv').config();
const useStyles = makeStyles({
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
  marginLeft10: {
    marginLeft: '10%',
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
});

export default function Landing() {
  let history = useHistory();
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState('');

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLanguage, setErrorLanguage] = useState(false);
  const [backendError, setBackendError] = useState(true);
  const [backendErrorMsg, setBackendErrorMsg] = useState('');

  useEffect(() => {
    if (name) setErrorName(false);
    if (email) setErrorEmail(false);
    if (password) setErrorPassword(false);
    if (primaryLanguage) setErrorLanguage(false);

    let timer;
    if (backendError) {
      timer = setTimeout(() => {
        setBackendError(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  });

  // Npm email-validator is acting up; if anyone has a better email validation function
  // feel free to replace the function below
  const isEmail = (email) => /^\S+@\S+$/.test(email);
  const isName = (name) => /^[A-Z]+$/i.test(name);

  const handleSubmit = async () => {
    if (
      isEmail(email) &&
      password.length >= 6 &&
      primaryLanguage &&
      isName(name)
    ) {
      let res = await signUpUser();
      if (res && (res.status === 200 || res.status === 201)) {
        history.push('/messenger');
      }
    } else {
      if (!isEmail(email)) setErrorEmail(true);
      if (!isName(name)) setErrorName(true);
      if (!password) setErrorPassword(true);
      if (!primaryLanguage) setErrorLanguage(true);
      //TODOS add error snackbar
      // setBackendError(true);
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
      console.log('res:', res);
      return res;
    } catch (err) {
      //TODOS add error snackbar
      setBackendError(true);
      console.error(err);
    }
  };

  return (
    <Box display="flex">
      {/** The left side: Image saying "Converse with anyone with any language" */}
      <Box>
        <img
          src={Background}
          className={classes.image}
          alt="People talking and texting, with purpose of the web app."
        />
      </Box>

      {/** The right side, the sign up */}
      <Box className={classes.outerMargins}>
        <Box display="flex" className={classes.marginBottom50}>
          <Typography variant="h5">Already have an account? </Typography>
          <Link to="/login">
            <Button
              variant="outlined"
              color="primary"
              className={classes.marginLeft10}
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
            helperText={errorName && 'Name required.'}
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
            helperText={errorEmail && 'Invalid email.'}
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
            helperText={
              errorPassword && 'Password must be at least 6 characters.'
            }
          />
          <Typography variant="h6" className={classes.errors}>
            {errorPassword}
          </Typography>
          <FormControl
            className={classes.marginBottom20}
            helperText={errorLanguage && 'Please select a language.'}
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={backendError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          Please check credentials
        </Alert>
      </Snackbar>
    </Box>
  );
}
