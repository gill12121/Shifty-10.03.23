import {useState} from "react"
import Axios from 'axios'
import React from 'react';
import { Link} from 'react-router-dom';

export var YID;
const Login = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [approved, setApproved] = useState(false)

  

    const LoginPassword = () =>{
       
        Axios.post('http://localhost:3001/getpassword', 
        {username: username})
        .then((response) => {
            if(response.data.length === 0){
                return
            }
            if(password === response.data[0].password){
                YID = response.data[0].id
                setApproved(true)
                
            }
        })
        
    }

    return(
        <main>
            <div >
                <form >
                    <p>Username: </p>
                    <input type="text" onChange={(event) => {setUsername(event.target.value)}}></input>
                    <p>Password: </p>
                    <input type="password" onChange={(event) => {setPassword(event.target.value)}} ></input>
                </form>
                <nav >
                    <LoginPassword/>
                        {approved ? ( 
                            <Link to="/Home"><button >Login</button></Link>
                        ):(
                            <button>Login</button>

                        )}
                    <Link to="/Register"><button >Sign Up</button></Link>
                </nav>
            </div>
        </main>
    )
}
export default Login;