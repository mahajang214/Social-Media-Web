const Message = require("../Modals/message.modal");
const User = require("../Modals/user.modal");

module.exports = {
  getUsers: async (req, res) => {
    const userId = req.user._id;
    try {
      const users = await User.find({ _id: { $ne: userId } }).select(['_id',"name","email","follower","following","posts","bio",,"profilePic"]);
      res.status(200).json({ msg: "all users sended", users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "all users sended" });
    }
  },
  sendMessage: async (req, res) => {
    const { text, image } = req.body;
    const userId = req.user._id;
    const reciever = req.params.id;
    // console.log("reciever id : ",req.params.id);
    
    try {
      const findReciever = await User.find({ _id: reciever });
      if (!findReciever) {
        return res.status(404).json({ error: "user not found" });
      }
      const newMessage = await Message.create({
        from: userId, 
        to: reciever,
        text,
        image: image ? image : null,
      });
      res.status(200).json({ msg: "message sent", newMessage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "message sent" });
    }
  },
  getMessages: async (req, res) => {
    const userId = req.user._id;
    const reciever = req.params.id;
    try {
      const messages = await Message.find(
      {  $or:[{ from: userId, to: reciever }, { from: reciever, to: userId }]}
      );
      res.status(200).json({ msg: "all messages founded", messages });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "messages not found" });
    }
  },
  userdata:async (req,res) => {
    const userId=req.user._id;
    try {
      const user=await User.findOne({ _id: userId }).select(['_id',"name","email","follower","following","posts","bio","userLoginSecretKey","profilePic","createdAt"]);
      res.status(200).json({ msg: "user data", user });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "user data" });
        }
    
  }
};
