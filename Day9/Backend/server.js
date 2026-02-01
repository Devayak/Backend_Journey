/*
    server ko suru karne ka file
    database se connect karna
*/
require('dotenv').config(); // to run the 
const app=require('./src/app')
const mongoose=require('mongoose')

const connectToDb=require("./src/config/database")

connectToDb() // that is imported from database.js file stored in src-> config folder

//post /notes
//request.body=>{title,description}
app.listen(3000,()=>{
    console.log('running on port 3000');
})
