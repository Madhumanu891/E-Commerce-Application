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
  
  const upload = multer({ storage: storage })

module.exports={addProduct,getAllProducts,upload}