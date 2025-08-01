const userService = require('../services/userService');

const userController = {
  data: async (req, res) => {
    const result = await userService.fetchAllUsers();
    res.send(result);
  },

  postData: async (req, res) => {
    const result = await userService.addNewUser();
    res.send(result);
  },

  dataById: async (req, res) => {
    const { id } = req.params;
    const result = await userService.fetchUserById(id);
    res.send(result);
  }
};

module.exports = userController;
