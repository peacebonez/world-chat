import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
 } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import Background from '../assets/background.png';

require('dotenv').config();
const baseURL = process.env.REACT_APP_baseURL;

const useStyles = makeStyles({
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
  marginLeft10: {
    marginLeft: '10%'
  },
  marginBottom5: {
    marginBottom: '5%'
  },
  marginBottom20: {
    marginBottom: '20%'
  }
})

export default function Landing() {
  const classes = useStyles();

  const [language, setLanguage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    axios.post(`${baseURL}/user/signup`, {
      email,
      password,
      primaryLanguage: language
    }).then(response => {
      console.log(response.data)
      // if (response.status === 200 || response.status === 201){

      // }
    })
  }

  return (
    <Box display="flex">
      {/** The left side: Image saying "Converse with anyone with any language" */}
      <Box >
        <img src={Background} className={classes.image} alt="People talking and texting, with purpose of the web app."/>
      </Box>

      {/** The right side, the sign up */}
      <Box className={classes.outerMargins} >
        <Box display="flex" className={classes.marginBottom50}>
          <Typography variant="h5">Already have an account? </Typography>
          <Link to="/login">
            <Button variant="outlined" color="primary" className={classes.marginLeft10}>
              Login
            </Button>
          </Link>
          
        </Box>
        
        <Typography 
          variant="h4" 
          fontWeight="fontWeightBold"
          className={classes.marginBottom5}
        >Create an Account.</Typography>
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
          <FormControl className={classes.marginBottom20}>
            <InputLabel id="language-select">Select a Language</InputLabel>
            <Select
              id="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <MenuItem value={'English'}>English</MenuItem>
              <MenuItem value={'Spanish'}>Spanish</MenuItem>
              <MenuItem value={'French'}>French</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="contained" color="primary"
            onClick={handleSubmit}
          >Create</Button>
        </Box>
        
      </Box>

    </Box>
   
  )
}