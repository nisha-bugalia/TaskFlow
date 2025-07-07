const express = require("express");
const router = express.Router();
const verifyIdentity = require("../middlewares/authMiddleware");
const Project = require("../models/Project");
const User = require("../models/User");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
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
    const projects = await Project.find({ admin: admin._id }).populate("admin", "fullName email");
    res.status(200).json({ message: "Successfully Sent", projects });
  } catch (err) {
    console.log(err);
  }
});
//api to delete the project
router.delete("/:id", verifyIdentity, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal Server Error",
    });
  }
});
//to edit the project
router.post("/edit", async (req, res) => {
  try {
    const { projectId, description,title,endDate,priority } = req.body;
    console.log(projectId)
    const project = await Project.findByIdAndUpdate(
       projectId ,
      { description,priority,endDate,title,projectId},
      {new:true}
    );
    console.log(project);
   
    res.status(200).json({ message: "Project Updated Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal Server Error",
      });
  }
});
//to save the files and store their path in the mongodb database
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     const projectId = req.query.projectId;

    if (!projectId) {
      return cb(new Error("Project ID is required"), false);
    }

    const dir = path.join(__dirname, "../uploads", projectId);

   
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });


const File = require("../models/File"); // ✅ import your model

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  const projectId = req.query.projectId;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileData = {
    fileName: file.originalname,
    savedAs: file.filename,
    fileUrl: `/uploads/${projectId}/${file.filename}`,
    type: file.mimetype,
    size: file.size,
    projectId,
  };

  try {
    const savedFile = await File.create(fileData);

    res.json({
      message: "File uploaded successfully",
      file: savedFile,
    });
  } catch (err) {
    console.error("DB Save Error:", err);
    res.status(500).json({ error: "Failed to save file to database" });
  }
});

//to get the files
router.get("/files/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const files = await File.find({ projectId });

    res.json({ files });
  } catch (err) {
    console.error("DB Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch files from database" });
  }
});
//to dowload the files

router.get("/download/:projectId/:fileName", (req, res) => {
  const { projectId, fileName } = req.params;

  const filePath = path.join(__dirname, "../uploads", projectId, fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath, fileName); 
});

module.exports = router;
