# REST API Fundamentals

A stateless REST API built with **Node.js** and **Express.js** that serves structured JSON data for a `Product` resource. This project uses **in-memory storage only** — there is no database involved — making it ideal for learning core REST API concepts: routing, controllers, middleware, validation, and error handling.

---

## 📖 Project Overview

This API exposes standard CRUD (Create, Read, Update, Delete) operations for `products`. It is intentionally kept simple (no database, no authentication) while still following a clean, production-style folder structure that separates routes, controllers, middleware, and data.

---

## ✨ Features

- Full CRUD REST API for `products`
- In-memory data storage (resets on server restart)
- Configurable port via `.env` (falls back to `5000`)
- Input validation for required fields
- Centralized error-handling middleware
- Custom 404 handler for unknown routes
- CORS enabled
- Proper HTTP status codes (`200`, `201`, `400`, `404`, `500`)
- Clean separation of concerns (routes → controllers → data)
- `requests.http` file for quick manual testing in VS Code

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | Web server framework |
| [dotenv](https://www.npmjs.com/package/dotenv) | Loads environment variables from `.env` |
| [cors](https://www.npmjs.com/package/cors) | Enables Cross-Origin Resource Sharing |
| [nodemon](https://www.npmjs.com/package/nodemon) | Auto-restarts the server during development |

No database is used — data is stored in a plain JavaScript array in memory.

---

## 📁 Folder Structure

```
rest-api-fundamentals/
│
├── src/
│   ├── controllers/
│   │   └── productController.js   # Business logic for product routes
│   │
│   ├── routes/
│   │   └── productRoutes.js       # Route -> controller mappings
│   │
│   ├── middleware/
│   │   ├── errorHandler.js        # Centralized error handler
│   │   └── notFound.js            # Handles unknown routes
│   │
│   ├── data/
│   │   └── products.js            # In-memory product array
│   │
│   ├── app.js                     # Express app configuration
│   └── server.js                  # Server entry point
│
├── .env                           # Local environment variables (not committed)
├── .env.example                   # Example environment variables
├── .gitignore
├── package.json
├── README.md
└── requests.http                  # Example HTTP requests (VS Code REST Client)
```

---

## ⚙️ Installation

1. **Clone or download** the project, then move into the folder:
   ```bash
   cd rest-api-fundamentals
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 🔐 Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and adjust the port if needed:
   ```env
   PORT=5000
   ```

   If `PORT` is not set at all, the server automatically falls back to **5000**.

---

## ▶️ Running the Server

**Production mode:**
```bash
npm start
```

**Development mode** (auto-restarts on file changes, via nodemon):
```bash
npm run dev
```

Once running, you should see:
```
🚀 Server is running on http://localhost:5000
```

---

## 📦 Product Data Format

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 999,
  "category": "Electronics"
}
```

- `id` — auto-generated integer, assigned by the server
- `name` — required, non-empty string
- `price` — required, non-negative number
- `category` — required, non-empty string

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Success Status |
|---|---|---|---|
| GET | `/` | API info / health check | 200 |
| GET | `/api/products` | Get all products | 200 |
| GET | `/api/products/:id` | Get a single product by ID | 200 |
| POST | `/api/products` | Create a new product | 201 |
| PUT | `/api/products/:id` | Update an existing product | 200 |
| DELETE | `/api/products/:id` | Delete a product | 200 |

---

## 📨 Request / Response Examples

### GET all products
```
GET /api/products
```
**Response — 200 OK**
```json
{
  "success": true,
  "count": 5,
  "data": [
    { "id": 1, "name": "Laptop", "price": 999, "category": "Electronics" }
  ]
}
```

### GET a single product
```
GET /api/products/1
```
**Response — 200 OK**
```json
{
  "success": true,
  "data": { "id": 1, "name": "Laptop", "price": 999, "category": "Electronics" }
}
```
**Response — 404 Not Found** (id doesn't exist)
```json
{
  "success": false,
  "message": "Product with id 999 not found."
}
```

### POST a new product
```
POST /api/products
Content-Type: application/json

{
  "name": "Mechanical Keyboard",
  "price": 79.99,
  "category": "Electronics"
}
```
**Response — 201 Created**
```json
{
  "success": true,
  "data": { "id": 6, "name": "Mechanical Keyboard", "price": 79.99, "category": "Electronics" }
}
```
**Response — 400 Bad Request** (missing/invalid fields)
```json
{
  "success": false,
  "errors": [
    "'price' is required and must be a non-negative number.",
    "'category' is required and must be a non-empty string."
  ]
}
```

### PUT (update) a product
```
PUT /api/products/2
Content-Type: application/json

{
  "price": 19.99
}
```
**Response — 200 OK**
```json
{
  "success": true,
  "data": { "id": 2, "name": "Wireless Mouse", "price": 19.99, "category": "Electronics" }
}
```
> PUT supports both full updates (all fields) and partial updates (only the fields you include are changed).

### DELETE a product
```
DELETE /api/products/3
```
**Response — 200 OK**
```json
{
  "success": true,
  "message": "Product deleted successfully.",
  "data": { "id": 3, "name": "Coffee Mug", "price": 12, "category": "Home" }
}
```

---

## 📊 HTTP Status Codes Used

| Code | Meaning | When it's returned |
|---|---|---|
| 200 | OK | Successful GET, PUT, or DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid ID format, missing/invalid fields, malformed JSON, empty PUT body |
| 404 | Not Found | Product ID doesn't exist, or the route itself doesn't exist |
| 500 | Internal Server Error | Unexpected server-side errors |

---

## 🧪 Testing the API

### Option 1 — Postman
1. Open Postman and create a new request.
2. Set the method (GET/POST/PUT/DELETE) and URL, e.g. `http://localhost:5000/api/products`.
3. For POST/PUT requests, go to the **Body** tab → select **raw** → **JSON**, and paste a sample body (see examples above).
4. Click **Send** and inspect the status code and JSON response.

### Option 2 — VS Code REST Client
1. Install the **REST Client** extension in VS Code (by Huachao Mao).
2. Open the included `requests.http` file.
3. Click **Send Request** above any request block.
4. The response will open in a side panel.

### Option 3 — curl
```bash
curl http://localhost:5000/api/products
```

---

## 🔄 Request Flow (Routes → Controllers → Response)

1. A request hits the Express app (`app.js`), which runs global middleware first (`cors`, `express.json()`).
2. `app.js` forwards any request starting with `/api/products` to `productRoutes.js`.
3. `productRoutes.js` matches the specific HTTP method + path (e.g. `GET /:id`) and calls the matching function in `productController.js`.
4. The controller function reads/modifies the in-memory `products` array (`data/products.js`), validates input if needed, and sends a JSON response with the appropriate status code.
5. If the route doesn't exist, `notFound.js` creates a 404 error and passes it to `errorHandler.js`.
6. If any error occurs anywhere in the flow (thrown or passed via `next(error)`), it lands in `errorHandler.js`, which sends a consistent JSON error response.

```
Client Request
     │
     ▼
  app.js  (cors, express.json)
     │
     ▼
productRoutes.js  (matches method + path)
     │
     ▼
productController.js  (validation + logic)
     │
     ▼
 data/products.js  (in-memory array)
     │
     ▼
 JSON Response back to client
```

---

## 📝 Notes

- Data is **not persisted** — restarting the server resets the product list to its original seed data.
- This project intentionally avoids a database and authentication to keep the focus on core REST API concepts.
