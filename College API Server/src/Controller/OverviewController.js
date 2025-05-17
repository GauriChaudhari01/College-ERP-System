import { Employee } from "../Models/EmployeeSchema.js";
import { Enquiry } from "../Models/enquirySchema.js";
import { Student } from "../Models/StudentSchema.js";


let getDashboardCounts = async (req, res) => {
  try {
    const [employeeCount, enquiryCount, studentCount] = await Promise.all([
      Employee.countDocuments(),
      Enquiry.countDocuments(),
      Student.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        Employee: employeeCount,
        Enquiry: enquiryCount,
        Student: studentCount,
      },
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch counts",
      error: error.message,
    });
  }
};

export {getDashboardCounts}