const mongoose=require("mongoose")
const userModel = require("./user.model")


const followSchema=new mongoose.Schema({
     following:{
        type:String
    },
   followers:{
        type:String
    },
    status:{
        type:String,
        ref:"user",
        request_Status:["pending","accepted"],
        default:"pending"

    },
    followCount:{
        type:Number,
        default:0
        
    }
},
    {timestamps:true
})


const followModel=mongoose.model('follows',followSchema)

module.exports=followModel