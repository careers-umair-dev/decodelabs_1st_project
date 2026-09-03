// src/middleware/errorHandler.js
// -----------------------------------------------------------------------
// Centralized error-handling middleware.
// Express recognizes this as an error handler because it takes FOUR
// arguments (err, req, res, next). Any call to next(error) anywhere in
// the app — or any thrown error inside an async route wrapped properly —
// ends up here.
// -----------------------------------------------------------------------

function errorHandler(err, req, res, next) {
  // express.json() throws a SyntaxError when the request body contains
  // malformed JSON. We treat that as a client error (400), not a server
  // error (500).
  if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in request body.",
    });
  }

  // If a status code was attached to the error, use it. Otherwise,
  // default to 500 (Internal Server Error).
  const statusCode = err.statusCode || 500;

  console.error(`[Error] ${req.method} ${req.originalUrl} -> ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Stack traces are only useful (and safe) to expose during development.
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}

module.exports = errorHandler;
