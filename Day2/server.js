const express=require("express")

const app=express() // server instance create

//! program to send response on user request
app.get('/',(req,res)=>{
    res.send('Hello server is running')
})

app.listen(3000) // server start karna , here we assign the port no so that the os will understand it
// for one port  will be assign to one server request
// for some changes in program if we want to do autostart of the server then use npx nodemon