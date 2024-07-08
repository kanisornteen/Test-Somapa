import { useState } from 'react';
import './Validation.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const Validation = ()=> {
    const [inputData, setInputData] = useState({
        fname: '',
        lname: '',
        gender: '',
        score: ''
    })
    const [errorData, setErrorData] = useState({})

    const getInput = (event)=> {
        setInputData({...inputData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event)=> {
        event.preventDefault();
        const {fname, lname, gender, score} = inputData
        // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
        // const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
        const error = {}
        
        if(fname === ''){
            error.fname = "First name is Required"
        }

        if(lname === ''){
            error.lname = "Last name is Required"
        } 

        if(gender === '' || gender === "None"){
            error.gender = "Gender is Required"
        } 

        if(score === ''){
            error.score = "Score is Required"
        } else if(score < 0) {
            error.score = "Minimum is 0"
        } else if(score > 100) {
            error.score = "Maximum is 100"
        }
        setErrorData(error)
    }

    const [gender, setGender] = useState('');
    const handleGenderChange = (event) => {
        setGender(event.target.value);
        getInput(event); // assuming getInput handles the event correctly
      };

    return (
        <div className='container-form'>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              label="First name"
              name="fname"
              variant="outlined"
              helperText={errorData.fname && errorData.fname}
              onChange={getInput}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type='text'
              label="Last name"
              name="lname"
              variant="outlined"
              helperText={errorData.lname && errorData.lname}
              onChange={getInput}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    label="Gender"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Unknown">Unknown</MenuItem>
                </Select>
                <FormHelperText>{errorData.gender && errorData.gender}</FormHelperText>
                {/* <div style={{ marginTop: '8px', color: gender ? 'inherit' : 'red' }}>
                    {gender ? "" : 'Please select a gender'}
                </div> */}
                </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type='number'
              label="Score"
              name="score"
              variant="outlined"
              helperText={errorData.score && errorData.score}
              onChange={getInput}
              fullWidth
              inputProps={{ min: '0', max: '100' }}
              required
            />
          </Grid>
          <Grid item xs={12} container justifyContent="center" spacing={2}>
            <Grid item>
              <Button variant="contained" color='primary' type='submit' sx={{ width: '40%' }}>
                Add
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{backgroundColor: 'white', width: '40%', color: 'black'}} type='button'>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
    );
}

export default Validation