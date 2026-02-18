
const mongoose=require("mongoose")
const connectToDatabase=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('connected with server');
    })
}

module.exports=connectToDatabase