const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(
      "mongodb+srv://debasish:JsgNsptbIfA4dn50@cluster0.wyl10bx.mongodb.net/day-10"
    )
    .then(() => {
      console.log("connected to database");
    });
};

module.exports = connectToDb;
