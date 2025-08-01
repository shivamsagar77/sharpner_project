const pool = require('../config/db');

const cardController = {

  // ✅ GET API → हमेशा latest data लाना
  data: async  (req, res) => {
  const { userId } = req.params;
  res.send(`Fetching cart for user with ID: ${userId}`);
},

  // ✅ POST API → पहली बार insert, बाद में update
  postData: async (req, res) => {
  const { userId } = req.params;
  res.send(`Adding product to cart for user with ID: ${userId}`);
}
};

module.exports = cardController;
