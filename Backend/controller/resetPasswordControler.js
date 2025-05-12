const nodemailer=require("nodemailer")
const bcrypt=require("bcrypt")
const userModel=require("../models/usermodel")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "dhanavenimadhu21@gmail.com",
      pass: "bprtqzwrwjbqfqbd",
    },
  });

const sendotp=async(req,res)=>{
    try {
        let obj=await userModel.findById(req.params.uid)

        if(obj){
          let otp= Math.floor(Math.random()*99999+10000)
          await userModel.findByIdAndUpdate({"_id":obj._id}, {"otp":otp})
          const info = await transporter.sendMail({
            from: '"XYZ.com" <dhanavenimadhu21@gmail.com>',
            to: `${obj._id}`,
            subject: "OTP verification",
            text: `${otp}`, // plain‑text body
           // HTML body
          });
          res.json({"msg":"otp sent"})


        }else{
          res.json({message:"Check email"})
        }
    } catch (error) {
       res.json({message:"error in the otp generation"}) 
    }
}

let resetpassword=async(req,res)=>{
  try {
     let obj= await userModel.findById(req.body.uid)
     if(obj.otp==req.body.otp){
        let hashpassword= await bcrypt.hash(req.body.password,10)
        await userModel.findByIdAndUpdate({"_id":req.body.uid},{"password":hashpassword, "otp":""})
        res.json({message:"Password Reset Done"})
     }else{
        res.json({message: "Provide Valid OTP"})
     }
  } catch (error) {
    console.log(error)
    res.json({message: "Error Reset Password"})
  }
}

module.exports={sendotp,resetpassword}