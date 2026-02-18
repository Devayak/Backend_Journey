const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    caption:String,
    postUrl:{
        type:String,
        required:[true,"cannot be created without url"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"instausers",
        required:[true,"user not exist"]
    }
})

const postModel=mongoose.model("postImg",postSchema);

module.exports=postModel