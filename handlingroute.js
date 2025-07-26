// Import Express
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON (optional but good for POST requests)
app.use(express.json());

// ✅ GET /products
app.get('/products', (req, res) => {
  res.send('Here is the list of all products.');
});

// ✅ POST /products
app.post('/products', (req, res) => {
  res.send('A new product has been added.');
});

// ✅ GET /categories
app.get('/categories', (req, res) => {
  res.send('Here is the list of all categories.');
});

// ✅ POST /categories
app.post('/categories', (req, res) => {
  res.send('A new category has been created.');
});

// ✅ Wildcard Route for undefined paths
app.use('*', (req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start the server on port 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
