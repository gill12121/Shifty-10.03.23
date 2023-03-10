import React from "react";
import './DateButton.css'
import ButtonDate from "./ButtonDate";
import { useState,useEffect } from "react";
import { FullHours,dailyHours } from "./Function/CalendarDH";
const Calendar2 = (props) => {
    const days = [1,2,3,4,5,6,7]
    const [hours, setHours] = useState([])
    const [mouseDown, setMouseDown] = useState(false)
    const [buttonArray, setButtonArray] = useState([{}])
    const [oAColor, setOAColor] = useState(false)
    var fullArray = buttonArray
    var isActiveArray = []
    if(fullArray.length){
        for(let i =0; i< fullArray.length;i++){
            isActiveArray[i] = fullArray[i].active
        }
    }
    useEffect(() =>{
        FullHours(setHours);
        

    }, [])
    useEffect(() =>{
        dailyHours(hours,setButtonArray)

    }, [hours])
    
    const onMouseUpdiv = () =>{
        setMouseDown(false)
    }
    const onSubmit = () =>{
        console.log(fullArray)
    }
        return(
            
        <div onMouseUp={onMouseUpdiv}>
            <p>Calendar</p>
            <div className="days">
                {days.map((val, key) =>(
                    <p key={key}> day {val}</p>
                ))}
            </div>
            <div className="hour-button" onMouseUp={onMouseUpdiv}>
                <div className="hours">
                    {hours.map((val, key) =>(
                        <p key={key}>{val}:00</p>
                    ))}
                </div>
                {days.map((val2,key2) =>(
                    <div className='buttons' key={key2}>
                        {hours.map((val,key) =>(
                            
                           <ButtonDate
                            isActive={isActiveArray}
                            fullArray={fullArray}
                            oAColor={oAColor}
                            setOAColor={setOAColor}
                            mouseDown={mouseDown}
                            setMouseDown={setMouseDown}
                            array={buttonArray}
                            setArray={setButtonArray}
                            hour={val}
                            day={val2}
                            key={key2*1000+key} >
                            </ButtonDate>
                            ))}
                    </div>
                ))}
                    
                <div>
                    <button onClick={onSubmit}>submit</button>
                </div>
            </div>
        </div>
        )
    }




export default Calendar2
