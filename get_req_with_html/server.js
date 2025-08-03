// server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve HTML form
app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'VIEW', 'productForm.html'));
});

// Handle form submission (for testing POST data)
app.post('/api/products', (req, res) => {
  const { productName } = req.body;
  res.send(`Product "${productName}" added successfully!`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
