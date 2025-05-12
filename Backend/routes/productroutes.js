const express=require("express")
const {upload,getAllProducts, addProduct}= require("../controller/productControler")

const rt=new express.Router()

rt.post("/addproduct",upload.single("image"),addProduct)
rt.get("/allproducts",getAllProducts)

module.exports=rt