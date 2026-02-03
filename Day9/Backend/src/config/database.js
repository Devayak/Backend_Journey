const mongoose=require('mongoose')

const connectToDb=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected with database');
    })
}

module.exports=connectToDb