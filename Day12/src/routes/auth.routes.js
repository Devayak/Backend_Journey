const express = require("express");
const userModel = require("../model/user.model");
const jwt=require("jsonwebtoken")

const authRoutes = express.Router(); // we can move to other file mein api create then it is used expcpt app .js
//--- /api/auth/register
authRoutes.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  //! validation to check if the user's email is there in database or not
  const isUserAllreadyExist = await userModel.findOne({ email });

  if (isUserAllreadyExist) {
    return res.status(400).json({ 
      message: "email is there",
    });
  }
  const user = await userModel.create({
    name,
    password,
    email,
  });

  const token=jwt.sign({
    id:user._id,
    email:user.email,
  },
  process.env.JWTSECRET
)
res.cookie("jwt_token",token)
  res.status(201).json({
    message: "successfully created",
    user,
    token
  });
});

module.exports = authRoutes;
