/**
 * how database is to be connected
 */

const mongoose=require("mongoose")
function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected with database');
    })
}

module.exports=connectToDb