// server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET: Serve the form
app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'VIEW', 'productForm.html'));
});

// POST: Receive form data (from Axios or Postman)
app.post('/api/products', (req, res) => {
  const { productName } = req.body;

  // Log received data
  console.log('Received Product:', productName);

  // Respond to client
  res.json({
    message: `Product "${productName}" added successfully!`,
    product: productName
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
