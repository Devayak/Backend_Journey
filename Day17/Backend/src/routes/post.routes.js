const express = require("express");
const postController = require("../controller/post.controller");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const indetifyUser=require("../middleware/post.miidleware");
const identifyUser = require("../middleware/post.miidleware");

//giving two objects in upload of multer is not allowed so if we want to give folder name then we must use diskStorage  and by default the data file is stored in disk storage but it depends on how we call it if we use {dest:"/upload"} then disk and if multer() then it use memory but if we want to use memmoryStorage use

postRouter.post("/", upload.single("postImg"),identifyUser, postController.postCreation)
postRouter.get("/postData",identifyUser,postController.post)
postRouter.get("/postUser/:postId",identifyUser,postController.postUser)
// //! for single file and in post.routes use req.file()
//multiple file
//?upload files with different file type then and in post.route use req.files()

// postRouter.post("/",upload.fields([
//     { name: "profile", maxCount: 1 },
//     { name: "resume", maxCount: 1 },
//     { name: "aadharCard", maxCount: 1 },
//   ]),postController.postCreation
// );

//? //?upload files with same file type then and in post.route use req.files()
// postRouter.post("/", upload.array("postImg", 5), postController.postCreation);

// postRouter.post("/", upload.none(), postController.postCreation);

module.exports = postRouter;


//! multer accepts an option basica is dest which say the destination where the file is to be store in system device(disk) if it is omit then file is stored in memmory and not in disk

/*

  Why .any() is Risky

Because:

No field validation

No structure validation

Accepts unlimited file types

Can be abused easily
*/

/*
Safe Usage of .any()

If you use it:

✔ Use it only on specific route
✔ Add file size limits
✔ Add file type filter
✔ Always handle file properly
*/
//? 
// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// use it when we dont know the file name in before
//dynamic file upload 
// otherwise preffer single,array,fields

//! limits: { fileSize: 5 * 1024 * 1024 }, // 5MB we can also add limit file size
//! filefilter is used to decide which file we can store and which we can skip 

//? syntax
//  fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);   // store image
//     } else {
//       cb(null, false);  // skip non-image
//     }
//   }

//? error throw according to filefilter
//  return cb(new Error("Only images allowed"));

//? syntax
// fileFilter: (req, file, cb) => {
//   if (!file.mimetype.startsWith("image/")) {
//     return cb(new Error("Only images allowed"));
//   }
//   cb(null, true);
// }