import React from 'react'
import {useState, useEffect} from "react"
import Axios from 'axios'
import Autocomplete from '../autocomplete/Autocomplete'
import MultiAutocomplete from '../autocomplete/MultiAutocomplete'
import AddDetail from './AddDetail'
export var detailDetail =[]
const CreateCompanyPopUp = (props) =>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [department, setDepartment] = useState('')
    const [birthday, setBirthday] = useState('')
    const [manager, setManager] = useState([])
    const [employee ,setEmployee] = useState([])
    const [employeeList ,setEmployeeList] = useState([])
    const [permission, setPermission] = useState('')
    const [salary, setSalary] = useState('')
    const [salary2, setSalary2] = useState(0)
    const [listDepartment, setListDepartment] = useState([''])
    const [listLocation, setListLocation] = useState([''])
    const [listPermission, setListPermission] = useState([''])
    const [detailArr, setDetailArr] = useState([])
    const [detailArrNew, setDetailArrNew] = useState([])
    const [detailType, setDetailType] = useState([])
    const [detailHeadLine, setDetailHeadLine] = useState('')
    const [popUpb, setpopUpb] = useState(false)


    const CID = window.location.href.replace('http://localhost:3000/company/', '').replace('/employees','')
    const getDepartmentList = () =>{
        var tempList = []
        var i = 0
        Axios.post('http://localhost:3001/getListDepartment', {CID:CID})
        .then((response) =>{
              response.data.map((val) =>{
                  tempList[i] = val.department_type
                  i++
              })
              setListDepartment(tempList)
        })
    }
    const getLocationList = () =>{
        var tempList = []
        var i = 0
        Axios.post('http://localhost:3001/getListLocation', {CID:CID})
        .then((response) =>{
              response.data.map((val) =>{
                  tempList[i] = val.location_type
                  i++
              })
              setListLocation(tempList)
        })
        
    }
    const getPermissionList = () =>{
        var tempList = []
        var i = 0
        Axios.post('http://localhost:3001/getListPermission', {CID:CID})
        .then((response) =>{
              response.data.map((val) =>{
                  tempList[i] = val.permission_type
                  i++
              })
              setListPermission(tempList)
        })
        
    }
    const getDetailList = () =>{
        var tempList = []
        //var i = 0
        Axios.post('http://localhost:3001/getListDetail', {CID:CID})
        .then((response) =>{
              response.data.map((val, key) =>{
                  tempList[key] = {type:val.detail_type, value:val.detail_value, id:'' }
                  detailDetail[key] = {type:val.detail_type, value:val.detail_value, detail:'' }
              })
              setDetailArr(tempList)
        })
    }
    const getEmployeeList = () =>{
        var tempList = []
        var tempList2 =[]
        var tempList3 = [{}]

        Axios.post('http://localhost:3001/getEmployeeCompany', {CID:CID})
        .then((response) =>{
            response.data.map((val) =>{
                tempList.push(val.employee_id)
            })
            Axios.post('http://localhost:3001/getEmployeeCompanyList', {employee_list:tempList})
            .then((response) =>{
                response.data.map((val, key) =>{
                   tempList2[key] = val.name
                   tempList3[key] = {name:val.name, id:val.id}
                })
                setEmployeeList(tempList2)
                
            })
           
        })
    }




    const ChangeDetail = (id, checked, detail) =>{
        detailDetail[id].detail = detail
        if(detailDetail[id].type === 'checkbox'){
            detailDetail[id].detail = checked
        }
    }
    useEffect(()=>{
        getDepartmentList();
        getLocationList();
        getDetailList();
        getEmployeeList();
        getPermissionList();
    },[])
    useEffect(() =>{
        console.log("render")
     
    })
    const Submit = () =>{
        

        Axios.post('http://localhost:3001/createEmployee',
         {name:name, password:password, email:email,username:email,
        department:department, location:location,salary:salary, salary2:salary2,
        permission:permission, phone:phone, birthday:birthday})
        .then(() =>{
            Axios.post('http://localhost:3001/getEmployeeid', {email:email})
            .then((response) =>{
                if(listPermission.includes(permission)){
                    Axios.post('http://localhost:3001/getPermissionToNewUser',{permission:permission, CID:CID})
                    .then((res) =>{
                        Axios.post('http://localhost:3001/setPermissionToNewUser',
                        {EID:response.data[0].id, p1:res.data[0].create_company, p2:res.data[0].create_employee
                        , p3:res.data[0].employee_list})
                    })
                }else{
                    Axios.post('http://localhost:3001/setPermissionToNewUser',
                        {EID:response.data[0].id, p1:0, p2:0
                        , p3:0})
                }
                Axios.post('http://localhost:3001/connectEmployeeCompany',{EID:response.data[0].id,CID:CID})
                
                detailDetail.map((val,key) =>{
                    if(val.type ==="checkbox" && val.detail === ''){
                        Axios.post('http://localhost:3001/setDetailDetail',{EID:response.data[0].id,detail_type:val.type,
                        detail_value:val.value, detail_detail:'0'})
                    }else{
                        Axios.post('http://localhost:3001/setDetailDetail',{EID:response.data[0].id,detail_type:val.type,
                        detail_value:val.value, detail_detail:val.detail})
                    }
                })
                if(employee.length){
                    employee.map((val,key) =>{
                        Axios.post('http://localhost:3001/getEmployeeidWithName', {name:val})
                        .then((res) =>{
                            Axios.post('http://localhost:3001/connectEmployeeManager', {MEID:response.data[0].id, EEID:res.data[0].id})
                        })
                    
                    })
                }
                if(manager.length){
                    manager.map((val,key) =>{
                        Axios.post('http://localhost:3001/getEmployeeidWithName', {name:val})
                        .then((res) =>{
                            Axios.post('http://localhost:3001/connectEmployeeManager', {MEID:res.data[0].id, EEID:response.data[0].id})
                        })
                
                    })
                }
             })
        })
        
       if(listLocation.includes(location)){
       }else if(location.length){

        Axios.post('http://localhost:3001/setListLocation', {location:location, CID:CID})
        .then(() =>{
            getLocationList();
        })
       }


       if(listDepartment.includes(department)){
       }else if(department.length){
            Axios.post('http://localhost:3001/setListDepartment', {department:department, CID:CID})
            .then(() =>{
                getDepartmentList();
            })
        }
        if(detailArrNew.length){
            detailArrNew.map((val,key) =>{
                Axios.post('http://localhost:3001/setListDetail', {detail_type:val.type,detail_value:val.value,CID:CID})
                
           })
           
       }
       
    
       props.setTrigger(false)
    }
   
  
      return(props.trigger) ? (
        <div className="ccpu1">
          <div className="ccpu_inner1">
            <button className="ccpu_close1" onClick={() => props.setTrigger(false)}>close</button>
            <p>Employee name: </p>
            <input type="text"  onChange={(event) => {setName(event.target.value)}}></input>
            <p>Employee email: </p>
            <input type="email" onChange={(event) => {setEmail(event.target.value)}}></input>
            <p>Employee password: </p>
            <input type="text" onChange={(event) => {setPassword(event.target.value)}}></input>
            <p>Employee phone: </p>
            <input type="text" onChange={(event) => {setPhone(event.target.value)}}></input>
            <p>Employee department: </p>
            <Autocomplete  suggestions={listDepartment} setP={setDepartment} />
            <p>Employee location: </p>
            <Autocomplete suggestions={listLocation} setP={setLocation} />
            <p>Employee salary:</p>
            <Autocomplete suggestions={['Hourly', 'Daily', 'Weekly', 'Monthly', 'Annually']}
            setP={setSalary}/>
            <p>How much: </p>
            <input type='number' onChange={(event) => {setSalary2(event.target.value)}}></input>
            <p>Employee permission:</p>
            <Autocomplete suggestions={listPermission} setP={setPermission}/>
            <p>Employee birthday: </p>
            <input type="date" onChange={(event) => {setBirthday(event.target.value)}}></input>

            <p>Employees</p>
            <MultiAutocomplete  suggestions={employeeList} setP={setEmployee} p={employee} setEL={setEmployeeList} 
            getEL={employeeList}/>
            {employee.length ? (
                <div>
                <p>employee</p>
                <p>{employee} </p>
                </div>
            ):(null)}
            <p>Managers</p>
            <MultiAutocomplete  suggestions={employeeList} setP={setManager} p={manager} setEL={setEmployeeList} 
            getEL={employeeList}/>
            {manager.length ? (
                <div>
                <p>manager</p>
                <p>{manager} </p>
                </div>
            ):(null)}
            <br/>
            <button  onClick={() => setpopUpb(true)}>Add detail</button>
            <AddDetail trigger={popUpb} setTrigger={setpopUpb} setDT={setDetailType} setDHL={setDetailHeadLine} 
                setDArr={setDetailArr} getDHL={detailHeadLine} getDArr={detailArr} setDArrN={setDetailArrNew}>

            </AddDetail>
             {(detailArr.length ? (
                 
                detailArr.map((item, i ) =>(
                        <div key={i}>
                            <p>{item.value}:</p>
                            <input
                            id={i}
                            key={i}
                            type={item.type}
                            onChange={(event) => ChangeDetail( event.target.id, event.target.checked,event.target.value)}
                            
                            />
                        </div>
                      
                ))
             ):(
                 
                ''
             ))}
            <button onClick={Submit}>submit</button>
            {props.children}
          </div>
        </div>
      ) : ""
    }
  
    export default CreateCompanyPopUp