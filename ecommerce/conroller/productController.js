const pool = require('../config/db');

const productController = {

  // ✅ GET API → हमेशा latest data लाना
  data: async (req, res) => {
  res.send('Fetching all products');
},

  // ✅ POST API → पहली बार insert, बाद में update
  postData: async (req, res) => {
  res.send('Adding a new product');
},

dataById: async (req, res) => {
  const { id } = req.params;
  res.send(`Fetching product with ID: ${id}`);
}

};

module.exports = productController;
