const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "post is required to be exist"],
    },
    user: {
      type: String,

      ref: "users",
    },
    
  },
  { timestamps: true }
);

likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = new mongoose.model("like", likeSchema);

module.exports = likeModel;
