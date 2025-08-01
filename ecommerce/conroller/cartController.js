const cartService = require('../services/cartService');

const cartController = {
  data: async (req, res) => {
    const { userId } = req.params;
    const result = await cartService.fetchCartForUser(userId);
    res.send(result);
  },

  postData: async (req, res) => {
    const { userId } = req.params;
    const result = await cartService.addProductToCart(userId);
    res.send(result);
  }
};

module.exports = cartController;
