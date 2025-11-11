const express = require("express");
const router = express.Router();
const feedBackControoler = require("../controller/feed-back");
router
  .route("/")
  .post(feedBackControoler.createFeedback)
  .get(feedBackControoler.getAllFeedback);
router
  .route("/:id")
  .get(feedBackControoler.getFeedbackById)
  .delete(feedBackControoler.deleteFeedback);
