const express=require("express")
const mongoose=require("mongoose")
const rt=require("./routes/routes")
const productRoutes= require("./routes/productroutes")
const cartRoutes=require("./routes/cartroutes")
const adminRoutes=require("./routes/adminroutes")
const bodyparser=require("body-parser")
const cors=require("cors")

mongoose.connect("mongodb://localhost:27017/Ecommerce-D1").then((res)=>{
    console.log("ok")
})
const app=express()

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use("/",rt)
app.use("/",productRoutes)
app.use("/",cartRoutes)
app.use('/images', express.static('P-images'));
app.use("/",adminRoutes)


app.listen(5000)
