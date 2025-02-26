const mongoose = require("mongoose");
const User = require("./user.modal");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    captions: { type: String },
    image: { type: String },
    video: { type: String },
    senderName: {
      type: String,
      required: true,
    },
    like: [{ type: String }],
    comments: [{ type: Object }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userPic: { type: String, required: true }
  },
  { timeStamps: true }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
