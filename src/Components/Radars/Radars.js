import { letterSpacing } from '@mui/system';
import React from 'react'
import { useState, useEffect } from 'react'

import Radar from '../Radar/Radar'

import './Radars.css'

export default function Radars({data}) {
    
    const [toeSideData, setToeSideData] = useState([]);
    const [heelSideData, setHeelSideData] = useState([]);

    

    useEffect(() => {
        splitData(data);
    }, [data])

    function splitData(data){
        let toeData = []
        let heelData = []

        data.forEach(d => {
            if(d.load.includes('-')){
                heelData.push(d)
            }else{
                toeData.push(d)
            }
        })
        setToeSideData(toeData)
        setHeelSideData(heelData)
    }

    return (
        <div className = 'radars'>
            {heelSideData[0] !== undefined && 
                <>
                    <Radar selectedBootData = {toeSideData} />
                    <Radar selectedBootData = {heelSideData} />
                </>
            }
        </div>
    )
}

