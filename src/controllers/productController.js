// src/controllers/productController.js
// -----------------------------------------------------------------------
// Controllers contain the actual business logic for each route.
// The routes file simply points a URL + HTTP method to one of these
// functions. Keeping this logic separate from the routes keeps the
// project organized and easy to scale later.
// -----------------------------------------------------------------------

const { products, getNextId } = require("../data/products");

// -----------------------------------------------------------------------
// Helper: validate the fields of an incoming product payload.
// Returns an array of error messages (empty array = valid).
// -----------------------------------------------------------------------
function validateProduct(body, { partial = false } = {}) {
  const errors = [];
  const { name, price, category } = body;

  // When "partial" is true (used for PUT/update), we only validate
  // fields that were actually provided, instead of requiring all of them.
  if (!partial || name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      errors.push("'name' is required and must be a non-empty string.");
    }
  }

  if (!partial || price !== undefined) {
    if (typeof price !== "number" || Number.isNaN(price) || price < 0) {
      errors.push("'price' is required and must be a non-negative number.");
    }
  }

  if (!partial || category !== undefined) {
    if (typeof category !== "string" || category.trim().length === 0) {
      errors.push("'category' is required and must be a non-empty string.");
    }
  }

  return errors;
}

// -----------------------------------------------------------------------
// GET /api/products
// Returns the full list of products.
// -----------------------------------------------------------------------
async function getAllProducts(req, res) {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
}

// -----------------------------------------------------------------------
// GET /api/products/:id
// Returns a single product by ID, or 404 if it doesn't exist.
// -----------------------------------------------------------------------
async function getProductById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      message: "Product ID must be a valid integer.",
    });
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found.`,
    });
  }

  res.status(200).json({ success: true, data: product });
}

// -----------------------------------------------------------------------
// POST /api/products
// Creates a new product from the request body.
// -----------------------------------------------------------------------
async function createProduct(req, res) {
  const errors = validateProduct(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const newProduct = {
    id: getNextId(),
    name: req.body.name.trim(),
    price: req.body.price,
    category: req.body.category.trim(),
  };

  products.push(newProduct);

  res.status(201).json({ success: true, data: newProduct });
}

// -----------------------------------------------------------------------
// PUT /api/products/:id
// Updates an existing product. Supports full or partial updates.
// -----------------------------------------------------------------------
async function updateProduct(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      message: "Product ID must be a valid integer.",
    });
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found.`,
    });
  }

  // Reject empty request bodies so a PUT can't silently do nothing.
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body must include at least one field to update.",
    });
  }

  const errors = validateProduct(req.body, { partial: true });

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Apply only the fields that were provided.
  if (req.body.name !== undefined) product.name = req.body.name.trim();
  if (req.body.price !== undefined) product.price = req.body.price;
  if (req.body.category !== undefined)
    product.category = req.body.category.trim();

  res.status(200).json({ success: true, data: product });
}

// -----------------------------------------------------------------------
// DELETE /api/products/:id
// Removes a product from the in-memory array.
// -----------------------------------------------------------------------
async function deleteProduct(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      message: "Product ID must be a valid integer.",
    });
  }

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found.`,
    });
  }

  const [deleted] = products.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
    data: deleted,
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
