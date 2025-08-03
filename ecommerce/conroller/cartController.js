const cartService = require('../services/cartService');
const { sendResponse, sendErrorResponse } = require('../Utils/responseHandler');

const cartController = {
  data: async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await cartService.fetchCartForUser(userId);
      sendResponse(res, result); // default status code is 200
    } catch (err) {
      sendErrorResponse(res, err);
    }
  },

  postData: async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await cartService.addProductToCart(userId);
      sendResponse(res, result, 201); // use 201 for created
    } catch (err) {
      sendErrorResponse(res, err);
    }
  }
};

module.exports = cartController;
