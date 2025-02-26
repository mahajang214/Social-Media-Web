const Post = require("../Modals/post.modal");
const User = require("../Modals/user.modal");
const multer=require('multer');
const path =require('path');
const crypto=require('crypto');
module.exports = {
  sendUserInfo: async (req, res) => {
    const userId = req.decode._id;
    try {
      const user = await User.findOne({ _id: userId });

      res.status(200).json({ msg: "user data sended", user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "user data does not sended" });
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
    const userId = req.user._id;
    try {
      const imageUrl = req.file ? `/Upload_Data/${req.file.filename}` : null;
      
      // const userprofilepic = await User.findById({_id:userId}).profilePic;
      

      const post = await Post.create({
        title: req.body.title,
        subTitle: req.body.subTitle,
        senderName: req.body.senderName,
        image: imageUrl,
        captions: req.body.caption,
        user: userId,
        userPic:req.body.upic
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
  getAllPosts: async (req, res) => {
    try {
      const allposts = await Post.find({});
      res.status(200).json({ msg: "all post founded", allposts });
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "all posts are not founded" });

    }
  },
  likePost: async (req, res) => {
    const userId = req.user._id;
    const { likedPostId } = req.params.id;
    try {
      const findLikePost = await Post.findByIdAndUpdate({ _id: likedPostId }, {
        $push: { like: userId }
      });
      if (!findLikePost) {
        res.status(500).json({ error: "like is not worked " });
      }
      res.status(200).json({ msg: "liked post successfully" });



    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "like is not working" });
    }
  },
  unlikePost: async (req, res) => {
    const userId = req.user._id;
    const { unlikePost } = req.params.id;
    try {
      const findLikePost = await Post.findByIdAndUpdate({ _id: unlikePost }, {
        $pull: { like: userId }
      });
      if (!findLikePost) {
        res.status(500).json({ error: "Un-like is not worked " });
      }
      return res.status(200).json({ msg: "Un-liked post successfully" });


      // res.status(200).json({ msg: "Multer works perfectly"  });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Un-like is not working" });
    }
  },
  commentOnPost: async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params.id;
    const { commentData, name } = req.body;
    try {
      const commentPost = await Post.findByIdAndUpdate({ _id: postId }, {
        $push: { comments: { text: commentData, commentedBy: name } }
      });
      if (!commentPost) {
        res.status(500).json({ error: "comment " });
      }
      return res.status(200).json({ msg: " comment is successfull",commentPost });



    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "comment is not working" });
    }
  },

};
