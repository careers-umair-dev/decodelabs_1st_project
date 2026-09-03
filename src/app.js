// src/app.js
// -----------------------------------------------------------------------
// This file is responsible for configuring the Express application:
// middleware, routes, and error handlers. It does NOT start the server
// (listen) — that job belongs to server.js. Splitting these two makes
// the app easier to test later, since app.js can be imported without
// binding to a port.
// -----------------------------------------------------------------------

const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// -------------------- Global Middleware --------------------

// Enable Cross-Origin Resource Sharing so this API can be called
// from front-end apps running on a different origin/port.
app.use(cors());

// Parse incoming JSON request bodies into req.body.
app.use(express.json());

// -------------------- Root Route --------------------
// GET / -> basic info about the API, useful as a health check.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the REST API Fundamentals project!",
    version: "1.0.0",
    endpoints: {
      getAllProducts: "GET /api/products",
      getProductById: "GET /api/products/:id",
      createProduct: "POST /api/products",
      updateProduct: "PUT /api/products/:id",
      deleteProduct: "DELETE /api/products/:id",
    },
  });
});

// -------------------- API Routes --------------------
app.use("/api/products", productRoutes);

// -------------------- Error Handling --------------------
// Order matters here: notFound catches any unmatched route, and
// errorHandler catches every error passed via next(error), including
// the ones notFound creates.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
