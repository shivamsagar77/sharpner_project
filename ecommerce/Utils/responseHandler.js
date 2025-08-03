// utils/responseHandler.js

const sendErrorResponse = (res, err) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    message: message,
    status: false
  });
};

const sendResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    data: data,
    status: true
  });
};

module.exports = {
  sendErrorResponse,
  sendResponse
};
