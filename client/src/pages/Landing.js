import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { 
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
 } from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles'

import Background from '../assets/background.png'

require('dotenv').config();
const baseURL = process.env.REACT_APP_baseURL

const useStyles = makeStyles({
  inline: {
    inline: 'true'
  },
  outerMargins: {
    marginTop: '2%',
    paddingLeft: '10%'
  }
})

export default function Landing() {
  const classes = useStyles()

  const [language, setLanguage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    axios.post(`${baseURL}/api/user/signup`, {
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
        <img src={Background} style={{ height: '100vh'}}/>
      </Box>

      {/** The right side, the sign up */}
      <Box className={classes.outerMargins} >
        <Box display="flex" style={{ marginBottom: '50%'}}>
          <Typography variant="h5">Already have an account? </Typography>
          <Link to="/login">
            <Button variant="outlined" color="primary" style={{ marginLeft: '10%' }}>
              Login
            </Button>
          </Link>
          
        </Box>
        
        <Typography 
          variant="h4" 
          fontWeight="fontWeightBold"
          style={{ marginBottom: '5%'}}
        >Create an Account.</Typography>
        <Box display="flex" flexDirection="column">
          <TextField 
            label="Email" 
            onChange={(event) => setEmail(event.target.value)}
            style={{ marginBottom: '5%'}}
          />
          <TextField 
            label="Password" 
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginBottom: '5%'}}
          />
          <FormControl style={{ marginBottom: '20%'}}>
            <InputLabel id="demo-simple-select-label">Select a Language</InputLabel>
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
            onSubmit={handleSubmit}
          >Create</Button>
        </Box>
        
      </Box>

    </Box>
   
  )
}