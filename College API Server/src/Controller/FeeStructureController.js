import { FeeStructure } from "../Models/FeeStructureSchema.js";

// add feestructure

let createfeeStructure = async(req,res)=>{
    let reqData = req.body
    console.log("FeeStructure",reqData)
    try{
        let result= await FeeStructure.create(reqData)
        res.status(200).json({
            data:result,
            message:"Fee Structure Added Succesfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}



// fetch all feeStructure
let fetchFeeStructure = async(req,res)=>{
    try{
        let result = await FeeStructure.find()
        res.status(200).json(result)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

// getfeeStructureBYCourse
let getFeeStructureByCourse = async (req, res) => {
  try {
    const { CollegeId, Course, CourseYear } = req.body

    let result = await FeeStructure.findOne({ CollegeId })
      .where("Course").eq(Course)
      .where("CourseYear").eq(CourseYear);

    res.status(200).json({
      data: result,
      message: "get FeeStructure"
    })
  } catch (error) {
    res.status(500).json(error);
  }
}

//getfeebycollege
let getFeeByCollege = async (req,res)=> {
  let {CollegeId}= req.body
  try{
let result= await FeeStructure.find({CollegeId})
res.status(200).json(result)
  }catch(error){
res.status(500).json(error);
}
}
  export {createfeeStructure ,fetchFeeStructure,getFeeStructureByCourse,getFeeByCollege}
