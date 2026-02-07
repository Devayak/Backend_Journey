const mongoose = require("mongoose");

const ModelSchema = mongoose.Schema({
  name: String,
  password: String,
  email: {
    type: String,
    unique: [true, "user already exist"],
    match:[/^[^\@]+@gmail\.com$/,"invalid input"]
  },
});

const userModel = mongoose.model("userData", ModelSchema);
module.exports = userModel;
