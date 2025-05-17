import { Fee } from "../Models/FeeSchema.js"

//Add fee
let createFee = async(req,res)=>{
    let reqData= req.body
    console.log("Fee",reqData)
    try{
        let result = await Fee.create(reqData)
        res.status(200).json({
            data:result,
            message:"Fees Added"
        })
        }catch(error){

            console.log(error)
        res.status(500).json(error)
        }
}

// fetch all fee

let fetchAllFees = async(req,res)=>{
    try{
        let result = await Fee.find()
        res.status(200).json(result)
    }catch(error){

        console.log(error)
        res.status(500).json(error)
    
    }
}

//fetch FEE Summary
let fetchfeesummary = async(req,res)=>{
    try{
        const result = await Fee.aggregate([
  {
    $group: {
      _id: null,
      totalFeeSum: { $sum: "$TotalFee" },
      feesPaidSum: { $sum: "$FeesPaid" },
      remainingFeesSum: { $sum: "$RemainingFees" }
    }
  }
]);

res.status(200).json(result)

    }catch(error){
        res.status(500).json(error)
        console.log(error)

    }
}
//get fee count
let getFeeCount = async (req, res) => {
  try {
    const count = await Fee.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json(error);
  }
};

let getFeeByCollege = async (req,res)=>{
  let {CollegeId} =req.body
  try{
       let result= await Fee.find({CollegeId})
       .populate("StudentId","Name")
       res.status(200).json({
        data:result,
        message:"Fee Get"
       })
  }catch(error){
    res.status(500).json(error)
  }
}

export {createFee, fetchAllFees , fetchfeesummary ,getFeeCount,getFeeByCollege}