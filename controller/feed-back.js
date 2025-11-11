const Feedback = require("../models/feed-back");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");

exports.createFeedback = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError("Please provide feedback data", 400));
  }

  const newFeedback = await Feedback.create({
    user: req.body.user,
    type: req.body.type,
    rating: req.body.rating,
    message: req.body.message,
  });

  res.status(201).json({
    status: "success",
    data: { feedback: newFeedback },
  });
});
exports.getAllFeedback = catchAsync(async (req, res, next) => {
  const feedbacks = await Feedback.find().populate("user", "username email");
  if (!feedbacks) {
    return next(new AppError("no feedbacks are avilible ", 404));
  }
  res.status(200).json({
    status: "success",
    results: feedbacks.length,
    data: { feedbacks },
  });
});
exports.getFeedbackById = catchAsync(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id).populate(
    "user",
    "username email"
  );
  if (!feedback) {
    return next(new AppError("No feedback found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { feedback },
  });
});
exports.deleteFeedback = catchAsync(async (req, res, next) => {
  const feedback = await Feedback.findByIdAndDelete(req.params.id);
  if (!feedback) {
    return next(new AppError("No feedback found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
