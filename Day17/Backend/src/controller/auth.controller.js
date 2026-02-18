const userModel = require("../model/user.model");
// const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt")

async function register (req, res){
  const { username, email, password, bio, profileImage } = req.body;
  //   const validusername = await userModel.findOne({ username });
  //   if (validusername) {
  //     return res.status(409).json({
  //       message: "username is already exists!",
  //     });
  //   }
  //   const validEmail = await userModel.findOne({ email });
  //   if (validEmail) {
  //     return res.status(409).json({
  //       message: "Email is already exists!",
  //     });
  //   }

  const validUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (validUser) {
    return res.status(409).json({
      message: "username is already exists!",
    });
  }
  if (validUser) {
    return res.status(409).json({
      message: "Email is already exists!",
    });
  }
  // const hash = crypto.createHash("md5").update(password).digest("hex");
  const hash = await bcrypt.hash(password,10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWTSECRET
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "user registration done successfully",
    user,
  })
};

async function login(req, res) {
  const { email, password, username } = req.body;
  const user = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (!user) {
    return res.status(200).json({
      message: "user not exist",
    });
  }

 // // const hasPassword = await crypto.createHash('md5').update(password).digest('hex')
  const hasPassword=await bcrypt.compare(password,user.password)

  if (!hasPassword) {
    return res.status(409).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWTSECRET,
    { expiresIn: "1d" }
  );

  res.cookie("loginToken", token);

  res.status(200).json({
    message: "login done ",
    user: {
      username: user.username,
      password: user.password,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  })
};

async function logOut(req,res){
  const token=req.cookies.loginToken;
  if(!token){
    return res.status(404).json({
      message:"no one is logged in yet ! "
    })
  }
  console.log(token);
  res.clearCookie(token,{
    httpOnly:true,//protection
    sameSite:"strict"// only for protection
  })
  res.status(200).json({
    message:"logged out"
  })
}



module.exports={
    register,login,logOut
}