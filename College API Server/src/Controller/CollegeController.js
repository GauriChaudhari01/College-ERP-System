import { College } from "../Models/CollegeSchema.js";
import bcrypt from "bcryptjs";
//Add College
let createCollege = async (req, res) => {
    let reqData = req.body
    console.log("college", reqData)
    console.log("Received req.body:", req.body);

    try {
        let salt = await bcrypt.genSalt(10)
        let encryptedPassword = await bcrypt.hash(reqData.Password, salt)

        let result = await College.create({ ...reqData, Password: encryptedPassword })
        res.status(200).json({
            data: result,
            message: "College Added Succesfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

//fetch all college
let fetchAllColleges = async (req, res) => {
    try {
        let result = await College.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
// update college
let updateCollege = async (req, res) => {
    try {
        let { collegeID, isBlock } = req.body
        let result = await College.findByIdAndUpdate({ _id: collegeID },
            { isBlock: isBlock },
            { new: true })
        res.status(200).json({
            data: result,
            message: "College isBlock Updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

//do login ch Logic
let doLogin = async (req, res) => {
    try {
        let { EmailId, Password } = req.body
        let logedCollege = await College.findOne({ EmailId })
        console.log("Fetched College From DB", logedCollege)

        if (!logedCollege) {
            return res.status(400).json({
                message: "College Not Registered"
            })
        }

        let isValidPassword = await bcrypt.compare(Password, logedCollege.Password)
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        return res.status(200).json({
            data: logedCollege,
            message: "Login Successful"
        })
    } catch (error) {
        console.log("Login Error: ", error)
        res.status(500).json({ message: "Internal Server Error", error })
    }

}

export { createCollege, fetchAllColleges, updateCollege, doLogin }