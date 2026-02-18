const jwt = require("jsonwebtoken");

const identifyUser=(req,res,next)=>{
    const token = req.cookies.loginToken;
  // console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "not authorized",
    });
  }
  let decode=null;
  try{
     decoded = jwt.verify(token, process.env.JWTSECRET)
}catch{
    return res.status(401).json({
        message:"user not authenticated"
    })
}
req.user=decoded;
next()
}
module.exports=identifyUser