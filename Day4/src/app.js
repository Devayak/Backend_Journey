/* 
    -- server creation
    -- server configration
*/


const express=require("express")
const app=express()

app.use(express.json())

const notes=[]
app.post("/notes",(req,res)=>{
    // console.log(req.body);
    notes.push(req.body)
    res.send("note created")

})

app.get("/notes",(req,res)=>{
    res.send(notes)
})



//delete

app.delete("/notes/:index",(req,res)=>{
    // console.log(req.params.index);
    delete notes[req.params.index]
    res.send("deleted succesfully")

})

//patch is to update the partial node means some part

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description
    res.send("note is updated")
})


// put method is to update the entire node
app.put("/notes/:index",(req,res)=>{
    notes[req.params.index]=req.body 
    res.send("notes page is updated")
})







module.exports=app