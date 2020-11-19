import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { 
  Box,
  Typography,
  TextField,
  Button
 } from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles'

import Background from '../assets/background.png'

require('dotenv').config();
const baseURL = process.env.REACT_APP_baseURL;

const useStyles = makeStyles({
  noUnderlineLink: {
    textDecoration: 'none'
  },
  inline: {
    inline: 'true'
  },
  outerMargins: {
    marginTop: '2%',
    paddingLeft: '10%'
  },
  image: {
    height: '100vh'
  },
  marginBottom50: {
    marginBottom: '50%'
  },
  createAccount: {
    color: '#9c9c9c'
  },
  marginBottom5: {
    marginBottom: '5%'
  },
  createAccountButton: {
    marginLeft: '15%'
  }
});

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    axios.post(`${baseURL}/user/login`, {
      email,
      password
    }).then(response => {
      history.push('/messenger');
    }).catch(error => console.error(error))
  };

  return (
    <Box display="flex">
      {/** The left side: Image saying "Converse with anyone with any language" */}
      <Box >
        <img src={Background} className={classes.image} 
          alt="People talking and texting, with purpose of the web app."
        />
      </Box>

      {/** The right side, the sign up */}
      <Box className={classes.outerMargins} >
        <Box display="flex" className={classes.marginBottom50}>
          <Typography variant="subtitle1" className={classes.createAccount}>Don't have an account? </Typography>
          <Link to="/" className={classes.noUnderlineLink}>
            <Button variant="outlined" color="primary" className={classes.createAccountButton}>
                Create account
            </Button>
          </Link>
          
        </Box>
        
        <Typography 
          variant="h4" 
          fontWeight="fontWeightBold"
          className={classes.marginBottom5}
        >Welcome back!</Typography>
        <Box display="flex" flexDirection="column">
          <TextField 
            label="Email" 
            onChange={(event) => setEmail(event.target.value)}
            className={classes.marginBottom5}
          />
          <TextField 
            label="Password" 
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className={classes.marginBottom5}
          />
          <Button 
            variant="contained" color="primary"
            onClick={handleClick}
          >Login</Button>
        </Box>
        
      </Box>

    </Box>
   
  )
}