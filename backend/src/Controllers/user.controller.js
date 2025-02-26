const dotenv = require("dotenv");
dotenv.config();
const User = require("../Modals/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { secretKey } = require("../../services");
const { generateRandomString } = require("../Utilities/utils");
module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    try {
      const hashPass = await bcrypt.hash(password, 10);
      // console.log("hash password : ",hashPass);

      const user = await User.create({
        name,
        email,
        password: hashPass,
      });
      if (!user) {
        res.status(400).json({ error: "User is not created" });
        return;
      }
      user.save();
      res.status(200).json({ msg: "user created successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Something went wrong" });
    }
  },
  login: async (req, res) => {
    const { email, password, userLoginSecretKey } = req.body;
    if (userLoginSecretKey) {
      try {
        const user = await User.find({ userLoginSecretKey });
        console.log("userLogin key");

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
        res.cookie("authToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        console.log("Set-Cookie header:", res.getHeaders()['set-cookie']);
        res.status(200).json({ msg: "user Login successfully" });
        return;
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
        return;
      }
    }
    if (!email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    try {
      const user = await User.findOne({
        email,
      }).select(["password", "email", "_id"]);
      const comparePass = bcrypt.compare(password, user.password);
      const authToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      // console.log("authToken: ", authToken);

      res.cookie("authToken", authToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/",
        secure: false
      });
      // console.log("Set-Cookie header:", res.getHeaders()['set-cookie']);
      return res.status(200).json({ msg: "user Login successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Something went wrong" });
    }
  },
  logout: async (req, res) => {
    try {
      const clear = res.clearCookie("token");
      return res.status(200).json({ msg: "logout successful" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Something went wrong" });
    }
  },
  setProfilePic: async (req, res) => {
    // const { profilePic } = req.body;
    const uploadProfile = req.file ? `/UsersProfilePic/${req.file.filename}` : null;

    const userId = req.user._id;
    try {
      const user = await User.findByIdAndUpdate({ _id: userId }, { profilePic: uploadProfile }, { new: true });
      // user.profilePic = uploadProfile;
      // user.save();
      res.status(200).json({ msg: "profile pic successful", uploadProfile });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "profile pic not error" });
    }
  }, // abi kaam baki he is ka multer apply nahi kiya he
  setLoginKey: async (req, res) => {
    const userId = req.user._id;

    // console.log("req:",req.user._id);

    try {
      const createLoginSecret = generateRandomString(20); // create random string of characters
      const hashLoginSecret = await bcrypt.hash(createLoginSecret, 20);
      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { userLoginSecretKey: hashLoginSecret },
        { new: true }
      );
      if (!user) {
        return res.status(500).json({ error: "user data is not updated" });
      }
      // user.save();
      // console.log("hash : ", hashLoginSecret);
      return res
        .status(200)
        .json({ msg: "Login secret key generated", hashLoginSecret });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Login secret is not generated" });
    }
  },
  setInputs: async (req, res) => {
    const userId = req.user._id;
    const { name, bio } = req.body;
    try {
      const user = await User.findByIdAndUpdate({ _id: userId }, { name, bio }, { new: true });

      res.status(200).json({ msg: "inputs updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "inputs is not updated" });
    }
  }
}
