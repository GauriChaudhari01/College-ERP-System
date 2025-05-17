import express from "express";
import { createEnquiry, fetchAllEnquiry, getEnquiryByCollegeId, updateEnquiry } from "../Controller/EnquiryController.js";

let EnquiryRouter = express.Router()
EnquiryRouter.post("/createenquiry",createEnquiry)
EnquiryRouter.get("/fetchallenquiry",fetchAllEnquiry)
EnquiryRouter.post("/getenqbyclg",getEnquiryByCollegeId)
EnquiryRouter.put("/updateenquiry",updateEnquiry)



export {EnquiryRouter}