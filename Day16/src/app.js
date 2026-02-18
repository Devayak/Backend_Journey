
const express=require("express")
const app=express();
const userModel=require('./model/user.model')




app.use(express.json())
module.exports=app