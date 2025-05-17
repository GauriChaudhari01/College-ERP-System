import mongoose from "mongoose";
let StudentSchema = mongoose.Schema({
    Name: { type: String },
    Address: { type: String },
    MobiileNo: { type: Number },
    DateOfBirth: { type: Date },
    City: { type: String },
    State: { type: String },
    Pincode: { type: String },
    Category: { type: String },
    EmailID: { type: String },
    Password: { type: String },
   AadharNo: { type: String },
   Gender:{type:String},
    // DocumentSubmitted: [{ type: String }],
    Course: { type: String },
    CourseYear: { type: String },
    AcademicYear: { type: String },
    StudentPhoto: { type: String },
    CollegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College"
    },
    // EnquiryId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"Enquiry"
    // }

}, { timestamps: true })
export const Student = mongoose.model("Student", StudentSchema)