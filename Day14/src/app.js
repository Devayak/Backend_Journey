require('dotenv').config()
const express=require("express")
const userModel=require("./models/user.model")
const app=express()
const router=require("./route/auth.routes")
app.use(express.json())
const cookieParser=require('cookie-parser')

// app.post("/api/user",async(req,res)=>{
//     const{name,email,password}=req.body

//     const data=await userModel.create({
//         name,email,password
//     })

//     res.status(200).json({
//         messgae:"data created",
//         data
//     })
// })

app.use("/api/auth",router)
app.use(cookieParser)
module.exports=app;