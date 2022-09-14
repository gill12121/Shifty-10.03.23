import {useState} from "react"
import Axios from 'axios'
import React from 'react';
import { Link} from 'react-router-dom';


const RegisterPage = () => {
    

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setbirthday] = useState('')


    const Registration = () =>{
        Axios.post('http://localhost:3001/create',
         {name: name, username: username, password: password, email: email, phone:phone, birthday:birthday}
         ).then(() => {
            Axios.post('http://localhost:3001/getEmployeeid',{email:email})
            .then((resposne) => {
                Axios.post('http://localhost:3001/setPermissionFirstUser',{YID:resposne.data[0].id})
                
            })
             
         })
    }

    return(
        <div className="register_div">
            <p>Name:</p>
            <input type="text" onChange={(event) => {setName(event.target.value)}}></input>
            <p>Username:</p>
            <input type="text" onChange={(event) => {setUsername(event.target.value)}}></input>
            <p>Password:</p>
            <input type="text" onChange={(event) => {setPassword(event.target.value)}}></input>
            <p>Email:</p>
            <input type="text" onChange={(event) => {setEmail(event.target.value)}}></input>
            <p>Phone:</p>
            <input type="text" onChange={(event) => {setPhone(event.target.value)}}></input>
            <p>Birthday:</p>
            <input type="date" onChange={(event) => {setbirthday(event.target.value)}}></input>
            <Link to="/"> <button >Back</button></Link>
            <Link to="/"><button onClick={Registration}>Register</button></Link>
        </div>
    )
}

export default RegisterPage;

