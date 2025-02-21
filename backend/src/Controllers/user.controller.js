const User = require("../Modals/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../../services");
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
    if (!email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    if (userLoginSecretKey) {
      try {
        const user = await User.find({ userLoginSecretKey });
        const token = jwt.sign({ _id: user._id }, secretKey);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ msg: "user Login successfully" });
        return;
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
      }
    }
    try {
      const user = await User.findOne({
        email,
      }).select(['password',"email","_id"]);
      // console.log("password : ",user.password);
      
      const comparePass =await bcrypt.compare(password, user.password);
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ msg: "user Login successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Something went wrong" });
    }
  },
  logout: async (req, res) => {
    try {
      const clear = res.clearCookie('token');
      res.status(200).json({ msg: "logout successful" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Something went wrong" });
    }
  },
  setProfilePic: async (req, res) => {
    const { profilePic } = req.body;
    // const userId = req.decode._id;
    try {
      const user = await User.find({ _id: userId });
      user.profilePic = profilePic;
      user.save();
      res.status(200).json({ msg: "profile pic successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "profile pic not error" });
    }
  }, // abi kaam baki he is ka multer apply nahi kiya he
  setLoginKey: async (req, res) => {
    // const decode=req.decode;
  

    console.log("req:",req);
    
    try {
      // const user = await User.findByIdAndUpdate({ _id: userId });
      // const createLoginSecret =  generateRandomString(20)// create random string of characters
      // const hashLoginSecret = bcrypt.hash(createLoginSecret, 20);
      // user.userLoginSecretKey = hashLoginSecret;
      // user.save();
      res.status(200).json({ msg: "Login secret key generated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Login secret is not generated" });
    }
  },
};
