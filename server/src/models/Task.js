const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true } // tự động có createdAt, updatedAt
);

module.exports = mongoose.model("Task", taskSchema);
