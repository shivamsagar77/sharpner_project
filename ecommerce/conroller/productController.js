const productService = require('../services/productService');

const productController = {
  data: async (req, res) => {
    const result = await productService.fetchAllProducts();
    res.send(result);
  },

  postData: async (req, res) => {
    const result = await productService.addNewProduct();
    res.send(result);
  },

  dataById: async (req, res) => {
    const { id } = req.params;
    const result = await productService.fetchProductById(id);
    res.send(result);
  }
};

module.exports = productController;
