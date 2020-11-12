import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { 
  Box,
  Typography,
  TextField,
  Button
 } from '@material-ui/core'
 import { makeStyles} from '@material-ui/core/styles'

 import Background from '../assets/background.png'

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

  return (
    <Box display="flex">
      {/** The left side: Image saying "Converse with anyone with any language" */}
      <Box >
        <img src={Background} style={{ height: '100vh'}}
          alt="People talking and texting, with purpose of the web app."
        />
      </Box>

      {/** The right side, the sign up */}
      <Box className={classes.outerMargins} >
        <Box display="flex" style={{ marginBottom: '50%'}}>
          <Typography variant="h5">Don't have an account? </Typography>
          <Link to="/">
            <Button variant="outlined" color="primary" style={{ marginLeft: '15%' }}>
                Create account
            </Button>
          </Link>
          
        </Box>
        
        <Typography 
          variant="h4" 
          fontWeight="fontWeightBold"
          style={{ marginBottom: '5%'}}
        >Welcome back!</Typography>
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
          <Button 
            variant="contained" color="primary"
          >Login</Button>
        </Box>
        
      </Box>

    </Box>
   
  )
}