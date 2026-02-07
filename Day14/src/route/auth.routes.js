const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isRegistered = await userModel.findOne({ email });

  if (isRegistered) {
    return res.status(409).json({
      message: "user is already there",
    });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWTSECRET
  );

  res.cookie("jwt_token", token);
  res.status(200).json({
    message: "created",
    user,
    token,
  });
});


authRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    const user=await userModel.findOne({email})

    if(!user){
       return  res.status(200).json({
            message:'user is not registered'
        })
    }

    const paaword=user.password===crypto.createHash("md5").update(password).digest('hex')
    if(!paaword){
        return res.status(200).json({
            message:'incorrect password'
        })
    }

    const token=jwt.sign({
        userId: user._id,
    },process.env.JWTSECRET)
    res.cookie("loginToken",token)

    res.status(201).json({
        message:'login succesful'
    })
})


module.exports = authRouter;
