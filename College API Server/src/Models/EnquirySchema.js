import mongoose from "mongoose";
let EnquirySchema = mongoose.Schema({

    Name:{type:String},
    MobileNo:{type:Number},
    EmailID:{type:String},
    Adress:{type:String},
    City:{type:String},
    State:{type:String},
    Pincode:{type:Number},
    Status:{type:String},
    CollegeId: {type: mongoose.Schema.Types.ObjectId, 
    ref: "College"  }
     
},{timestamps:true})
export const Enquiry = mongoose.model("Enquiry",EnquirySchema)