const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
router
  .post("/", productController.createProduct)
  .get("/", productController.getAllProducts);
  router.
