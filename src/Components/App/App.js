import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Radar from '../Radar/Radar';
import Radars from '../Radars/Radars';
import Nav from '../Nav/Nav';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddData from '../AddData/AddData';

const axios = require('axios');




function App() {

  const [selectedBoot, setSelectedBoot] = useState(null);
  const [selectedBootData, setSelectedBootData] = useState([]);
  const [bootNames, setBootNames] = useState([]);
  const [addDataActive, setAddDataActive] = useState(false);


  useEffect(() => {
    getBootNames();
  }, [])

  function handleBootChange(newBoot) {
    setSelectedBoot(newBoot);
    getBootData(newBoot)
  }

  function toggleAddDataActive(){
    setAddDataActive(!addDataActive);
  }

  async function getBootData(bootName){
    console.log('getBootData');
    const bootData = await axios.get(`https://boot-analysis-api.herokuapp.com/sheets/getbootdata/${bootName}`)
    .then(function (response) {
      // handle success
      console.log(response);
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

    
      
    console.log(bootData);
    setSelectedBootData(bootData);
    
  }

  async function getBootNames(){

    const bootNames = await axios.get(`https://boot-analysis-api.herokuapp.com/sheets/getbootnames`)
    .then(function (response) {
      // handle success
      
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    console.log(bootNames);
    setBootNames(bootNames);
    setSelectedBoot(bootNames[0]);
    getBootData(bootNames[0]);

  }

  function triggerBootListUpdate(){
    getBootNames();
  }

  return (
    <div className="App">
      {addDataActive && <AddData toggleAddDataActive = {toggleAddDataActive} triggerBootListUpdate = {triggerBootListUpdate} />} 
      <body>
        <Nav handleBootChange = {handleBootChange} bootNames = {bootNames}/>
        {selectedBootData[0] !== undefined && <Radars data = {selectedBootData} />}
        <div className = 'fab-container'>
          <Fab color="primary" aria-label="add" className = 'fab' onClick = {toggleAddDataActive}>
            <AddIcon />
          </Fab>
        </div>

        
      </body>
      
    </div>
  );
}

export default App;
