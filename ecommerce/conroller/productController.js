const productService = require('../services/productService');
const { sendResponse, sendErrorResponse } = require('../Utils/responseHandler');

const productController = {
  data: async (req, res) => {
    try {
      const result = await productService.fetchAllProducts();
      sendResponse(res, result); // 200 by default
    } catch (err) {
      sendErrorResponse(res, err);
    }
  },

  postData: async (req, res) => {
    try {
      const result = await productService.addNewProduct();
      sendResponse(res, result, 201); // use 201 for created
    } catch (err) {
      sendErrorResponse(res, err);
    }
  },

  dataById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await productService.fetchProductById(id);
      sendResponse(res, result);
    } catch (err) {
      sendErrorResponse(res, err);
    }
  }
};

module.exports = productController;
