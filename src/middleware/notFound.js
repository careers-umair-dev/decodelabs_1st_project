// src/middleware/notFound.js
// -----------------------------------------------------------------------
// This middleware runs when a request doesn't match any defined route
// (e.g. GET /api/unknown-route). It creates a 404 error and passes it
// along to the centralized error handler via next(error).
// -----------------------------------------------------------------------

function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

module.exports = notFound;
