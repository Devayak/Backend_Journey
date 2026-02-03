const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  address: String,
  age: Number,
  contact_No: Number,
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
