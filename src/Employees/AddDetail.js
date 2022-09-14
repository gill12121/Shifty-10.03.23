import React from 'react'
import './PopUp.css'
import {detailDetail} from './CreateEmployeePopUp'

const AddDetail = (props) =>{
  var exist = false;
    const ClickHandle = (text) =>{
        props.getDArr.map((val, key) =>{
            if(val.type===text && val.value === props.getDHL){
                exist = true
            }
        })
        
        
        if(props.getDHL === '' || exist === true){

        }else{
            props.setDT(text)
            props.setDArr((s) =>{
                return[
                    ...s,
                    {type: text,
                    value: props.getDHL,
                    id: ''}
                
                ]})
                props.setDArrN((s) =>{
                    return[
                        ...s,
                        {type: text,
                        value: props.getDHL,
                        id: ''}
                    
                    ]})
            props.setDHL((s) =>{
                return[
                ...s,props.getDHL]})
                detailDetail.push({type:text, value:props.getDHL, detail:''})
            props.setTrigger(false)
        }
    }
 

    return(props.trigger) ? (
      <div className="ccpu">
        <div className="ccpu_inner">
          <button className="ccpu_close" onClick={() => props.setTrigger(false)}>close</button>
          <p>Name of detail:</p>
          <input type='text' onChange={(event) => props.setDHL(event.target.value)}></input>
          <button onClick={() => ClickHandle('checkbox')}>checkbox</button>
          <button onClick={() => ClickHandle('date')}>date</button>
          <button onClick={() => ClickHandle('email')}>email</button>
          <button onClick={() => ClickHandle('number')}>number</button>
          <button onClick={() => ClickHandle('text')}>text</button>
          {props.children}
        </div>
      </div>
    ) : ""
  }

  export default AddDetail