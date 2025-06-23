const express = require("express");
const router = express.Router();
const verifyIdentity = require("../middlewares/authMiddleware");
const Project = require("../models/Project");
const { findOne } = require("../models/User");
const User = require("../models/User");

//to create a project
router.post("/create-project", verifyIdentity, async (req, res) => {
  try {
    const { title, description } = req.body;
    const admin = req.user._id;
    const project = new Project({
      title,
      description,
      admin,
    });
    await project.save();
    return res.status(200).json({ message: "Project Created Successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        process.env.NODE_ENV === "developmet"
          ? error.message
          : "Internal Server error",
    });
  }
});
//to check for the existing users
router.post("/check-user", async (req, res) => {
  try {
    const { email } = req.body;
    if(!email){
      return res.status(400).json({message:"Fill E-mail first"
      })
    }
    console.log(email);
    const user = await User.findOne({ email });
    console.log(user);
    if (user===null) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "User Added Successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
});
//
module.exports = router;
