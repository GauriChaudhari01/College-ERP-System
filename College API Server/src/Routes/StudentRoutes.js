import express from "express"
import { createStudent, deleteStudent, fetchAllStudent, getStudentByCollege, updateStudent } from "../Controller/StudentController.js"
import { upload } from "../middleware/FileUpload.js"


let StudentRouter = express.Router()
StudentRouter.get("/fetchallstudent",fetchAllStudent)
StudentRouter.post("/createstudent",upload.single("StudentPhoto"),createStudent)
StudentRouter.put("/updatestudent",updateStudent)
StudentRouter.delete("/deletestudent",deleteStudent)
StudentRouter.get("/getstudbyclg",getStudentByCollege)

export {StudentRouter}