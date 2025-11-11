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
