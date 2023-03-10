import {useState, useEffect} from "react"
import Axios from 'axios'
import React from 'react';
import PopUp from './Popup/CreateCompanyPopUp.js'
import { Link } from "react-router-dom";
export var List =[];
export var url ="/none"

const Home = () =>{
  const [popUpb, setpopUpb] = useState(false)
  const CIDTemp = [0]
  const [CCPermission, setCCPermission] = useState(0)
  const [companyList, setCompanyList] = useState([{}])
  const setCID = (CID) =>{
    localStorage.setItem('CID' , JSON.stringify(CID))
  }
  const getCompanyList = () =>{
    Axios.post('http://localhost:3001/getAllCompanys',{YID:localStorage.getItem('YID')})
  .then((response) =>{
    response.data.map((val, key) =>{
      CIDTemp.push(val.company_id)
    })
  
    Axios.post('http://localhost:3001/getCompanys',{CIDTemp:CIDTemp})
    .then((response) =>{
      
      setCompanyList(response.data)   
    })
  }) 
  }

  useEffect(() =>{
    Axios.post('http://localhost:3001/getCCPermission',{YID:localStorage.getItem('YID')})
    .then((response) =>{
      if(response.data.length){
        setCCPermission(response.data[0].create_company)
      }
      
    })
    getCompanyList();
    
  }, [])
  useEffect(() =>{
    getCompanyList();
    }, [popUpb])

    return(
        
        <div >
          <nav>
            <p>Create your company</p>
            {CCPermission === 0 ? ('')
             : (<button onClick={() => setpopUpb(true)}>Add company</button>)}
            <div> 
              {companyList.length ? (
                companyList.map((val, key) =>(  
                  <Link to={`/company/${val.name}`} key={key }><button key={key } onClick={() => setCID(val.id)} >{val.name}</button></Link>)))
                :
                (<p>you have no companies</p>)}
              
            </div>
            <PopUp trigger={popUpb} setTrigger={setpopUpb}>
              
            </PopUp>
          </nav>
          

          
        </div>
        
    )
}

export default Home;