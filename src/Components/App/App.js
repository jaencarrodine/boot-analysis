import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Radar from '../Radar/Radar';


const {extractData} = require('../../functions/access-sheets.js');


function App() {

  const [selectedBoot, setSelectedBoot] = useState(null);
  const [selectedBootData, setSelectedBootData] = useState(null);


  useEffect(() => {
    handleBootChange('testboot');

  }, [])
  function handleBootChange(newBoot) {
    setSelectedBoot(newBoot);
    setSelectedBootData(getBootData(newBoot));
  }

  async function getBootData(bootName){
    

  }

  return (
    <div className="App">
      
      <body>
        <Radar />
      </body>
    </div>
  );
}

export default App;
