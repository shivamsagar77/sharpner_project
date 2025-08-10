const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

// Blog create
router.post('/blogs', blogController.createBlog);
// Get all blogs
router.get('/blogs', blogController.getAllBlogs);
// Comment create
router.post('/comments', blogController.createComment);
// Get comments by blog id
router.get('/comments/:blog_id', blogController.getCommentsByBlogId);
// Delete comment
router.delete('/comments/:id', blogController.deleteComment);
// Delete blog
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router; 