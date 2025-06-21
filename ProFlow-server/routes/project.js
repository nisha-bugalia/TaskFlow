const express = require("express");
const router = express.Router();
const verifyIdentity = require("../middlewares/authMiddleware");
const Project = require("../models/Project");

//to create a project
router.post("/create-project", verifyIdentity, async (req, res) => {
  try {
    
    const { title, description } = req.body;
    const  admin  = req.user._id;
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
module.exports=router
