import express from "express";
import { createAdmission, fetchAllAdmissions } from "../Controller/AdmissionController.js";

let AdmissionRouter = express.Router()
AdmissionRouter.get("/fetchalladmission", fetchAllAdmissions)
AdmissionRouter.post("/createadmission",createAdmission)

export {AdmissionRouter}