const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyIdentity = async (req, res, next) => {
  try {
    console.log("kd");
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Login" });
    }
    const decoded = jwt.verify(token, "12345");
    const email = decoded.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(402).json({ message: "Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
};
module.exports = verifyIdentity;
