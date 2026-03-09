const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  console.log(req.body);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully.",
    post,
  });
}

async function getPostController(req, res) {
  try {
    const user = req.user.id;
    const post = await postModel.find({
      user,
    });
    console.log(post);
    res.status(200).json({
      message: "fetched post of user loggedin successfully",
      post,
    });
  } catch (err) {
    res.status(401).json({
      message: "not found",
    });
  }
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  console.log(userId);
  const postId = req.params.postId;
  console.log(postId);

  const post = await postModel.findById(postId);
  console.log(post);

  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content.",
    });
  }

  return res.status(200).json({
    message: "Post fetched  successfully.",
    post,
  });
}

async function likePost(req, res) {
  const userName = req.params.username;
  const postId = req.params.postId;

  console.log("Looking for user:", req.params.username);

  console.log(postId, userName);

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post does't exist...",
    });
  }

  const isLiked = await likeModel.findOne({
    post: postId,
    user: userName,
  });

  console.log(isLiked);

  if (isLiked) {
    await likeModel.findByIdAndDelete(isLiked._id);
    await postModel.findByIdAndUpdate(
      postId,
      { $inc: { countLike: -1 } },
      { new: true }
    );

    return res.status(200).json({
      message: "Like removed successfully",
    });
  }

  const likePost = await likeModel.create({
    post: postId,
    user: userName,
  });

  await postModel.findByIdAndUpdate(
    postId,
    { $inc: { countLike: 1 } },
    { new: true }
  );

  res.status(200).json({
    message: "like successfully",
    likePost,
  });
}

const getFeedPosts = async (req, res) => {
  const user = req.user;
  const posts = await postModel.find({}).populate("user").lean();
  const postsWithIsLiked = await Promise.all(
    posts.map(async (post) => {
      const isLiked = await likeModel.findOne({
        post: post._id,
        user: user.userName,
      });
      return { ...post, isLiked: !!isLiked };
    })
  );
  res.status(200).json({
    message: "feed fetched successfully",
    post: postsWithIsLiked,
  });
};

// async function likePost(req, res) {
//     const userName = req.params.username;   // ✅ correct param
//     const postId = req.params.postId;

//     console.log("Post:", postId);
//     console.log("User:", userName);

//     // 1️⃣ Check if post exists
//     const post = await postModel.findById(postId);

//     if (!post) {
//         return res.status(404).json({
//             message: "Post does not exist"
//         });
//     }

//     // 2️⃣ Check if already liked
//     const isLiked = await likeModel.findOne({
//         post: postId,
//         user: userName   // ✅ match schema field
//     });

//     if (isLiked) {
//         return res.status(200).json({
//             message: "Post already liked"
//         });
//     }

//     // 3️⃣ Create like
//     const newLike = await likeModel.create({
//         post: postId,
//         user: userName   // ✅ correct field name
//     });

//     console.log(newLike);

//     res.status(201).json({
//         message: "Like successful",
//         like: newLike
//     });
// }
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePost,
  getFeedPosts,
};
