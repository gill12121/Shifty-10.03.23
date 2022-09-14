import React from 'react'
import { Link } from "react-router-dom";
import {YID } from './Login'
import {useEffect, useState} from 'react'
import Axios from 'axios'
const CompanyPage = () =>{
    const [CEPermission, setCEPermission] = useState(0)
    const url = window.location.href.replace('http://localhost:3000', '')

    useEffect(() =>{
        Axios.post('http://localhost:3001/getCEPermission',{YID:YID})
        .then((response) =>{
            if(response.data.length){
                setCEPermission(response.data[0].create_employee)
              }
        })

    }, [])


    return (
        <div>
            <nav>
                {CEPermission === 0 ? (null)
                :
                ( <Link to={`${url}/employees`}><button>employees</button></Link>)}
               
                <Link to={`${url}/shifts`}><button>Create shifts</button></Link>
                <Link to={`${url}/permissions`}><button>Create permissions</button></Link>
            </nav>
        </div>
    )
    

}

export default CompanyPage