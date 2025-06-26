const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

//to create a task
router.post("/create-task", async (req, res) => {
  try {
    const {
      title,
      description,
      projecId,
      status,
    //   assignee,
      priority,
      endDate
    } = req.body;
    const task = new Task({
     title,
      description,
      projecId,
      status,
      endDate,
    //   assignee,
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
module.exports = router;
//
