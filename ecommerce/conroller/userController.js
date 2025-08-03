const userService = require('../services/userService');
const { sendResponse, sendErrorResponse } = require('../Utils/responseHandler');

const userController = {
  data: async (req, res) => {
    try {
      const result = await userService.fetchAllUsers();
      sendResponse(res, result); // status 200 by default
    } catch (err) {
      sendErrorResponse(res, err);
    }
  },

  postData: async (req, res) => {
    try {
      const result = await userService.addNewUser();
      sendResponse(res, result, 201); // status 201 for new creation
    } catch (err) {
      sendErrorResponse(res, err);
    }
  },

  dataById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userService.fetchUserById(id);
      sendResponse(res, result);
    } catch (err) {
      sendErrorResponse(res, err);
    }
  }
};

module.exports = userController;
