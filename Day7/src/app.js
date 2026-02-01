const express=require('express');
const noteModule = require('./models/notes.model');
const app=express()
app.use(express.json())


// app.post("/notes", async (req, res) => {
//     const { title, description, age } = req.body

//     const note = await noteModel.create({
//         title, description
//     })

//     res.status(201).json({
//         message: "Note created successfully",
//         note
//     })
// })

app.post('/notes',async (req,res)=>{
    const{title,description,age}=req.body;
    const note=await noteModule.create({
        title,description,age
    })
    res.status(201).json({
        message:"note created successfully",
        note
    })
})

app.get("/notes",async(req,res)=>{
    const fetchData=await noteModule.find()
    res.status(200).json({
        message:"data fetched successfully",
        fetchData
    })
})

module.exports=app