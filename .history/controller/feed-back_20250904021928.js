const mongoose = require("mongoose");
const Feedback = require("../models/feed-back");
const AppError = require("../util/app-errors");
const catchAsync = require("../util/catch-async");
exports.createFeedback = catchAsync(async (req, res, next) => {
  const newFeedback = await Feedback.create({
    user: req.body.user,
    type: req.body.type,
    rating: req.body.rating,
    message: req.body.message,
  });
});
