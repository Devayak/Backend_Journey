const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    age:Number,
    address:String,

})

const userModel=mongoose.model("userData",{userSchema})
module.exports=userModel;