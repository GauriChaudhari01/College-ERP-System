import { Admission } from "../Models/AdmissionSchema.js"
//add admission
let createAdmission = async(req,res)=>{
    let reqData= req.body
    console.log("Admission",reqData)
    try{
        let result = await Admission.create(reqData)
        res.status(200).json({
            data:result,
            message:"Admission Done Successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

//fetch all admission
let fetchAllAdmissions = async(req,res)=>{
    try{
        let result = await Admission.find()
        res.status(200).json(result)

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

// update admission


export { createAdmission,fetchAllAdmissions}