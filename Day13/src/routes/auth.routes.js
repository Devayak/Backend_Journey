const express = require("express");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const crypto = express.crypto();

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

  const hash = crypto.createHash("md5").update(password).digest("hex"); //! is used to create a hash for password
  const user = await userModel.create({
    name,
    password: hash,
    email,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWTSECRET
  );
  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "successfully created",
    user,
    token,
  });
});

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "user not exist! please register",
    });
  }

  const isLoggedIn =
    user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!isLoggedIn) {
    return res.status(401).json({
      message: "Invalid  password",
    });
  }

  const token = jwt.sign(
    {
      email: user._id,
    },
    process.env.JWTSECRET
  );
  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "successfully created",
    user,
    token,
  });
});

module.exports = authRoutes;

/*
  database beeze mean data is publically accesable 
  to overcome that we prefer to hash the password which means the password is changed fro simple text to a well-defined hash format 
  format of hasing
    1. if input is same then output will be same always,
    2. hashing is one directional means plain text to hah is possible
    but hash to normal is not possible
*/
