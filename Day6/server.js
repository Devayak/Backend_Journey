const app=require("./src/app");
const mongoose=require("mongoose")
app.listen(3000,()=>{
    console.log('server is created...');
}) 

function connectToDb(){
    mongoose.connect("mongodb+srv://debasish:32YmghSLG4EbwLfO@cluster0.f01kdhu.mongodb.net/day-6")
.then(()=>{
    console.log('connected with database');
})
} //! to connect with database

connectToDb();
//database connection 