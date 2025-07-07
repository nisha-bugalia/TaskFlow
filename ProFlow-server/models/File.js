const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: String,
  savedAs: String,
  fileUrl: String,
  type: String,
  size: Number,
  projectId: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", fileSchema);
