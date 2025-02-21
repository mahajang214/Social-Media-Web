const Post = require("../Modals/post.modal");
const User = require("../Modals/user.modal");

module.exports = {
  sendUserInfo: async (req, res) => {
    const userId = req.decode._id;
    try {
      const user = await User.findOne({ _id: userId });

      res.status(200).json({ msg: "user data sended", user });
    } catch (error) {
      console.log(error);
      res.status(200).json({ error: "user data does not sended" });
    }
  },
  followUser: async (req, res) => {
    const followingId = req.params.id;
    const userId = req.user._id;
    try {
      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { following: followingId } },
        { new: true }
      );
      if (!user) {
        return res.status(500).json({ error: "user data is not updated" });
      }
      const followingUser = await User.findByIdAndUpdate(
        { _id: followingId },
        { $push: { follower: userId } },
        { new: true }
      );
      if (!followingUser) {
        return res.status(500).json({ error: "user data is not updated" });
      }
      res.status(200).json({ msg: "user is followed" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  sendPost: async (req, res) => {
    const recieverId = req.params.id;
    const userId = req.user._id;
    const {
      title,
      subTitle,
      senderName,
      image,
      video,
      captions,
      like,
      comments,
    } = req.body;
    try {
      const post = await Post.create({
        title,
        subTitle,
        senderName,
        image,
        video,
        captions,
        like,
        comments,
        user: userId,
      });
      if (!post) {
        return res.status(500).json({ error: "post is not created" });
      }
      const user = await User.findByIdAndUpdate(userId, {
        $push: { posts: post._id },
      });
      if (!user) {
        return res.status(500).json({ error: "user data is not updated" });
      }
      res.status(200).json({ msg: "post created successfully", post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "post is not created " });
    }
  },
};
