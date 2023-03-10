import React from "react";
import { useState } from "react";
 const ButtonDate = (props) =>{
    const [color, setColor] = useState(false)
    const index = props.array.findIndex(object => { return(object.hour === props.hour && object.day === props.day)})
    const ClickHandleDown = () =>{
        props.setOAColor(!color)
        props.fullArray[index].checked = !color
        setColor(!color)
        
        
        props.setMouseDown(true)
       
    }
    const ClickHandleUp = () =>{
        props.setMouseDown(false)
        
    }
    const ClickHandleMove = () =>{
        if(props.mouseDown){
           setColor(props.oAColor)
           props.fullArray[index].checked = props.oAColor
        }
    }
    
    return(

        <button
        disabled={!props.isActive[index]}
        onMouseDown={() => ClickHandleDown()}
        onMouseUp={() => ClickHandleUp()}
        onMouseMove={() => ClickHandleMove()}
        style={{
            backgroundColor: color ? 'salmon' : '',
            color: color ? 'white' : '',
          }}>
        </button>
    )
}
export default ButtonDate