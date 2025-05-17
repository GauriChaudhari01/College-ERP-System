import mongoose from "mongoose";
let CollegeSchema = mongoose.Schema({
   Name:{type:String},
   EmailId:{type:String},
   Password:{type:String},
   Address:{type:String},
   City:{type:String},
   District:{type:String},
   State:{type:String},
   Pincode:{type:Number},
   Type:{type:String},
   NAACGrade:{type:String},
   CollegePhoto:{type:String},
   isBlock:{type:Boolean,default:false}
      
},{timestamps:true})
export const  College = mongoose.model("College",CollegeSchema)