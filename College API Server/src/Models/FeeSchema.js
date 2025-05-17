import mongoose from "mongoose";

// student Id,Course,Course year,Total fee,paid fee,remaining fee,College Id

let FeeSchema = mongoose.Schema({
    StudentId:{type:mongoose.Schema.Types.ObjectId,
        ref:"Student"},
    Course:{type:String},
    CourseYear:{type:String},
    TotalFee:{type:Number},
    FeesPaid:{type:Number},
    RemainingFees:{type:Number},
    CollegeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"College"
        }

},{timestamps:true})
export const Fee = mongoose.model("Fee", FeeSchema)