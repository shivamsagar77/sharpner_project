// // controllers/userPostController.js
// // const { User, Post } = require('../models');

// const userPostController = {
//   // Create user with posts (optional)
//   createUser: async (req, res) => {
//     try {
//       const { name, email, posts } = req.body; // posts is an array of post objects

//       const user = await User.create(
//         { name, email, Posts: posts },
//         { include: [Post] } // To create associated posts too
//       );

//       res.status(201).json({ success: true, data: user });
//     } catch (error) {
//       console.error('Create user error:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   },

//   // Get user with all posts
//   getUserWithPosts: async (req, res) => {
//     try {
//       const { id } = req.params;

//       const user = await User.findByPk(id, {
//         include: Post, // Include all posts related to this user
//       });

//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }

//       res.status(200).json({ success: true, data: user });
//     } catch (error) {
//       console.error('Get user with posts error:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   }
// };

// module.exports = userPostController;
