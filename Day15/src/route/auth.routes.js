const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt")

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isRegistered = await userModel.findOne({ email });

  if (isRegistered) {
    return res.status(409).json({
      message: "user is already there",
    });
  }
  const hash = await bcrypt.hash(password,5)

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

    const paaword=await bcrypt.compare(password,user.password)
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

authRouter.post("/logout",async(req,res)=>{
  res.clearCookie("jwt_token",{
    httpOnly:true,//protection
    sameSite:"strict"// only for protection
  });
  res.status(200).json({
    message:"logged out"
  })
})
module.exports = authRouter;

/**
 * Difference between MD5 (fast hash) and bcrypt:
 *
 * In fast hashing algorithms like MD5, if two users
 * have the same password "12345", both will generate
 * the same hash:
 *
 * user-1 → 827ccb0eea8a706c4c34a16891f84e7b
 * user-2 → 827ccb0eea8a706c4c34a16891f84e7b
 *
 * This is insecure because attackers can use
 * precomputed hash tables (rainbow tables).
 *
 * bcrypt solves this by automatically adding a random
 * salt to each password before hashing.
 *
 * So even if two users have the same password,
 * bcrypt produces different hashes for each user,
 * making attacks extremely difficult.
 */
