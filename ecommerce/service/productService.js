// services/productService.js

const fetchAllProducts = async () => {
  return 'Fetching all products';
};

const addNewProduct = async () => {
  return 'Adding a new product';
};

const fetchProductById = async (id) => {
  return `Fetching product with ID: ${id}`;
};

module.exports = {
  fetchAllProducts,
  addNewProduct,
  fetchProductById
};
