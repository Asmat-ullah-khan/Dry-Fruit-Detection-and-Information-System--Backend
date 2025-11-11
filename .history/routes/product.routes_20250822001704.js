const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
router
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProducts);
router.route("/:id").get(productController.getProduct).p;
