import React from 'react'
import {useState, useEffect} from 'react'
import {YID} from '../Login'
import Axios from 'axios'
import { useLocation } from 'react-router-dom'

const PermissionEdit = () =>{
    const [listPermission, setListPermission] = useState([{}])
    const location = useLocation()
    const { type } = location.state
  
    /*const getPermissionList = () =>{
        var tempList = []
        Axios.post('http://localhost:3001/getPermissionToNewUser', {CID:CID})
        .then((response) =>{
              response.data.map((val, key) =>{
                  tempList[key] = {p_type:val.permission_type,rank:val.rank_order, cc:val.create_company, ce:val.create_employee,
                    el: val.employee_list}
              })
              setListPermission(tempList.sort((a, b) => a.rank - b.rank))
        })
    }
*/

    return (
        <div>
            <p>{}</p>
        </div>
    )

}

export default PermissionEdit