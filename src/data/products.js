// src/data/products.js
// -----------------------------------------------------------------------
// This file acts as our "database" for this project.
// Since the requirements say "no database", we simply keep the products
// in a JavaScript array that lives in memory while the server is running.
//
// IMPORTANT: Because this is in-memory storage, all data resets every
// time the server restarts. That's expected and fine for this project.
// -----------------------------------------------------------------------

let products = [
  { id: 1, name: "Laptop", price: 999, category: "Electronics" },
  { id: 2, name: "Wireless Mouse", price: 25, category: "Electronics" },
  { id: 3, name: "Coffee Mug", price: 12, category: "Home" },
  { id: 4, name: "Desk Lamp", price: 35, category: "Home" },
  { id: 5, name: "Notebook", price: 5, category: "Stationery" },
];

// Keeps track of the next ID to assign to a new product.
// We calculate it from the current data so new IDs never collide.
let nextId = products.length + 1;

// Small helper so the controller doesn't need to manage the counter itself.
function getNextId() {
  return nextId++;
}

module.exports = { products, getNextId };
