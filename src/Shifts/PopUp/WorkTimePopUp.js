import React from 'react'
import './PopUp.css'
import {useState} from "react"
import { Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday } from '../Function/Days'
import Axios  from 'axios'
const WorkTimePopUp = (props) =>{
  const [d, setD] = useState(true)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const hours = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00','8:00','9:00','10:00','11:00','12:00','13:00',
  '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00']
  const [daysF, setDaysF] = useState('-') 
  const [daysT, setDaysT] = useState('-') 
  const [hoursF, setHoursF] = useState('-') 
  const [hoursT, setHoursT] = useState('-') 
  const Submit = () =>{
    if(daysF === '-' || daysT ==="-" || hoursF === '-' || hoursT === '-'){
      console.log('missing')
    }
    else{
      if(d){
        if(daysF <= 0 && daysT >= 0){
          Sunday(hoursF,hoursT,true)
        }else{
          Sunday(hoursF,hoursT,false)
        }
        if(daysF <= 1 && daysT >= 1){
          Monday(hoursF,hoursT,true)
        }else{
          Monday(hoursF,hoursT,false)
        }
        if(daysF <= 2 && daysT >= 2){
          Tuesday(hoursF,hoursT,true)
        }else{
          Tuesday(hoursF,hoursT,false)
        }
        if(daysF <= 3 && daysT >= 3){
          Wednesday(hoursF,hoursT,true)
        }else{
          Wednesday(hoursF,hoursT,false)
        }
        if(daysF <= 4 && daysT >= 4){
          Thursday(hoursF,hoursT,true)
        }else{
          Thursday(hoursF,hoursT,false)
        }
        if(daysF <= 5 && daysT >= 5){
          Friday(hoursF,hoursT,true)
        }else{
          Friday(hoursF,hoursT,false)
        }
        if(daysF <= 6 && daysT >= 6){
          Saturday(hoursF,hoursT,true)
        }else{
          Saturday(hoursF,hoursT,false)
        }
      }else{
        //optimize by day
      }
      Axios.post('http://localhost:3001/setFirstWorkTimeFT', {CID:localStorage.getItem('CID')})
      props.setTrigger(false)
    }
  }
  
  const daysFrom = (x) =>{
    var select = document.getElementById(x);
    var value = select.options[select.selectedIndex].value;
    if(daysT <= value){
      setDaysT('-')
    }
    setDaysF(value)
    return(value)

  }
  const daysTo = (x) =>{
    var select = document.getElementById(x);
    var value = select.options[select.selectedIndex].value;
    setDaysT(value)
    return(value)


  }
  const hoursFrom = (x) =>{
    var select = document.getElementById(x);
    var value = select.options[select.selectedIndex].value;
    if(hoursT <= value){
      setHoursT('-')
    }
    setHoursF(value)
    return(value)

  }
  const hoursTo = (x) =>{
    var select = document.getElementById(x);
    var value = select.options[select.selectedIndex].value;
    setHoursT(value)
    return(value)

  }


    return(props.trigger) ? (
      <div className="ccpu">
        <div className="ccpu_inner">
          <p>Work time </p>
          <div className='default'>
            <button disabled={d}> default for every day</button>
            <button disabled={!d}>optimize days</button>
          </div>
          {d ? 
          (<div>
            <p>select the days</p>
            <div className='days'>
              <div className='daysF'>
                <p>from:</p>
                <select name="daysF" id="daysF" onClick={() => daysFrom('daysF')}>
                  <option>-</option>
                  {days.map((val, key) =>(
                    <option value={key} key={key} >{val}</option>
                  ))}
                </select>
              </div>
              {daysF ==='-' ? 
              (null)
              :
              (
              <div className='daysT'>
                <p>to:</p>
                <select name="daysT" id="daysT" onClick={() => daysTo('daysT')}>
                  <option>-</option>
                  {days.map((val, key) =>(
                    key <= daysF ? 
                      (null):(<option value={key} key={key}>{val}</option>)
                    
                  ))}
                </select>
              </div>)}
            </div>
            <p>select the hours</p>
            <div className='hours'>
              <div className='hoursF'>
                <p>from:</p>
                <select name="hoursF" id="hoursF" onClick={() => hoursFrom('hoursF')}>
                  <option>-</option>
                  {hours.map((val, key) =>(
                    <option value={key} key={key} >{val}</option>
                  ))}
                </select>
              </div>
              {hoursF ==='-' ? 
              (null)
              :
              (
              <div className='hoursT'>
                <p>to:</p>
                <select name="hoursT" id="hoursT" onClick={() => hoursTo('hoursT')}>
                  <option>-</option>
                  {hours.map((val, key) =>(
                    key <= hoursF ? 
                      (null):(<option value={key} key={key}>{val}</option>)
                    
                  ))}
                </select>
              </div>)}
            </div>
          </div>)
          :
          ('')}
          

          <button onClick={Submit}>submit</button>
          {props.children}
        </div>
      </div>
    ) : ""
  }

  export default WorkTimePopUp