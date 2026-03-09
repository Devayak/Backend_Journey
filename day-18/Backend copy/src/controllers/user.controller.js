const followModel = require("../models/follow.model"); //model of follow
const userModel = require("../models/user.model");

const user = require("../models/user.model");

async function followersController(req, res) {
  const followingUsername = req.user.userName; // who did login is the following user doing follow action
  const followeeUserName = req.params.userName; // to whom follow req is send is followee

  // console.log(followeeUserName, followingUsername);

  const isUserExist = await userModel.findOne({
    username: followeeUserName,
  });

  //! check user exist or not
  if (!isUserExist) {
    return res.status(200).json({
      messgae: "user doesnot exist",
    });
  }
  //! check following and followee is not same user

  if (followingUsername == followeeUserName) {
    return res.status(403).json({
      message: "following user and followe  same is not  allowed",
    });
  }

  //! check follow request is not send to the same user again if already following

  const isFollowed = await followModel.findOne({
    followers: followeeUserName,
    following: followingUsername,
  });

  if (isFollowed) {
    return res.status(403).json({
      message: ` ${followeeUserName} is allready followed by ${followingUsername}`,
      isFollowed,
    });
  }

  const follow = await followModel.create({
    following: followingUsername,
    followers: followeeUserName,
    status: "pending",
  });

 

  // const isAccepted = await followModel.findOneAndUpdate(
  //   {
  //     followers: followeeUserName,
  //     following: followingUsername,
  //   },
  //   { status: "accepted" },
  //   { new: true }
  // );
  // console.log(isAccepted);

  console.log(follow);
  res.status(200).json({
    message: `you are following ${followeeUserName}`,
    follow: follow,
  });
}

async function acceptFollowController(req, res) {
  const followId = req.params.id;

  const isAccepted = await followModel.findByIdAndUpdate(
    followId,
    { status: "accepted" },
    { new: true }
  );

  //! to be solved

   await followModel.findByIdAndUpdate(
    followId,
    { $inc: { followCount: +1 } },
    { new: true }
  );

  if (!isAccepted) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  res.status(200).json({
    message: "Follow request accepted",
    data: isAccepted,
  });
}
module.exports = { followersController, acceptFollowController };
