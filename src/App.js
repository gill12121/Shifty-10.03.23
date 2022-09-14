import RegisterPage from "./Register"
import './App.css';
import React from 'react';
import Login from './Login'
import Home from './Home'
import { Route, Routes} from 'react-router-dom';
import CompanyPage from './CompanyPage'
import Permissions from './Permissions/Permissions'
import Employees from './Employees/Employees'
import EmployeePage from './Employees/EmployeePage'
import Shifts from './Shifts/Shifts'
import PermissionsEdit from './Permissions/PermissionEdit'


function App() {
  
  return (

      <div className="App">
       <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/Register" element={<RegisterPage/>}/>
          <Route exact path="/Home" element={<Home/>}/>       
          <Route exact path={'/company/:id'} element={<CompanyPage/>}/>   
          <Route exact path={'/company/:id/shifts'} element={<Shifts/>}/> 
          <Route exact path={'/company/:id/permissions'} element={<Permissions/>}/> 
          <Route exact path={'/company/:id/employees'} element={<Employees/>}/> 
          <Route exact path={'/company/:id/employees/:id'} element={<EmployeePage/>}/>
          <Route exact path={'/company/:id/permissions/:id'} element={<PermissionsEdit/>}/> 
        </Routes>
      </div>
    
      
  );
}

export default App;
