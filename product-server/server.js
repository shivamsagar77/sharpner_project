// server.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// GET endpoint that serves HTML from VIEW folder
app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'VIEW', 'products.html'));
});

// Home Route (Optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Product Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
