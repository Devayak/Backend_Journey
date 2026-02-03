const express = require("express");
const usersModel = require("./model/note.model");
const app = express();
app.use(express.json());
const cors = require("cors");
const path=require('path')
app.use(express.static('./public'))

app.use(cors());

app.post("/api/user", async (req, res) => {
  const { name, age, address, contact_No } = req.body;
  const userDetails = await usersModel.create({
    name,
    age,
    address,
    contact_No,
  });
  res.status(201).json({
    message: "created succesfully..",
    userDetails,
  });
});

app.get("/api/user", async (req, res) => {
  const userData = await usersModel.find();
  res.status(200).json({
    message: "fetch is done",
    userData,
  });
});

app.delete("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  const userData = await usersModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "delete is successful",
    userData,
  });
});

app.patch("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  const { age, address } = req.body;
  await usersModel.findByIdAndUpdate(id, { address, age });
  res.status(200).json({
    message: "update is done",
  });
});

app.use('*name',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','public','index.html'))
})
module.exports = app;
