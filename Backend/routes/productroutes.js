const express=require("express")
const {upload,getAllProducts, addProduct, getbyid, addcomments, myproducts, editproduct, delproduct, getproduct, search}= require("../controller/productControler")

const rt=new express.Router()

rt.post("/addproduct",upload.single("image"),addProduct)
rt.get("/allproducts",getAllProducts)
rt.get("/getbyid/:pid",getbyid)
rt.post("/addcomment",addcomments)
rt.get("/myproducts/:uid",myproducts)
rt.put("/updateproduct/:_id",editproduct)
rt.delete("/deleteproduct/:_id",delproduct)
rt.get("/getproduct/:_id",getproduct)
rt.get('/search',search)


module.exports=rt