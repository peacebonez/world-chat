import React, {useState} from 'react'
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
      <Box style={{ backgroundColor: 'red'}}>
        <h1>Hiiiii</h1>
      </Box>

      {/** The right side, the sign up */}
      <Box className={classes.outerMargins} >
        <Box display="flex" style={{ marginBottom: '50%'}}>
          <Typography variant="h5">Already have an account? </Typography>
          <Button variant="outlined" color="primary" style={{ marginLeft: '2%' }}>
            Login
          </Button>
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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
          >Create</Button>
        </Box>
        
      </Box>

    </Box>
   
  )
}