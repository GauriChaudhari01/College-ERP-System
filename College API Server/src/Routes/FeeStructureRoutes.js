import express from "express";
import { createfeeStructure, fetchFeeStructure, getFeeByCollege, getFeeStructureByCourse } from "../Controller/FeeStructureController.js";

let FeeStructureRouter= express.Router()
FeeStructureRouter.post("/createfeestructure",createfeeStructure)
FeeStructureRouter.get("/fetchallfeestructure",fetchFeeStructure)
FeeStructureRouter.post("/getfeestructuctbycourse",getFeeStructureByCourse)
FeeStructureRouter.post("/getfeebycollege",getFeeByCollege)
export {FeeStructureRouter}