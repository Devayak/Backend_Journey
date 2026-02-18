const express = require("express");
const userModel = require("../model/user.model");
const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authController=require("../controller/auth.controller")
authRouter.post("/register", authController.register
);

authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logOut);





// authRouter.get("/profile", authController.authMiddleware, async(req, res) => {
// const user =  await userModel.findById(req.user.id)
// if(!user){
//     return res.status(200).json({
//         message:'user not found'
//     })
// }
//   res.status(200).json({
//     message: "Profile fetched successfully",
//     user: {
//       username: user.username,
//       email: user.email,
//       bio:user.bio,
//     },
//   });
// });


module.exports = authRouter;
