const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "this email already exits"], //! validation to check if the user's email is there in database or not

   match: [
    /^[^\@]+@gmail\.com$/,
    "Please enter a valid email address",
  ],
  },
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
