const mongoose=require("mongoose")

async function connectToDb() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected with database');
    
}
module.exports=connectToDb;