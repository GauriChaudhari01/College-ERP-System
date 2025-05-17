import { Admission } from "../Models/AdmissionSchema.js";
import { Enquiry } from "../Models/enquirySchema.js";
import { Student} from "../Models/StudentSchema.js";

//Add Student
let createStudent = async (req, res) => {
  let reqData = req.body;
  console.log("Student Data:", reqData);
  try {
        let filepath= req.file.path.replace("\\","/")
    let student = await Student.create({
      ...reqData, 
      StudentPhoto: filepath,
    });

    // Create Admission data
    let admissionData = await Admission.create({
      StudentID: student._id,
      Course: reqData.Course,
      CourseYear: reqData.CourseYear,
      AcademicYear: reqData.AcademicYear,
      CollegeId: reqData.CollegeId
    });

    // Close the enquiry if enquiryId exists
    if (reqData.enquiryId) {
      await Enquiry.findByIdAndUpdate(
        { _id: reqData.enquiryId },
        { Status: "Closed" }
      );
    }

    // Send success response with student and admission data
    res.status(200).json({
       student: student,                    
      admissionData: admissionData,        
      message: "Student Added Successfully",
    });
  } catch (error) {
    console.log("Error while adding student:", error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};


//fetch all Student
let fetchAllStudent = async(req,res)=>{
    try{
        let result= await Student.find().populate("CollegeId")
        res.status(200).json(result)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

//update Student
let updateStudent= async (req,res)=>{
    try{
    let {StudentID,Class}=req.body
    let result= await Student.findByIdAndUpdate({_id:StudentID},
        {Class:Class},
        {new:true})
        res.status(200).json({
            data:result,
            message:"Student Class Updated"
        })
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }

}

//Delete Student 
let deleteStudent = async(req,res)=>{
    try{
        let {StudentID}=req.body
        let result =await Student.findByIdAndDelete({_id:StudentID})
        res.status(200).json({
            message:"Student Deleted"
        })
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

let getStudentByCollege = async (req, res) => {
    let { CollegeId } = req.body
    try {
        let result = await Student.find({ CollegeId })
        res.status(200).json({
            data: result,
            message: "Student get"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
let getstudentAdmissionsbycollege=async(req,res)=>{
    // let {collegeId}=req.body
    try {
       const result = await Admission.aggregate([
  {
    $lookup: {
      from: "students", // collection name in MongoDB (usually plural and lowercase)
      localField: "studentId",
      foreignField: "_id",
      as: "student"
    }
  },
  {
    $unwind: "$student"
  },
  {
    $project: {
      _id: 0,
      Name: "$student.Name",
      Address:"$student.Address",
      Gender:"$student.Gender",
      DateOfBirth:"$student.DOB",
      City:"$student.City",
      District:"$student.District",
      State:"$student.State",
      Pincode:"$student.Pincode",
      Category:"$student.Category",
      Password:"$student.Password",
      EmailId: "$student.EmailId",
      MobileNo: "$student.MobileNo",
      AadharNo:"$student.AadharNo",
      Photo:"$student.Photo",
      Course: 1,
      CourseYear: 1,
      AcademicYear: 1
    }},
 
  
]);
    res.status(200).json({
        data:result,
        message:"studen fetch"
    })
 } catch (error) {
         res.status(500).json(error)
         console.log(error)
    }

}
export {createStudent,fetchAllStudent,updateStudent,deleteStudent,getStudentByCollege,getstudentAdmissionsbycollege}