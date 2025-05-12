const userModel = require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

let register=async(req,res)=>{
    try {
       let obj= await userModel.findById(req.body._id)
       if(obj){
        res.json({"message":"account Already Exists"})
       }else{
        let hashpassword= await bcrypt.hash(req.body.password,10)
        let newUser= new userModel({...req.body, "password":hashpassword})

        await newUser.save()
        res.json({message: "Account Created Successfully"})
       }
    } catch (error) {
        res.json({message: "Error in Registration"})
    }    
}


let login=async(req,res)=>{
    try {
        let obj= await userModel.findById(req.body._id)

        if(obj){

            let f= await bcrypt.compare(req.body.password, obj.password)
            if(f){
                res.json({"token":jwt.sign({"_id":obj._id},"1234"), "uid":obj._id, "name":obj.name, "role":obj.role})
            }else{
                res.json({message: "Check Password"})

            }

        }else{
        res.json({message: "Check Email"})
        }
    } catch (error) {
        res.json({message: "Error in Login"})
    }
}

module.exports={register, login}