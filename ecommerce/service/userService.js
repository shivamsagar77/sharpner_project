// services/userService.js

const fetchAllUsers = async () => {
  return 'Fetching all users';
};

const addNewUser = async () => {
  return 'Adding a new user';
};

const fetchUserById = async (id) => {
  return `Fetching user with ID: ${id}`;
};

module.exports = {
  fetchAllUsers,
  addNewUser,
  fetchUserById
};
