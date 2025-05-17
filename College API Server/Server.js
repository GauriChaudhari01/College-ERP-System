import express from "express";
import bodyParser from "body-parser";
import { connectToDatabase } from "./src/DB/dbConnection.js";
import { CollegeRouter } from "./src/Routes/CollegeRouter.js";
import { EnquiryRouter } from "./src/Routes/EnquiryRoutes.js";
import { StudentRouter } from "./src/Routes/StudentRoutes.js";
import { AdmissionRouter } from "./src/Routes/AdmissionRoutes.js";
import { FeeStructureRouter } from "./src/Routes/FeeStructureRoutes.js";
import { FeeRouter } from "./src/Routes/FeeRoutes.js";
import { EmployeeRouter } from "./src/Routes/EmployeeRoutes.js";
import cors from "cors"
import { OverviewRouter } from "./src/Routes/OverviewRoutes.js";
//create a serevvr variable
let Server = express()
Server.use(bodyParser.json())
Server.use(cors())


//call the database
connectToDatabase()
Server.get("/",(req,res)=>{
    res.send("Helooo guys...")

})
//connect routes with server
Server.use("/api", CollegeRouter)
Server.use("/api",EnquiryRouter)
Server.use("/api",StudentRouter)
Server.use("/api",AdmissionRouter)
Server.use("/api",FeeStructureRouter)
Server.use("/api",FeeRouter)
Server.use("/api",EmployeeRouter)
Server.use("/api",OverviewRouter)


Server.use("/UploadImages",express.static("UploadImages"))

//start the server
Server.listen(5000,()=>{ 
    console.log("Server Started")
})


