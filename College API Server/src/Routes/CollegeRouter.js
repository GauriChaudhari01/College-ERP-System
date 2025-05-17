import express from "express";
import { createCollege ,doLogin,fetchAllColleges, updateCollege} from "../Controller/CollegeController.js";
import { upload } from "../middleware/FileUpload.js";


let CollegeRouter = express.Router()
CollegeRouter.get("/fetchcollege", fetchAllColleges)
CollegeRouter.post("/createclg",upload.single("CollegePhoto"),createCollege) 
CollegeRouter.put("/updateclg",updateCollege)
CollegeRouter.post("/dologin",doLogin)

export  {CollegeRouter}