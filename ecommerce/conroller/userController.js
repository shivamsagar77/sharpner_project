const pool = require('../config/db');

const UserController = {

  // ✅ GET API → हमेशा latest data लाना
  data: async (req, res) => {
  res.send('Fetching all users');
},

  // ✅ POST API → पहली बार insert, बाद में update
  postData: async  (req, res) => {
  res.send('Adding a new user');
},

dataById: async (req, res) => {
  const { id } = req.params;
  res.send(`Fetching user with ID: ${id}`);
}

};

module.exports = UserController;
