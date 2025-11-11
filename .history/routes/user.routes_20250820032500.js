const express = require("express");
const router = express.Router();
const userRoute = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
router.post("/signup", authController.signup);
router.get("/", userRoute.getAllUsers);

module.exports = router;
