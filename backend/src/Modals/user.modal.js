const mongoose = require("mongoose");
const Post = require("./post.modal");

const schema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true, select: false },
    profilePic: { type: String, require: true },
    userLoginSecretKey: { type: String, select: false },
    follower:[{type:String}],
    following:[{type:String}],
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:Post}];
  },
  { timestamps: true }
);

const User = mongoose.model("user", schema);

module.exports = User;
