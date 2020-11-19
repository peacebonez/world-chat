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
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../assets/background.png';
require('dotenv').config();
// const baseURL = process.env.REACT_APP_baseURL;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  alreadyHaveAccount: {
    color: '#9c9c9c'
  }
});

export default function Landing() {
  let history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState('');

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLanguage, setErrorLanguage] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [backendErrorMsg, setBackendErrorMsg] = useState('');

  useEffect(() => {
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
  const handleErrorTimouts = () => {
    if (!name) {
      setErrorName(true);
      let timer = setTimeout(() => {
        setErrorName(false);
      }, 1000);
    }

    if (!isEmail(email)) {
      setErrorEmail(true);
      let timer = setTimeout(() => {
        setErrorEmail(false);
      }, 1000);
    }
    if (password.length < 6) {
      setErrorPassword(true);
      let timer = setTimeout(() => {
        setErrorPassword(false);
      }, 1000);
    }

    if (!primaryLanguage) {
      setErrorLanguage(true);
      let timer = setTimeout(() => {
        setErrorLanguage(false);
      }, 1000);
    }
  };

  const handleSubmit = async () => {
    handleErrorTimouts();

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
      //TODOS add error snackbar
      setBackendError(true);
    }
  };

  //POST config header values
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const signUpUser = async () => {
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
      //TODOS add error snackbar
      // setBackendError(true);
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
          <Typography variant="subtitle1" className={classes.alreadyHaveAccount}>Already have an account? </Typography>
          <Link to="/login" className={classes.noUnderlineLink}>
            <Button
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
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Please check credentials</Alert>
      </Snackbar>
    </Box>
  );
}
