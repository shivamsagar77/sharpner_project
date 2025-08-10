const pool = require('../config/db');

// Blog create
exports.createBlog = async (req, res) => {
  try {
    const { blog_title, blog_content, blog_author } = req.body;
    const result = await pool.query(
      'INSERT INTO blog_content (blog_title, blog_content, blog_author) VALUES ($1, $2, $3) RETURNING *',
      [blog_title, blog_content, blog_author]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Blog create nahi hua', details: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_content ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Blogs fetch nahi hue', details: err.message });
  }
};

// Comment create
exports.createComment = async (req, res) => {
  try {
    const { blog_id, comment } = req.body;
    const result = await pool.query(
      'INSERT INTO blog_comment (blog_id, comment) VALUES ($1, $2) RETURNING *',
      [blog_id, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Comment create nahi hua', details: err.message });
  }
};

// Get comments by blog id
exports.getCommentsByBlogId = async (req, res) => {
  try {
    const { blog_id } = req.params;
    const result = await pool.query(
      'SELECT * FROM blog_comment WHERE blog_id = $1 ORDER BY id ASC',
      [blog_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Comments fetch nahi hue', details: err.message });
  }
};

// Delete comment by id
exports.deleteComment = async (req, res) => {
  try {
    console.log("hello")
    const { id } = req.params;
    await pool.query('DELETE FROM blog_comment WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Comment delete nahi hua', details: err.message });
  }
};

// Delete blog by id (and its comments)
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    // Pehle comments delete karo
    await pool.query('DELETE FROM blog_comment WHERE blog_id = $1', [id]);
    // Fir blog delete karo
    await pool.query('DELETE FROM blog_content WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Blog delete nahi hua', details: err.message });
  }
}; 