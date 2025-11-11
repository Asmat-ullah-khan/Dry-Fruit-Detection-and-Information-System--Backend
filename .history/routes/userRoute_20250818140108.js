const express = require("express");
const router = express.Router();
const userRoute = require("../controller/userController");
const authController = require("../controller/authController");
router.post("/signup", authController.signup);
router.get("/", userRoute.getAllUsers);

module.exports = router;
