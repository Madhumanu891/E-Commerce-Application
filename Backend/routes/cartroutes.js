const express=require("express")
const {addcart, getcart, increamentquantity, decreamentquantity, deletecart}=require("../controller/cartControler")

const rt=new express.Router()

rt.post("/addcart",addcart)
rt.get("/getcart/:uid",getcart)
rt.get("/inc/:cid",increamentquantity)
rt.get("/del/:cid",deletecart)
rt.get("/dec/:cid",decreamentquantity)

module.exports=rt