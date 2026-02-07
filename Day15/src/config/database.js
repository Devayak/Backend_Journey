const mongoose=require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://debasish:32YmghSLG4EbwLfO@cluster0.f01kdhu.mongodb.net/day-14").then(()=>{
        console.log("connected to databse");
    })
}

module.exports=connectToDb();