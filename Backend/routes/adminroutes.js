const express=require("express")
const {allusers, deleteuser}=require("../controller/adminControler")

const rt=new express.Router()

rt.get("/allusers",allusers)
rt.delete("/deleteuser/:_id",deleteuser)


module.exports=rt