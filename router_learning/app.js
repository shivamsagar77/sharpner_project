// Import Express
const express = require('express');
const product = require('./routes/product.js');
const categories = require("./routes/categories.js")
// Create an Express app
const app = express();

// Middleware to parse JSON (optional but good for POST requests)
app.use(express.json());

app.use("/product_table",product)
app.use("/categories_table",categories)
// ✅ GET /categories


// ✅ Wildcard Route for undefined paths
// app.use('*', (req, res) => {
//   res.status(404).send('<h1>404 - Page Not Found</h1>');
// });

// Start the server on port 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
