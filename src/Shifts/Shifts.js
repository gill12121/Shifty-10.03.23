import React from 'react'
import { useState,useEffect } from 'react'
import './Shifts.css'
import ButtonDate from './ButtonDate'
import Axios from 'axios'
import WorkTimePopUp from './PopUp/WorkTimePopUp' 
import Calendar2 from './Calendar2'
import {FullHours} from './Function/CalendarDH'
const Shifts = () =>{
const CID = localStorage.getItem('CID')
const [workPop, setWorkPop] = useState(false)


    const getWorkTime = () =>{
        Axios.post('http://localhost:3001/getWorkTimeWCID', {CID:CID})
        .then((response) =>{
            if(response.data[0].first_time === 0){
                setWorkPop(true)
            }else{
                setWorkPop(false)
            }
        })
    }
 
        
    
    useEffect(() =>{
        getWorkTime();
    }, [])
    return (
        <div>
            <WorkTimePopUp 
            trigger={workPop} setTrigger={setWorkPop}
            ></WorkTimePopUp>
            <Calendar2 ></Calendar2>
            
        </div>
   
    ) 
}

export default Shifts