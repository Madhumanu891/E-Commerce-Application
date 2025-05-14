const cartmodel= require("../models/cartmodel")
const {v4}=require("uuid")

let addcart=async(req,res)=>{
    try {
        let obj=await cartmodel.find({"uid":req.body.uid, "pid":req.body.pid})
        if(obj.length==0)
        {
            let data=new cartmodel({...req.body,"_id":v4()})
            await data.save()
        }
        else{
            await cartmodel.findByIdAndUpdate({"_id":obj[0]._id},{$inc:{"quantity":1}})
            res.json({message:"Product Quantity increased Successfully"})
        }
    } catch (error) {
           console.log(error)
    }
}

let getcart=async(req,res)=>{
    try {
        let data=await cartmodel.find({"uid":req.params.uid})
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

let increamentquantity=async(req,res)=>{
    try {
        await cartmodel.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"quantity":1}})
        res.json({message:"Product Quantity Increased"})
    } catch (error) {
        console.log(error)
    }
}

let decreamentquantity=async(req,res)=>{
    try {
        await cartmodel.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"quantity":-1}})
        res.json({message:"Products quantity Decreased"})
    } catch (error) {
        console.log(error)
    }
}

let deletecart=async(req,res)=>{
    try {
        await cartmodel.findByIdAndDelete({"_id":req.params.cid})
        res.json({message:"Product Deleted Succussfully"})
    } catch (error) {
        console.log(error)
    }
}

module.exports={addcart,getcart,increamentquantity,decreamentquantity,deletecart}