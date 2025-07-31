// server.js

const express = require('express');
const app = express();
const PORT = 3000;

// Import routes
const userRoutes = require('./route/userRoutes');
const productRoutes = require('./route/productRoutes');
const cartRoutes = require('./route/cartRoutes');

// Middleware to parse JSON (if needed for POST)
app.use(express.json());

// Use routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
