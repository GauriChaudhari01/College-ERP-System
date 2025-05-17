import mongoose from "mongoose";

let AdmissionSchema = mongoose.Schema({
    AdmissionDate:{type:Date},
    Course:{type:String},
    CourseYear:{type:String},
    AcademicYear:{type:String},
    CollegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"College"
    },
    StudentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }
},{timestamps:true})

export const Admission = mongoose.model("Admission",AdmissionSchema)