const mongoose=require("mongoose")
function connectToDb(){
    mongoose.connect('mongodb+srv://debasish:32YmghSLG4EbwLfO@cluster0.f01kdhu.mongodb.net/day-7')
    .then(()=>{
        console.log('connected with database');
    })
}

module.exports=connectToDb