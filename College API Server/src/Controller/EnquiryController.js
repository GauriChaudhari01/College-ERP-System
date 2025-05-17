import { Enquiry } from "../Models/enquirySchema.js";

// Add Enquiry
let createEnquiry = async (req, res) => {
    let reqData = req.body;
    console.log("Enquiry", reqData);
    try {
        let result = await Enquiry.create(reqData);
        res.status(200).json({
            data: result,
            message: "Enquiry Added Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

// Fetch All enquiry
let fetchAllEnquiry = async (req, res) => {
    try {
        let result = await Enquiry.find();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

let getEnquiryByCollegeId = async (req, res) => {

    let { CollegeId } = req.body
    
    try {

        let result = await Enquiry.find({ CollegeId:CollegeId})
            .where("Status")
            .eq("Open")
        res.status(200).json({
            data: result,
            message: "get enquiry"
        })
    }
    catch (error) {
        res.status(500).json(error)

    }
}


//update enq
let updateEnquiry = async (req, res) => {
    let { EnquiryId, EnquiryStatus } = req.body
    try {
        let result = await Enquiry.findByIdAndUpdate({ _id: EnquiryId },
            { Status: EnquiryStatus },
            { new: true }
        )
        res.status(200).json({
            data: result,
            message: "Enquiry updated"
        })


    } catch (error) {
        res.status(500).json(error)
    }
}

export { createEnquiry, fetchAllEnquiry, getEnquiryByCollegeId, updateEnquiry }
