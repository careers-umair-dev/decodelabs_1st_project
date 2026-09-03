// src/server.js
// -----------------------------------------------------------------------
// This is the entry point of the application. Its only job is to load
// environment variables and start the Express server (app.js) on the
// configured port.
// -----------------------------------------------------------------------

require("dotenv").config();

const app = require("./app");

// Use the PORT from .env, falling back to 5000 if it's not defined.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
