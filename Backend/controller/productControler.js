const productModel=require("../models/productmodel")
const {v4}= require("uuid")
const multer= require("multer")

const addProduct=async(req,res)=>{
    try {
        let newProduct= new productModel({...req.body, "_id":v4(), "image":req.file.filename})
        await newProduct.save()
        res.json({message:"Product Added Successfully"})
    } catch (error) {
        res.json({message:"Error in Product Adding"})
    }
}

const getAllProducts=async(req,res)=>{
    try {
        let data= await productModel.find({})
        res.json({data})
    } catch (error) {
        res.json({message:"Error in Products Getting"})
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './P-images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })


//   konowmore controllers

let getbyid=async(req,res)=>{
    try {
        let data = await productModel.findById(req.params.pid)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}
  

let addcomments=async(req,res)=>{
    try {
        await productModel.findByIdAndUpdate({"_id":req.body.pid},{$push:{"comments":req.body}})
        res.json({message:"Comment added"})
    } catch (error) {
        console.log(error)
    }
}
  const upload = multer({ storage: storage })


let myproducts=async(req,res)=>{
    try {
        let data= await productModel.find({"retailerId":req.params.uid})
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

let editproduct=async(req,res)=>{
    try {
        await productModel.findByIdAndUpdate({"_id":req.params._id},{...req.body})
        res.json({message:"Product Updated Successfully"})
    } catch (error) {
        console.log(error)
    }
}

let delproduct=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete({"_id":req.params._id})
        res.json({message:"Product Deleted Successfully"})
    } catch (error) {
        console.log(error)
    }
}

let getproduct=async(req,res)=>{
    try {
        let data=await productModel.findById({"_id":req.params._id})
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}



let search= async (req, res) => {
  const { query } = req.query;
  try {
    if (!query || query.trim() === "") {
      return res.status(400).json({ success: false, message: "Search query missing" });
    }

    const results = await productModel.find({
      name: { $regex: query, $options: 'i' }
    });

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Search route error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}


module.exports={addProduct,getAllProducts,upload,getbyid,addcomments,myproducts,editproduct,delproduct,getproduct,search}