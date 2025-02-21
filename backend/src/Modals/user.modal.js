const mongoose = require("mongoose");
const Post = require("./post.modal");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      minlength: [3, "name must be 3 characters long"],
    },
    email: { type: String, require: true },
    password: {
      type: String,
      require: true,
      select: false,
      minlength: [8, "password must be 8 characters long"],
    },
    profilePic: { type: String, require: true },
    userLoginSecretKey: { type: String, select: false },
    follower: [{ type: String }],
    following: [{ type: String }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: Post }],
  },
  { timestamps: true }
);

const User = mongoose.model("user", schema);

module.exports = User;
