const express=require("express")
const mongoose=require("mongoose")
const rt=require("./routes/routes")
const productRoutes= require("./routes/productroutes")
const bodyparser=require("body-parser")

mongoose.connect("mongodb://localhost:27017/Ecommerce-D1").then((res)=>{
    console.log("ok")
})
const app=express()

app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use("/",rt)
app.use("/",productRoutes)

app.listen(5000)
