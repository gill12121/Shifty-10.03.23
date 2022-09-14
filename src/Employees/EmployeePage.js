import React from 'react'
import {useState, useEffect} from 'react'
import Axios from 'axios'
const EmployeePage = (props) =>{
    var tempID = window.location.href.replace('http://localhost:3000/company/', '').split('/employees/')
    const CID = tempID[0]
    const EID = tempID[1]
    const [employeeInfo, setEmployeeInfo] = useState({})

    const Information = () =>{
        Axios.post('http://localhost:3001/getEmployeeWithid', {EID:EID})
        .then((response) =>{
            setEmployeeInfo({name:response.data[0].name, email:response.data[0].email,
            department:response.data[0].department, location:response.data[0].location,
            phone:response.data[0].phone, permission:response.data[0].permission})
        })
        
    }
    useEffect(() =>{
        Information();
    }, [])
    return(
        <div>
            <p>Name: {employeeInfo.name}</p>
            <p>email: {employeeInfo.email}</p>
            <p>department: {employeeInfo.department}</p>
            <p>location: {employeeInfo.location}</p>
            <p>phone: {employeeInfo.phone}</p>
            <p>permission: {employeeInfo.permission}</p>
        </div>
    )
}

export default EmployeePage