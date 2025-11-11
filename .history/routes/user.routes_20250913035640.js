const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const authMiddleWare = require("../middleware/auth");
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.patch(
  "/updateMyPassword",
  authMiddleWare.protect,
  authController.updateMyPassword
);
router.patch("/updateMe", authMiddleWare.protect, userController.updateMe);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);

module.exports = router;
