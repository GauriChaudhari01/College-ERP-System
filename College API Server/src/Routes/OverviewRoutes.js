import express from "express";
import { getDashboardCounts } from "../Controller/OverviewController.js";
let OverviewRouter = express.Router()
OverviewRouter.get("/getdashboardcount",getDashboardCounts)


export {OverviewRouter}