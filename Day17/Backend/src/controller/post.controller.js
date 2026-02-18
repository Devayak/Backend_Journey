const postModel = require("../model/post.model");
const userModel = require("../model/user.model");
// import ImageKit,{toFile} from "@imageKit/nodejs"
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

// to store in cloud storage imageKit is one here passed key
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});

//! for post creation
async function postCreation(req, res) {
  // console.log(req.body,req.file);

  

  const user = await userModel.findById(req.user.id);
 
  // console.log(user);

  //? stored data in cloud storage i.e:-imageKit

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
    filename: "test",
    folder: "cohot-instagram",
  });

  const postData = await postModel.create({
    caption: req.body.caption,
    postUrl: file.url,
    user: req.user.id,
  });

  // res.send(file)

  res.status(200).json({
    message: "done ",
    postData,
  });
}
//! to check if user is logged and show all post done by that user
async function post(req,res){
  
  try{
    
 
    const user=req.user.id;
    const post=await postModel.find({
      user
    })
    console.log(post);
    res.status(200).json({
      message:'fetched post of user loggedin successfully',
      post
    })


  }catch(err){
    res.status(401).json({
      message:"not found"
    })

  }
}
//! to check if user is logged in that user  did the post then show 
async function postUser(req, res) {
 
  
  const user = await userModel.findById(req.user.id);
  req.user = user;
  
  console.log(user);

  
  const post = await postModel.findById(req.params.postId);
  console.log(post);
  if (!post) {
    return res.status(404).json({
      message: "post doesnot exist",
    });
  }
  if (post.user.toString() === req.user._id.toString()) {
    return res.status(200).json({
      message: "post is created by ",
      post,
    });
  } else {
    return res.status(403).json({
      message: "user  not found",
    });
  }
}
module.exports = {
  postCreation,
  postUser,
  post
};
