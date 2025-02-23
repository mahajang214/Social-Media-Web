const jwt = require("jsonwebtoken");

module.exports.protectedRoute = async (req, res, next) => {
  try {
    // console.log("set Cookie Headers received:",  res.getHeaders()); 
    // console.log("req Cookie received:", req.cookies);  // This logs the cookies sent with the request
     // This logs the cookies sent with the request
    const token = req.cookies.authToken;
  
    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }
  
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
    req.user = verifyToken;
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    res.status(401).json({ error: "Unauthorized user" });
  }
};
