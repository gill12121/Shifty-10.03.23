import React from 'react'
import {useState, useEffect} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'


const Permissions = () =>{
    const [listPermission, setListPermission] = useState([{}])
    const CID = localStorage.getItem('CID')

    const getPermissionList = () =>{
        var tempList = []
        Axios.post('http://localhost:3001/getListPermission', {CID:CID})
        .then((response) =>{
              response.data.map((val, key) =>{
                  tempList[key] = {p_type:val.permission_type,rank:val.rank_order, cc:val.create_company, ce:val.create_employee,
                    el: val.employee_list}
              })
              setListPermission(tempList.sort((a, b) => a.rank - b.rank))
        })
    }
    const deletePermission = () =>{

    }
    const CreatePermission = () =>{

    }
    useEffect(() =>{
        getPermissionList();
    }, [])


    return (
        <div>
            <h4>In this page you can customize your company's permissions </h4>
            <button>Create permissions</button>
            <br/><br/>
            {listPermission.map((val, key) =>(
                <nav key={key}>
                    {val.p_type === 'Owner' ? 
                    (<nav key={key}>
                        <p>{val.rank}</p>
                        <button disabled='disabled' key={key + 1}>{val.p_type}</button>
                    </nav>)
                    :
                    (<nav key={key}>
                        <p>{val.rank}</p>
                        <Link to={`${val.p_type}`} state={{type: val.p_type}}><button  key={key + 1}>{val.p_type}</button></Link>
                        <button onClick={deletePermission} key={-key - 1}>X</button>
                    </nav>)}
                    
                    <br/><br/>
                </nav>
            ))}

        </div>
    )

}

export default Permissions