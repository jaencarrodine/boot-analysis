import React from 'react';
import {useState, useEffect} from 'react';


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import LinearProgress from '@mui/material/LinearProgress';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import './AddData.css'
const axios = require('axios');

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


export default function AddData({toggleAddDataActive, triggerBootListUpdate}) {
    const [newData, setNewData] = useState([]);
    const [bootName, setBootName] = useState('');
    const [dataEntry, setDataEntry] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const loads = [20,40,60,80,100,120,140,-20,-40,-60,-80,-100,-120,-140];

    const handleDataEntryChange = (e) => {
        setDataEntry(e.target.value);
    }

    const handleBootNameChange = (e) => {
        setBootName(e.target.value);
    }
    
    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            let currentData = newData;
            currentData.push(dataEntry)
            setNewData(currentData);
            setDataEntry('');
        }
    }

    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
  };



    const backSpace = (e) => {
        let currentData = newData;
        currentData.pop();
        setNewData(currentData);
    }




    function submitData(){
        let organizedData = organizeData()
        let data = {
            bootName: bootName,
            data: organizedData
        }
        setLoading(true)
        axios.post('http://localhost:4000/sheets/upload-data', data)
        .then(res => {
            console.log(res.data);
            if(res.data.success){
                setLoading(false)
                setOpen(true);
                triggerBootListUpdate();
                
            }
        })
        .catch(err => {
            console.log(err);
        })
    }




    function organizeData(){
        let organizedData = [];
        loads.forEach((load,i)=> {
            let dataObj = {
                load: load,
                toe_right: newData[i*4],
                toe_left: newData[(i*4)+1],
                heel_right: newData[(i*4)+2],
                heel_left: newData[(i*4)+3]
            }
            organizedData.push(dataObj);
        })
        return organizedData;
    }

   

    const table = (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400, maxHeight:400}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Load</TableCell>
              <TableCell align="center" >Right Toe</TableCell>
              <TableCell align="center">Left Toe</TableCell>
              <TableCell align="center">Right Heel</TableCell>
              <TableCell align="center">Left Heel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loads.map((load, i) => (
              <TableRow
                key={load}
                sx={{ '&:last-child td, &:last-child th': { border: 0,  } }}
              >
                <TableCell component="th" scope="row" sx={{padding: '5px'}}>
                  {load}
                </TableCell>
                <TableCell align="center" sx={{padding: '5px'}}>{newData[(i*4)]}</TableCell>
                <TableCell align="center" sx={{padding: '5px'}}>{newData[(i*4)+1]}</TableCell>
                <TableCell align="center" sx={{padding: '5px'}} >{newData[(i*4)+2]}</TableCell>
                <TableCell align="center" sx={{padding: '5px'}}>{newData[(i*4)+3]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

    const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              Add Data
            </Typography>
      
            <TextField id="outlined-basic" label="Boot Name" variant="outlined" onChange = {handleBootNameChange}/>
            <TextField id="outlined-basic" label="Data Entry" variant="outlined" onChange = {handleDataEntryChange} onKeyPress = {handleKeyPress} value = {dataEntry}/>
            <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
              Select data entry text box and click data collect button to record a new data point.
            </Typography>
            {table}
            
          </CardContent>
          <CardActions>
            <Button size="small" onClick = {submitData}>submit</Button>
            <div className="close-button">
                <Button size="small" onClick = {toggleAddDataActive}>close</Button>
            </div>
            {/*<Button size="small" onClick = {backSpace}>Back Space</Button>*/}
          </CardActions>
          {loading && <LinearProgress />}
          
        </React.Fragment>
    );

    

      
    return (
        <>
        <div className = 'add-data-container'> 
            <Box sx={{ minWidth: 800 ,marginTop:'50px',zIndex: 10}}>
                <Card variant="outlined">{card}</Card>
            </Box>
            
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
  
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Data uploaded to sheets successfully!
                </Alert>
            </Snackbar>
        
        </Stack>
        </>
   
    );
}
