const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword:token", authController.resetPassword);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);

module.exports = router;
