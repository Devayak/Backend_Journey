

const express=require('express')
const noteModel=require('./model/note.model')
const cors=require('cors')
const path=require('path')


const app=express()
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


app.post('/api/notes',async(req,res)=>{
    const{title,description}=req.body;
    const notes=await noteModel.create({
        title,description
    })
 
    res.status(201).json({
        message:'created successfully',
        notes
    })
})

app.get('/api/notes',async(req,res)=>{
    const note=await noteModel.find();

    res.status(200).json({
        message:'fetch is successful',
        note
    })
})

app.patch('/api/notes/:id',async(req,res)=>{
    const id=req.params.id;
    const{description}=req.body;
   await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:'update is done'
    })
})

app.delete('/api/notes/:id',async(req,res)=>{
    const id=req.params.id;
    await noteModel.findByIdAndDelete(id)

    res.status(204).json({
        message:'deleted'
    })
})

app.use('*name',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})


module.exports=app;