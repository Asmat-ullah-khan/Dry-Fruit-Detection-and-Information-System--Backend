const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
const authMiddleWare = require("../middleware/auth");

/**
 * @route POST /
 * @description Create a new product
 * @access Public
 */
router
  .route("/")
  .post(productController.createProduct)

  /**
   * @route GET /
   * @description Get all products
   * @access Public
   */
  .get(authMiddleWare.protect, productController.getAllProducts);

/**
 * @route GET /:id
 * @description Get a single product by ID
 * @param {string} id - Product ID
 * @access Public
 */
router
  .route("/:id")
  .get(productController.getProduct)

  /**
   * @route PATCH /:id
   * @description Update a product by ID (partial update)
   * @param {string} id - Product ID
   * @access Public
   */
  .patch(productController.updateProduct)

  /**
   * @route DELETE /:id
   * @description Delete a product by ID
   * @param {string} id - Product ID
   * @access Public
   */
  .delete(productController.deleteProduct);

module.exports = router;
