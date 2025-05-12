const mongoose=require("mongoose")


const productSchema= new mongoose.Schema({
    "_id":String,
    "name":String,
    "description":String,
    "category":String,
    "price":String,
    "retailerId":String,
    "image":String,
    "comments":[]
})

const productModel=mongoose.model("products", productSchema)

module.exports=productModel
