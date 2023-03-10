import React from 'react'
import { Link } from "react-router-dom";
import {useEffect, useState} from 'react'
import Axios from 'axios'
const CompanyPage = () =>{
    const [CEPermission, setCEPermission] = useState(0)

    useEffect(() =>{

        Axios.post('http://localhost:3001/getCEPermission',{YID:localStorage.getItem('YID')
    })
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
                ( <Link to={`employees`}><button>employees</button></Link>)}
               
                <Link to={`shifts`}><button>Create shifts</button></Link>
                <Link to={`permissions`}><button>Create permissions</button></Link>
            </nav>
        </div>
    )
    

}

export default CompanyPage