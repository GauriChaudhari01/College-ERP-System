import mongoose from "mongoose";

let FeeStructureSchema = mongoose.Schema({

    Course:{type:String},
    CourseYear: {type: String},
    TuitionFee: {type: Number},
    CollegeDevelopmentFund: {type: Number},
    AdmissionFee: {type: Number},
    AlumniAssociationFee: {type: Number},
    AshwamedhFee: {type: Number},
    ComputerizationFee: {type: Number},
    DisasterManagementFee: {type: Number},
    ESuvidhaFee: {type: Number},
    EligibilityFee: {type: Number},
    FlagFund: {type: Number},
    GatheringFee: {type: Number},
    GreenEnergyFee: {type: Number},
    GymkhanaFee: {type: Number},
    IdentityCardFee: {type: Number},
    LibraryFee: {type: Number},
    MagazineFee: {type: Number},
    MedicalFee: {type: Number},
    MiscellaneousFee: {type: Number},
    NSSSelfFinanceUnit: {type: Number},
    PoorStudentAidFee: {type: Number},
    PersonalityDevelopmentCareerCounselingFee: {type: Number},
    RegistrationFee: {type: Number},
    StudentActivityFee: {type: Number},
    StudentGroupInsurance: {type: Number},
    TrainingPlacementFee: {type: Number},
    TutorialInternalExamFee: {type: Number},
    VivekanandFee: {type: Number},
    DressCodeFee: {type: Number},
    ExamFee: {type: Number},
    IndustrialVisitFee: {type: Number},
    FarewellFresherFee: {type: Number},
    TotalFee: {type: Number},
    CollegeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"College"
        }

},{timestamps:true})

export const FeeStructure = mongoose.model("FeeStructure",FeeStructureSchema)