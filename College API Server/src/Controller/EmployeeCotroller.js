import { Employee } from "../Models/EmployeeSchema.js";

// add employee

let createEmployee = async(req,res)=>{
    let reqData = req.body
    console.log("Employee",reqData)
    try{
        let filepath= req.file? req.file.path.replace("\\","/") : null;
        let result = await Employee.create({...reqData, EmpPhoto:filepath})
        res.status(200).json({
            data:result,
            message:"Employee Added Successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}


//fetch all Employee
let fetchAllEmployee = async(req,res)=>{
   try{
           let result = await Employee.find()
           res.status(200).json(result)
   
       }catch(error){
           console.log(error)
           res.status(500).json(error)
       }
}

// get employee by college

let getEmployeeByCollege = async (req,res)=>{
    let { CollegeId } = req.body
    try{
       let result =await Employee.find({CollegeId})
       res.status(200).json({
         data:result,
         message:"Employee Get"
    })
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

export{createEmployee,fetchAllEmployee,getEmployeeByCollege}