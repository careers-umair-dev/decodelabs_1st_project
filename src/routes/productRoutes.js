// src/routes/productRoutes.js
// -----------------------------------------------------------------------
// This file only DEFINES routes — it maps an HTTP method + URL to a
// controller function. No business logic lives here on purpose.
// -----------------------------------------------------------------------

const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET /api/products        -> list all products
router.get("/", getAllProducts);

// GET /api/products/:id    -> get one product by id
router.get("/:id", getProductById);

// POST /api/products       -> create a new product
router.post("/", createProduct);

// PUT /api/products/:id    -> update an existing product
router.put("/:id", updateProduct);

// DELETE /api/products/:id -> delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
