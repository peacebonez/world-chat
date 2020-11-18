import React, { useState } from 'react';
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

  const [open, setOpen] = useState(false);

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState('');
  const [errorLanguage, setErrorLanguage] = useState('');

  // Npm email-validator is acting up; if anyone has a better email validation function
  // feel free to replace the function below
  const isEmail = (email) => /^\S+@\S+$/.test(email);

  const handleSubmit = async () => {
    if (!name) setErrorName(true);
    if (password.length < 6) setErrorPassword(true);
    if (!isEmail(email)) setErrorEmail(true);
    if (!primaryLanguage) setErrorLanguage(true);

    if (isEmail(email) && password.length >= 6 && primaryLanguage && name) {
      // one or both or all four may happen, hence the if statement structure. Also disable errors once criteria is met.

      setErrorName('');
      setErrorPassword('');
      setErrorEmail('');
      setErrorLanguage('');

      let res = await signUpUser();
      if (res && (res.status === 200 || res.status === 201)) {
        history.push('/messenger');
      }
    } else {
      console.log('BAD STATUS');
      return <Alert />;
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
      alert('FAIL');
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
          <FormControl className={classes.marginBottom20}>
            <InputLabel id="language-select">Select a Language</InputLabel>
            <Select
              id="language-select"
              value={primaryLanguage}
              onChange={(event) => setPrimaryLanguage(event.target.value)}
              error={errorLanguage}
              helperText={errorLanguage && 'Please select a language.'}
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
    </Box>
  );
}
