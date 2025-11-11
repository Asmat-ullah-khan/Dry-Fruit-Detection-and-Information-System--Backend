const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Bug", "Suggestion", "Complaint", "Other"], // only allowed values
      required: true,
      set: (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
    },
    rating: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Poor", "Very Poor"], // fixed rating options
      required: true,
      set:(v) => 
  v
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "),
    message: {
      type: String,
      required: [true, "Feedback cannot be empty"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
