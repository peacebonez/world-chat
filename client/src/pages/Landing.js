import React, {useState} from 'react'
import { 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
 } from '@material-ui/core'

export default function Landing() {
  const [language, setLanguage] = useState('')

  return (
    <>
      <h1>Create an Account.</h1>
      <TextField label="Email"/>
      <TextField label="Password"/>
      <FormControl>
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
    </>
  )
}