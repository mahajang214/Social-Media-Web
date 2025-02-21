const jwt = require("jsonwebtoken");
module.exports = {
  protectedRoute: async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ error: "token not found " });
    }
    try {
      const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = verifyToken;
      // console.log(verifyToken);
      
      res.send(verifyToken);
      res.status(200).json({ msg: "Authorised user " });
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Unauthorise user" });
    }
  },
};
