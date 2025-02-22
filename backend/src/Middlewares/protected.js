const jwt = require("jsonwebtoken");
module.exports.protectedRoute= async (req, res, next) => {
    try {
      // console.log(process.env.JWT_SECRET_KEY);
      console.log((req.cookies));
      const token =(req.cookies.token);
      if (!token) {
        res.status(401).json({ error: "token not found " });
      }

      const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY );
      req.user = verifyToken;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Unauthorise user" });
    }
  };
