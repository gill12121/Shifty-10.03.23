import React from 'react'
import './PopUp.css'
import {useState} from "react"
import Axios from 'axios'
import {YID} from '../Login'

const CreateCompanyPopUp = (props) =>{
  const [name, setName] = useState('')
  var CID
  const Submit = () =>{
    Axios.post('http://localhost:3001/createCompany', 
        {name: name})
        .then((response) => {
        })
    Axios.post('http://localhost:3001/getCompanyid', {name:name})
    .then((response) => {
      CID = response.data[0].id
      Axios.post('http://localhost:3001/connectCompany',{YID:YID, CID:CID})
      Axios.post('http://localhost:3001/setCompanyDefaultPermission',{CID:CID})
        props.setTrigger(false)
      })

  }
 

    return(props.trigger) ? (
      <div className="ccpu">
        <div className="ccpu_inner">
          <button className="ccpu_close" onClick={() => props.setTrigger(false)}>close</button>
          <p>Company name: </p>
          <input type="text" onChange={(event) => {setName(event.target.value)}}></input>
          <button onClick={Submit}>submit</button>
          {props.children}
        </div>
      </div>
    ) : ""
  }

  export default CreateCompanyPopUp