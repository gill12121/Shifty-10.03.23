const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'sqluser',
    host: 'localhost',
    password: 'password',
    database: 'shifty'
})
//Create a manager(owner first user) that is the register
app.post('/create', (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const permission = 'Owner'
    const phone = req.body.phone;
    const birthday = req.body.birthday


    db.query('INSERT INTO employee (name, username, password, email, permission, phone, birthday) VALUES (?,?,?,?,?,?,?)' ,
     [name,username,password,email,permission,phone,birthday] ,
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send("Values inserted")
        }
     })
})
// used to check if the username matches with the password used in login
app.post('/getpassword', (req, res) => {
    const username = req.body.username;

    db.query('SELECT * FROM shifty.employee where username = ? ',[username], (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})

//create a company used in pop up create company pop up
app.post('/createCompany', (req, res) => {
    const name = req.body.name;
    db.query('INSERT INTO company (name) VALUES (?)' ,
    [name] ,
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})

// connect a company with the owner that created it used after create company
app.post('/connectCompany', (req, res) => {
    const YID = req.body.YID;
    const CID = req.body.CID
    db.query('INSERT INTO employee_company (employee_id, company_id) VALUES (?,?)' ,
    [YID,CID] ,
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
// gets the company id to help connect the company with the owner 
app.post('/getCompanyid', (req, res) => {
    const name = req.body.name;
    db.query('SELECT * FROM shifty.company where name = (?) ', [name],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
// gets you all the company's ids that the manager is connected to used in home
app.post('/getAllCompanys', (req, res) => {
    const YID = req.body.YID;
    db.query('SELECT * FROM shifty.employee_company where employee_id = (?) ', [YID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
//gets all the company after get all company to get their detail and create a button used in home
app.post('/getCompanys', (req, res) => {
    const CIDTemp = req.body.CIDTemp;
    db.query('SELECT * FROM shifty.company where id  in (?) ', [CIDTemp],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
// get the list department to help the autocomplete used in create employee pop up
app.post('/getListDepartment', (req,res) =>{
    const CID = req.body.CID;
    db.query('SELECT department_type FROM shifty.department_type where company_id in (?)', [CID],
    (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
    })
})
// get the list location to help the autocomplete used in create employee pop up
app.post('/getListLocation', (req,res) =>{
    const CID = req.body.CID;
    db.query('SELECT location_type FROM shifty.location_type where company_id in (?)', [CID],
    (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
    })
})


//create an employee used in create employee pop up
app.post('/createEmployee', (req,res) =>{
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    const username = req.body.email
    const department = req.body.department
    const location = req.body.location
    const salary = req.body.salary
    const salary2 = req.body.salary2
    const permission = req.body.permission
    const phone = req.body.phone
    const birthday = req.body.birthday

    db.query('INSERT INTO employee (name, password, email,username, department, location, salary_time, salary, permission, phone, birthday) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    , [name, password, email,username, department, location, salary, salary2, permission, phone, birthday],
    (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
    })
})
// add a location to the company help the autocomplete used in create employee pop up
app.post('/setListLocation', (req,res) =>{
    const CID = req.body.CID;
    const location = req.body.location;

    db.query('INSERT INTO location_type (location_type, company_id) VALUES (?,?)', [location, CID],
    (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
    })
})
// add a department to the company help the autocomplete used in create employee pop up
app.post('/setListDepartment', (req,res) =>{
    const CID = req.body.CID;
    const department = req.body.department;

    db.query('INSERT INTO department_type (department_type, company_id) VALUES (?,?)', [department, CID],
    (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
    })
})
// add a detail_type to the company help the form to create employee used in create employee pop up
app.post('/setListDetail', (req,res) =>{
    const CID = req.body.CID;
    const detail_type = req.body.detail_type;
    const detail_value = req.body.detail_value;

    db.query('INSERT INTO detail_type (detail_type, detail_value, company_id) VALUES (?,?,?)', [detail_type,detail_value, CID],
    (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
    })
})
app.post('/setDetailDetail', (req,res) =>{
    const EID = req.body.EID;
    const detail_type = req.body.detail_type;
    const detail_value = req.body.detail_value;
    const detail_detail = req.body.detail_detail;

    db.query('INSERT INTO employee_detail (employee_id, detail_type, detail_value, employee_detail) VALUES (?,?,?,?)', [EID,detail_type,detail_value, detail_detail],
    (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
    })
})
// get the employee id with the email for connect after submit used in create employee pop up 
app.post('/getEmployeeid', (req, res) => {
    const email = req.body.email;
    db.query('SELECT id FROM shifty.employee where email = (?)', [email],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
app.post('/getEmployeeidWithName', (req, res) => {
    const name = req.body.name;
    db.query('SELECT id FROM shifty.employee where name = (?)', [name],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
app.post('/getEmployeeWithid', (req, res) => {
    const EID = req.body.EID;
    db.query('SELECT * FROM shifty.employee where id = (?)', [EID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
// connect the employee with the compny after submit used in create employee pop up
app.post('/connectEmployeeCompany', (req, res) => {
    const EID = req.body.EID;
    const CID = req.body.CID;

    db.query('INSERT INTO employee_company (employee_id, company_id) VALUES (?,?)', [EID,CID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
//get the detail from the db for the form to create employee
app.post('/getListDetail', (req, res) => {
    const CID = req.body.CID;

    db.query('SELECT * FROM shifty.detail_type where company_id in (?)', [CID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
// get all the employees-id in the company
app.post('/getEmployeeCompany', (req, res) => {
    const CID = req.body.CID;

    db.query('SELECT employee_id FROM shifty.employee_company where company_id in (?)', [CID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
app.post('/getEmployeeCompanybymanager', (req, res) => {
    const YID = req.body.YID;

    db.query('SELECT employee_id FROM shifty.manager_employee where manager_id in (?)', [YID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
// get the name of all the employees in the company
app.post('/getEmployeeCompanyList', (req, res) => {
    const employee_list = req.body.employee_list;

    db.query('SELECT * FROM shifty.employee where id in (?)', [employee_list],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
app.post('/connectEmployeeManager', (req, res) => {
    const MEID = req.body.MEID;
    const EEID = req.body.EEID

    db.query('INSERT INTO manager_employee (manager_id, employee_id) VALUES (?,?)', [MEID,EEID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
app.post('/getCCPermission', (req, res) => {
    const YID = req.body.YID;

    db.query('SELECT create_company FROM shifty.permission where employee_id in (?)', [YID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
app.post('/getCEPermission', (req, res) => {
    const YID = req.body.YID;

    db.query('SELECT create_employee FROM shifty.permission where employee_id in (?)', [YID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
app.post('/getELPermission', (req, res) => {
    const YID = req.body.YID;

    db.query('SELECT employee_list FROM shifty.permission where employee_id in (?)', [YID],
     (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
app.post('/setPermissionFirstUser', (req, res) =>{
    const YID = req.body.YID

    db.query('INSERT INTO permission (employee_id, create_company, create_employee, employee_list) VALUES (?,?,?,?)',
    [YID,1,1,1],
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
})
app.post('/setCompanyDefaultPermission', (req, res) =>{
    const CID = req.body.CID
    db.query('INSERT INTO permission_type (company_id, permission_type,rank_order, create_company, create_employee, employee_list) VALUES (?,"Owner",1,1,1,1),(?,"Manager",2,0,1,1),(?,"Employee",3,0,0,0)',
    [CID,CID,CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
    
})
app.post('/getListPermission', (req,res) =>{
    const CID = req.body.CID;
    db.query('SELECT * FROM shifty.permission_type where company_id in (?)', [CID],
    (err, result) =>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
    })
})
app.post('/getPermissionToNewUser', (req, res) =>{
    const permission = req.body.permission
    const CID = req.body.CID

    db.query('SELECT * FROM shifty.permission_type where permission_type in (?) and company_id in (?)',
    [permission, CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
app.post('/setPermissionToNewUser', (req, res) =>{
    const EID = req.body.EID
    const p1 = req.body.p1
    const p2 = req.body.p2
    const p3 = req.body.p3

    db.query('INSERT INTO permission (employee_id, create_company, create_employee, employee_list) VALUES (?,?,?,?)',
    [EID,p1,p2,p3],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            
        }
     })
    
})

app.post('/getWorkTimeWCID', (req, res) =>{
    const CID = req.body.CID

    db.query('SELECT * FROM shifty.work_time where company_id in (?)',
    [CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
app.post('/setWorkTimeWCID', (req, res) =>{
    const CID = req.body.CID

    db.query('INSERT INTO work_time (company_id, first_time) VALUES (?,0)',
    [CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
//sunday
app.post('/setFirstWorkTimeSun', (req, res) =>{
    const CID = req.body.CID
    const S = req.body.S
    const E = req.body.E
    const A = req.body.A
    db.query('UPDATE shifty.work_time SET sunday_start = (?), sunday_end = (?), sunday_active = (?) WHERE (company_id = ?);',
    [S,E,A,CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
//monday
app.post('/setFirstWorkTimeMon', (req, res) =>{
    const CID = req.body.CID
    const S = req.body.S
    const E = req.body.E
    const A = req.body.A
    db.query('UPDATE shifty.work_time SET monday_start = (?), monday_end = (?), monday_active = (?) WHERE (company_id = ?);',
    [S,E,A,CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
//tuesday
app.post('/setFirstWorkTimeTue', (req, res) =>{
    const CID = req.body.CID
    const S = req.body.S
    const E = req.body.E
    const A = req.body.A
    db.query('UPDATE shifty.work_time SET tuesday_start = (?), tuesday_end = (?), tuesday_active = (?) WHERE (company_id = ?);',
    [S,E,A,CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
//wednesday
app.post('/setFirstWorkTimeWed', (req, res) =>{
    const CID = req.body.CID
    const S = req.body.S
    const E = req.body.E
    const A = req.body.A
    db.query('UPDATE shifty.work_time SET wednesday_start = (?), wednesday_end = (?), wednesday_active = (?) WHERE (company_id = ?);',
    [S,E,A,CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
//thursday
app.post('/setFirstWorkTimeThu', (req, res) =>{
    const CID = req.body.CID
    const S = req.body.S
    const E = req.body.E
    const A = req.body.A
    db.query('UPDATE shifty.work_time SET thursday_start = (?), thursday_end = (?), thursday_active = (?) WHERE (company_id = ?);',
    [S,E,A,CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
//friday
app.post('/setFirstWorkTimefri', (req, res) =>{
    const CID = req.body.CID
    const S = req.body.S
    const E = req.body.E
    const A = req.body.A
    db.query('UPDATE shifty.work_time SET friday_start = (?), friday_end = (?), friday_active = (?) WHERE (company_id = ?);',
    [S,E,A,CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
//saturday
app.post('/setFirstWorkTimeSat', (req, res) =>{
    const CID = req.body.CID
    const S = req.body.S
    const E = req.body.E
    const A = req.body.A
    db.query('UPDATE shifty.work_time SET saturday_start = (?), saturday_end = (?), saturday_active = (?) WHERE (company_id = ?);',
    [S,E,A,CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
//test
app.post('/setFirstWorkTimeTest', (req, res) =>{
    const CID = req.body.CID
    const S = req.body.S
    const E = req.body.E
    const A = req.body.A
    const day =req.body.day
    db.query(`UPDATE shifty.work_time SET ${day}_start = (?), ${day}_end = (?), ${day}_active = (?) WHERE (company_id = ?);`,
    [S,E,A,CID, day],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
//change first time 
app.post('/setFirstWorkTimeFT', (req, res) =>{
    const CID = req.body.CID
    db.query('UPDATE shifty.work_time SET first_time = 1 WHERE (company_id = ?);',
    [CID],(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
     })
    
})
app.listen(3001, () => {
console.log("working");
});