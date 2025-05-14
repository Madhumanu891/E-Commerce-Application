const mongoose=require("mongoose")

const cartShema=new mongoose.Schema({
    "_id":String,
    "name":String,
    "price":String,
    "image":String,
    "uid":String,
    "pid":String,
    "quantity":Number
})

const cartmodel=mongoose.model("carts",cartShema)

module.exports=cartmodel