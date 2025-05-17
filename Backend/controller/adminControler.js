const userModel=require("../models/usermodel")

let allusers=async(req,res)=>{
     try {
         let data=await userModel.find({})
         console.log(data)
         res.json(data)
     } catch (error) {
        res.json(error)
     }
}

let deleteuser=async(req,res)=>{
    try {
        await userModel.findByIdAndDelete({"_id":req.params._id})
        res.json({message:"User Deleted Successfully"})
    } catch (error) {
        console.log(error)
    }
}

module.exports={allusers,deleteuser}