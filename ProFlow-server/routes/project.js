const express = require("express");
const router = express.Router();
const verifyIdentity = require("../middlewares/authMiddleware");
const Project = require("../models/Project");
const { findOne } = require("../models/User");
const User = require("../models/User");
const { verify } = require("jsonwebtoken");

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
    const { email, id } = req.body;
    let user;
    if (!email && !id) {
      return res.status(400).json({ message: "Fill first" });
    } else {
      if (email) {
        user = await User.findOne({ email });
      } else {
        user = await User.findOne({ _id: id });
      }
    }
    console.log(user);
    if (user === null) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({
      message: "User Added Successfully",
      id: user._id,
      email: user.email,
      name: user.fullName,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
});
//to save the project
router.post("/save-project", verifyIdentity, async (req, res) => {
  const admin = req.user;
  const { members, title, description, priority } = req.body;
  console.log(members);
  const teamMembers = members.map((member) => member.id);
  await new Project({
    teamMembers,
    title,
    admin: admin._id,
    description,
    priority,
  }).save();
  res.status(200).json({ message: "Project saved Successfully" });
});
//api to get the all the project in the frontend
router.get("/get-projects", verifyIdentity, async (req, res) => {
  try {
    const admin = req.user;
    const projects = await Project.find({ admin: admin._id });
    res.status(200).json({ message: "Successfully Sent", projects });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
