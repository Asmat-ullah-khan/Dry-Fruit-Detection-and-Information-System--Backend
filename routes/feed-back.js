// const express = require("express");
// const router = express.Router();
// const feedBackControoler = require("../controller/feed-back");
// const authMiddleware = require("../middleware/auth");
// router
//   .route("/")
//   .post(
//     authMiddleware.protect,
//     authMiddleware.restrictTo("user"),
//     feedBackControoler.createFeedback
//   )
//   .get(authMiddleware.protect, feedBackControoler.getAllFeedback);
// router
//   .route("/:id")
//   .get(feedBackControoler.getFeedbackById)
//   .delete(feedBackControoler.deleteFeedback);
// module.exports = router;
const express = require("express");
const router = express.Router();
const feedBackControoler = require("../controller/feed-back");
const authMiddleware = require("../middleware/auth");

router
  .route("/")
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo("user"),
    feedBackControoler.createFeedback
  )
  .get(feedBackControoler.getAllFeedback); // 👈 PUBLIC NOW

router
  .route("/:id")
  .get(feedBackControoler.getFeedbackById)
  .delete(feedBackControoler.deleteFeedback);

module.exports = router;
