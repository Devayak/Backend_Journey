const express=require("express")
const app=express()
app.use(express.json())

const notes=[]

app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.status(201).send("note created")
    console.log(req.body);

})

app.get("/notes",(req,res)=>{
    res.status(200).send(notes);
})

module.exports=app