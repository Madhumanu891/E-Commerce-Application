const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    "_id":String,
    "name":String,
    "password":String,
    "role":String,
    "otp":String
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel