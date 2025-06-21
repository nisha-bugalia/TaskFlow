const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const connect = require("../ProFlow-server/config/db");
const userRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
const cookieParser = require("cookie-parser");

app.use(cookieParser()); // ✅ This enables reading req.cookies.token

connect();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Backend is Running");
});
//For user related api
app.use("/user", userRoutes);
//For project related api
app.use("/project", projectRoutes);
// static file serving
app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("image"), async (req, res) => {
  const filePath = req.file.path;
  const form = new FormData();
  form.append("image", fs.createReadStream(filePath));

  try {
    const response = await axios.post("http://localhost:5050/upload", form, {
      headers: form.getHeaders(),
      responseType: "stream",
    });

    const outPath = path.join(
      __dirname,
      "uploads",
      "cropped_" + path.basename(filePath)
    );
    const writer = fs.createWriteStream(outPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      res.json({ message: "Face cropped", path: outPath });
    });

    writer.on("error", () => {
      res.status(500).json({ error: "Failed to write file" });
    });
  } catch (err) {
    res
      .status(400)
      .json({
        error: "No Face Detected. Try another Image for Profile Photo.",
      });
  }
});
app.listen(PORT, () => {
  console.log("Server is Listening");
});
