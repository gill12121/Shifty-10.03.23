import React, { useEffect } from 'react'
import {useState} from 'react'
import PopUp from './CreateEmployeePopUp'
import { Link } from "react-router-dom";
import Axios from 'axios'


const Employees = () =>{
    
    const [popUpb, setpopUpb] = useState(false)
    const [employeeListButton ,setEmployeeListButton] = useState([])
    const setEID = (EID) =>{
        localStorage.setItem('EID', JSON.stringify(EID))
    }
    const getEmployeeList = (YID,CID) =>{
        var tempList = []
        var tempList3 = [{}]

        Axios.post('http://localhost:3001/getELPermission', {YID:YID})
        .then((response) =>{
            if(response.data.length){
                if(response.data[0].employee_list === 1){
                    Axios.post('http://localhost:3001/getEmployeeCompany', {CID:CID})
                    .then((response) =>{
                        response.data.map((val) =>{
                        tempList.push(val.employee_id)
                        }) 
                        Axios.post('http://localhost:3001/getEmployeeCompanyList', {employee_list:tempList})
                        .then((response) =>{
                            response.data.map((val, key) =>{
                                tempList3[key] = {name:val.name, id:val.id}
                            })
                            setEmployeeListButton(tempList3)
                
                        })   
                    })
                }else if(response.data[0].employee_list === 0){
                    Axios.post('http://localhost:3001/getEmployeeCompanybymanager', {YID:YID})
                    .then((response) =>{
                        if(response.data.length){
                            response.data.map((val) =>{
                                tempList.push(val.employee_id)
                            }) 
                        
                        
                        
                        Axios.post('http://localhost:3001/getEmployeeCompanyList', {employee_list:tempList})
                        .then((response) =>{
                            response.data.map((val, key) =>{
                                tempList3[key] = {name:val.name, id:val.id}
                            })

                            setEmployeeListButton(tempList3)
                
                        }) 
                    }  
                    })
                }
              }
        })
        

        
    }
    useEffect(() =>{
        getEmployeeList(localStorage.getItem('YID'),localStorage.getItem('CID'));
    }, [])
    useEffect(() =>{
        console.log('ok')
        getEmployeeList(localStorage.getItem('YID'),localStorage.getItem('CID'));
        }, [popUpb])
    return (
        <div>
            <button onClick={() => setpopUpb(true)}>Add employees</button>
                
                {popUpb && employeeListButton.length? 
                (null)
                :
                (<div>  
                    <p>Employees:</p>
                    {employeeListButton.map((val, key) =>(
                        (localStorage.getItem('YID') === JSON.stringify(val.id) ? (
                            null
                        ):(
                            <Link to={`${val.name}`} key={key} ><button onClick={() => setEID(val.id)}>{val.name}</button></Link>
                        ))
                       
                    ))}
                </div>
                )}
            

            <PopUp trigger={popUpb} setTrigger={setpopUpb} refresh={() =>getEmployeeList()}>
              
            </PopUp>
        </div>
    )
}

export default Employees