const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");
console.log("User router loaded");
userRouter.post("/followers/:userName",identifyUser,userController.followersController)
console.log("User router loaded");
userRouter.patch("/followers/:id",identifyUser,userController.acceptFollowController)

module.exports = userRouter;
