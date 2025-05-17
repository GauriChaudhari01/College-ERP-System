import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Gender: { type: String },
  Designation: { type: String },
  MobileNo: { type: String },
  EmailId: { type: String },
  Education: { type: String },
  IsNetQualified: { type: String },
  IsSetQualified: { type: String },
  IsPhdQualified: { type: String },
  JoiningDate: { type: Date },
  EmpPhoto: { type: String },
  CollegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College"
  },
}, { timestamps: true });

//  Use existing model if already compiled to avoid OverwriteModelError
export const Employee = mongoose.models.employee || mongoose.model("employee", employeeSchema);
