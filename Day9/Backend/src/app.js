/**
 * server ko create
 */
const cors=require('cors')
const express=require('express')
const noteModule=require('./models/note.model');
const app=express();
app.use(express.json());
app.use(cors())

app.post('/api/notes',async(req,res)=>{
    const{title,description}=req.body;
    const newNotes=await noteModule.create({title,description})
    res.status(201).json(newNotes)
})

app.get('/api/notes',async(req,res)=>{
    const fetchData=await noteModule.find();
    res.status(200).json({
        message:'fetched successfully',
        fetchData
    })
})


app.delete('/api/notes/:id',async(req,res)=>{
    const id=req.params.id;
    await noteModule.findByIdAndDelete(id);
    res.status(200).json({
        message:"succesfully deleted."
    })
})

app.patch('/api/notes/:id',async(req,res)=>{
    const id=req.params.id;
    const {description}=req.body;
    await noteModule.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:'successfully updated'
    })
})
module.exports=app