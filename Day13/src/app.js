const express=require('express')
const userModel=require("./model/user.model")
const authRoutes=require("./routes/auth.routes")
const cookiesParser=require('cookie-parser')



const app=express()
app.use(express.json())
app.use( cookiesParser())
app.use("/api/auth",authRoutes)// authrouter ke asth jitne bhi api create kiye hai if hume un api ko hit karna hai then we have to use "/api/auth" before it 
module.exports=app;