import { useEffect, useState } from 'react';
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
import axios from 'axios'
// import TableData from './TableData';
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'; //Tooltip
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';

const Validation = ()=> {
    const [inputData, setInputData] = useState({
        fname: '',
        lname: '',
        gender: '',
        score: ''
    })
    const [errorData, setErrorData] = useState({})
    const [dataTable, setDataTable] = useState([])
    const [editBtn, setEditBtn] = useState(false)
    const [nameBtn, setNameBtn] = useState("Add")
    // const [newDatas, setNewDatas] = useState({})

    const getInput = (event)=> {
        setInputData({...inputData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event)=> {
        event.preventDefault();
        const {fname, lname, gender, score} = inputData
        const error = {}
        const newData = [{}]
        
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

        // ถ้า validate ผ่านแล้ว------------------------------------------------
        if (Object.keys(error).length === 0 && error.constructor === Object && !editBtn) {
            console.log("Submittttttttttttt");
            // นำข้อมูลที่ต้องการนำไปใส่ มาใส่ที่นี่ axios. post************************************

            newData[0].id = "100"
            newData[0].firstname = fname
            newData[0].lastname = lname
            newData[0].gender = gender
            newData[0].score = parseFloat(score)

            setDataTable(dataTable.concat(newData))
            // setNewDatas(...newData,...newDatas)
            // console.log(newDatas);
            
            // const handlePost = async ()=> {
            //     try {
            //         const response = await axios.post('sample-data.json', {
            //             fname: '55',
            //             lname: '66',
            //             gender: '44',
            //             score: '11'
            //         })
            //         setDataTable(response.data)
            //         console.log(response.data);
            //     } catch (error) {

            //     } finally {

            //     }
            // }
            // handlePost();
        }

        if (editBtn) {
            // นำข้อมูลที่ต้องการนำไปใส่ มาใส่ที่นี่ axios. put************************************
            setNameBtn("Add")
            setEditBtn(false)
        }

        // setErrorData(error)
    }

    useEffect(()=>{
        const handleGet = async ()=> {
            try {
                const response = await axios.get('sample-data.json')
                const data = response.data;
                setDataTable(data)
            } catch (error) {
                
            } finally {
                
            }
        }
        handleGet();
    }, [inputData])

    // เมื่อกดแก้ไข ------------------------------------
    const handleEdit = (rowData) => {
        setNameBtn("Edit")
        setEditBtn(true)
        setInputData({
          fname: rowData.firstname,
          lname: rowData.lastname,
          gender: rowData.gender,
          score: rowData.score.toString() // แปลง score เป็น string เพื่อให้มันถูกแสดงใน input type number
        });
        // console.log(rowData.gender);
      };

    //   const Editdfunc = (event)=> {
    //     event.preventDefault();
    //     // exios .put ************************************************
    //     console.log("Editttttttttttt");
    //   }

    return (
        <div className='container-form'>
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit} //**************************************** */
            >
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    type='text'
                    label="First name"
                    name="fname"
                    variant="outlined"
                    value={inputData.fname}
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
                    value={inputData.lname}
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
                            value={inputData.gender}
                            onChange={getInput}
                            label="Gender"
                        >
                            <MenuItem value="">None</MenuItem>
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
                    value={inputData.score}
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
                        {nameBtn}
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
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell></TableCell>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataTable.map(element => {
                                return (
                                    <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                                        <TableCell>{element.id}</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <EditIcon onClick={()=>handleEdit(element)} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell id='fname'>{element.firstname}</TableCell>
                                        <TableCell id='lname'>{element.lastname}</TableCell>
                                        <TableCell id='gener'>{element.gender}</TableCell>
                                        <TableCell id='score'>{element.score.toFixed(2)}</TableCell>
                                        {/* <TableCell>
                                        <Tooltip title="" arrow>
                                            <span></span>
                                        </Tooltip>
                                        </TableCell>
                                        <TableCell></TableCell> */}
                                    </TableRow>
                                        )
                                    }
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    );
}

export default Validation