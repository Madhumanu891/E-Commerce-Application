const express=require("express")
const {register, login}= require("../controller/usercontroler")
const {resetpassword, sendotp}= require("../controller/resetPasswordControler")

let rt=new express.Router()

rt.post("/register",register)
rt.post("/login",login)
rt.post("/resetpassword",resetpassword)
rt.get("/sendotp/:uid",sendotp)

module.exports=rt