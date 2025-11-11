const express = require("express");
const router = express.Router();
const provinceController = require("../controller/province");
router.route("/", provinceController.createProvince);
