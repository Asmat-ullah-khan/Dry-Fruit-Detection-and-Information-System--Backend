const express = require("express");
const statsController = require("../controller/stats");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get(
  "/overview",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  statsController.getOverviewStats
);

module.exports = router;
