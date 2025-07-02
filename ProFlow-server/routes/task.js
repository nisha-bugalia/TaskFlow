const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const verifyIdentity = require("../middlewares/authMiddleware");
const Project = require("../models/Project");
const User = require("../models/User");

//to create a task
router.post("/create-task", async (req, res) => {
  try {
    let {
      title,
      description,
      projectId,
      status,
      assignee,
      priority,
      endDate
    } = req.body;
    assignee=await User.findOne({username:assignee})
    const task = new Task({
     title,
      description,
      projectId,
      status,
      endDate,
      assignee:assignee._id,
      priority,
    });
    await task.save();
    return res.status(200).json({data:task ,message: "Task Created Successfully" });
  } catch (error) {
    return res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server error",
    });
  }
});
//get-tasks
router.post("/get-tasks", async (req, res) => {
  try {
   const {projectId}=req.body;
    const tasks = await Task.find({ projectId });
    res.status(200).json({ message: "Successfully Sent", tasks });
  } catch (err) {
    console.log(err);
  }
});

//get-all-tasks of all projects of an admin
router.get("/get-all-tasks", verifyIdentity, async (req, res) => {
  try {
    const admin = req.user;

    const projects = await Project.find({ admin: admin._id });

    const projectIds = projects.map((project) => project._id);

    const tasks = await Task.find({ projectId: { $in: projectIds } }).populate("projectId", "title");

    res.status(200).json({ message: "Successfully Sent", tasks });
  } catch (err) {
    console.error("Error in get-all-tasks:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
});

module.exports = router;
//
