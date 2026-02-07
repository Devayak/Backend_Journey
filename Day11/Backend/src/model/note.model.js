const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
  name: String,
  address: String,
  age: Number,
  contact_No: Number,
});

const userModel = mongoose.model("users", modelSchema );
module.exports = userModel;
