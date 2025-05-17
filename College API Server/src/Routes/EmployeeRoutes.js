import express from"express";
import { createEmployee, fetchAllEmployee, getEmployeeByCollege } from "../Controller/EmployeeCotroller.js";
import { upload } from "../middleware/FileUpload.js"
let EmployeeRouter= express.Router()

EmployeeRouter.post("/createemployee",upload.single("EmpPhoto"),createEmployee)
EmployeeRouter.get("/fetchallemployee",fetchAllEmployee)
EmployeeRouter.post("/getemployeebyclg",getEmployeeByCollege)
export{EmployeeRouter}