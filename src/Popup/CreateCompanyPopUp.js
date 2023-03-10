import React from 'react'
import './PopUp.css'
import {useState, useEffect} from "react"
import Axios from 'axios'
var YID
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
      Axios.post('http://localhost:3001/setWorkTimeWCID',{CID:CID})
        props.setTrigger(false)
      })

  }
 useEffect(() =>{
  YID = localStorage.getItem('YID')

 })

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