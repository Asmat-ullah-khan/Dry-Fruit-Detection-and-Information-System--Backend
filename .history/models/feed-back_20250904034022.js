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
      set:(v)=> 
    },
    rating: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Poor", "Very Poor"], // fixed rating options
      required: true,
    },
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
