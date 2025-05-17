import express from "express"
import { createFee, fetchAllFees, fetchfeesummary, getFeeCount } from "../Controller/FeeController.js"

let FeeRouter = express.Router()
FeeRouter.post("/createfee",createFee)
FeeRouter.get("/fetchallfee",fetchAllFees)
FeeRouter.get("/fetchfeesummary",fetchfeesummary)
FeeRouter.get("/getfeecount",getFeeCount)

export{FeeRouter}
