import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Hidden,
} from '@material-ui/core';
import AppAlert from '../components/AppAlert';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../assets/background.png';
import { UserContext } from '../contexts/userContext';
require('dotenv').config();

const useStyles = makeStyles({
  noUnderlineLink: {
    textDecoration: 'none',
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
  grayText: {
    color: '#9c9c9c',
  },
  createButton: {
    width: '60%',
    margin: 'auto',
  },
});

export default function Register() {
  const classes = useStyles();
  const { userState, userActions } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState('');

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorLanguage, setErrorLanguage] = useState(false);

  const isEmail = (email) => /^\S+@\S+$/.test(email);
  const isName = (name) => /^[A-Z]+$/i.test(name);

  const errors = () => {
    return (
      errorName ||
      errorEmail ||
      errorPassword ||
      errorLanguage ||
      errorConfirmPassword ||
      !userState.user.errorMsg === ''
    );
  };

  const handleSubmit = () => {
    if (!isEmail(email)) setErrorEmail(true);
    if (!isName(name)) setErrorName(true);
    if (!password) setErrorPassword(true);
    if (!primaryLanguage) setErrorLanguage(true);
    if (password !== confirmPassword) {
      alert(`${password} === ${confirmPassword}`);
      setErrorConfirmPassword(true);
    }

    if (!errors()) {
      alert(errorName);
      alert(errorEmail);
      alert(errorPassword);
      alert(errorLanguage);
      alert(errorConfirmPassword);
      userActions.signUpUser(name, email, password, primaryLanguage);
    }
  };

  useEffect(() => {
    if (isName(name)) setErrorName(false);
    if (isEmail(email)) setErrorEmail(false);
    if (password.length > 5) setErrorPassword(false);
    if (primaryLanguage) setErrorLanguage(false);
    if (password === confirmPassword) setErrorConfirmPassword(false);
  }, [name, email, password.length, primaryLanguage, confirmPassword]);

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
            Already have an account?{' '}
          </Typography>
          <Link to="/" className={classes.noUnderlineLink}>
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
          Create an Account
        </Typography>
        <Box display="flex" flexDirection="column">
          <TextField
            label="Name"
            onChange={(event) => setName(event.target.value)}
            className={classes.marginBottom5}
            required
            error={errorName}
            helperText={errorName ? 'Name required.' : ''}
          />
          <Typography variant="h6" className={classes.errors}></Typography>
          <TextField
            label="Email"
            onChange={(event) => setEmail(event.target.value)}
            className={classes.marginBottom5}
            required
            error={errorEmail}
            helperText={errorEmail ? 'Invalid email.' : ''}
          />
          <Typography variant="h6" className={classes.errors}></Typography>
          <TextField
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className={classes.marginBottom5}
            required
            error={errorPassword}
            helperText={
              errorPassword ? 'Password must be at least 6 characters.' : ''
            }
          />
          <Typography variant="h6" className={classes.errors}></Typography>
          <TextField
            label="Confirm Password"
            type="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            className={classes.marginBottom5}
            required
            error={errorConfirmPassword}
            helperText={errorConfirmPassword ? 'Passwords must match.' : ''}
          />
          <Typography variant="h6" className={classes.errors}></Typography>
          <FormControl className={classes.marginBottom20}>
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
          <Typography variant="h6" className={classes.errors}></Typography>
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
      <AppAlert trigger={userState.errorMsg} />
    </Box>
  );
}
