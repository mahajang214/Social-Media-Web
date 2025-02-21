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
};
