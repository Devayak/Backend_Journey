const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.static("./Public"));
app.use(express.json());
app.use(cors());
const userModel = require("./model/note.model");

app.post("/api/users", async (req, res) => {
  const { name, age, address, contact_No } = req.body;
  const userDetails = await userModel.create({
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

app.get("/api/users", async (req, res) => {
  const userData = await userModel.find();
  res.status(200).json({
    message: "fetch is done",
    userData,
  });
});

app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const deletedData = await userModel.findByIdAndDelete(id);
  res.status(204).json({
    message: "deleted",
    deletedData,
  });
});

app.patch("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const { address, age } = req.body;
  const updatedData = await userModel.findByIdAndUpdate(id, { address, age });
  res.status(201).json({
    message: "updated",
    updatedData,
  });
});

// app.use('*name',(req,res)=>{
//    res.sendFile(path.join(__dirname,"..","/Public/index.html"))
// })
// module.exports = app;

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname,"..","/Public/index.html"))
});
module.exports=app;
