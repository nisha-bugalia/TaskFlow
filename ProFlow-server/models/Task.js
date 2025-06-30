const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    assignee: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "On Hold", "Completed"],
      default: "Not Started",
    },
     priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
    },
    endDate: {
      type: Date,
    },
    endedOn: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Task", taskSchema);
