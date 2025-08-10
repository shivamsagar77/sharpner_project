import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ blog_title: '', blog_content: '', blog_author: '' });
  const [comment, setComment] = useState('');
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setBlogLoading(true);
    const res = await axios.get('http://localhost:5000/api/blogs');
    setBlogs(res.data);
    setBlogLoading(false);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post('http://localhost:5000/api/blogs', newBlog);
    setNewBlog({ blog_title: '', blog_content: '', blog_author: '' });
    setLoading(false);
    fetchBlogs();
  };

  const fetchComments = async (blogId) => {
    setSelectedBlogId(blogId);
    const res = await axios.get(`http://localhost:5000/api/comments/${blogId}`);
    setComments(res.data);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBlogId) return;
    setLoading(true);
    await axios.post('http://localhost:5000/api/comments', { blog_id: selectedBlogId, comment });
    setComment('');
    setLoading(false);
    fetchComments(selectedBlogId);
  };

  const handleDeleteComment = async (id) => {
    setLoading(true);
    await axios.delete(`http://localhost:5000/api/comments/${id}`);
    setLoading(false);
    fetchComments(selectedBlogId);
  };

  const handleDeleteBlog = async (id) => {
    setBlogLoading(true);
    await axios.delete(`http://localhost:5000/api/blogs/${id}`);
    setBlogLoading(false);
    setSelectedBlogId(null);
    fetchBlogs();
  };

  // Show/Hide comments logic
  const handleShowHideComments = (blogId) => {
    if (selectedBlogId === blogId) {
      setSelectedBlogId(null);
      setComments([]);
    } else {
      fetchComments(blogId);
    }
  };

  return (
    <div className="App blog-bg">
      <h1 className="blog-title">📝 My Modern Blog</h1>
      <div className="blog-main-layout">
        <div className="blog-form-section">
          <form onSubmit={handleBlogSubmit} className="blog-form">
            <h2>Naya Blog Likho</h2>
            <input
              type="text"
              placeholder="Blog Title"
              value={newBlog.blog_title}
              onChange={e => setNewBlog({ ...newBlog, blog_title: e.target.value })}
              required
              className="blog-input"
            />
            <input
              type="text"
              placeholder="Blog Author"
              value={newBlog.blog_author}
              onChange={e => setNewBlog({ ...newBlog, blog_author: e.target.value })}
              required
              className="blog-input"
            />
            <textarea
              placeholder="Blog Content"
              value={newBlog.blog_content}
              onChange={e => setNewBlog({ ...newBlog, blog_content: e.target.value })}
              required
              className="blog-textarea"
            />
            <button type="submit" className="blog-btn" disabled={loading}>{loading ? 'Publishing...' : 'Blog Publish Karo'}</button>
          </form>
        </div>
        <div className="blog-list-section">
          <h2 className="blog-section-title">Sabhi Blogs</h2>
          {blogLoading ? <div className="blog-loader">Loading...</div> : blogs.length === 0 ? <div className="blog-empty">Koi blog nahi hai.</div> : blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <div className="blog-card-header">
                <h3 className="blog-card-title">{blog.blog_title}</h3>
                <button className="blog-delete-btn" title="Delete Blog" onClick={() => handleDeleteBlog(blog.id)}>&#128465;</button>
              </div>
              <p className="blog-card-author">By <b>{blog.blog_author}</b></p>
              <p className="blog-card-content">{blog.blog_content}</p>
              <button className="blog-comment-btn" onClick={() => handleShowHideComments(blog.id)}>
                {selectedBlogId === blog.id ? 'Hide Comments' : 'Comments Dekho'}
              </button>
              {selectedBlogId === blog.id && (
                <div className="blog-comments-section">
                  <h4>Comments</h4>
                  {comments.length === 0 && <p className="blog-empty">Koi comment nahi hai.</p>}
                  <ul className="blog-comments-list">
                    {comments.map(c => (
                      <li key={c.id} className="blog-comment-item">
                        <span>{c.comment}</span>
                        <button className="comment-delete-btn" title="Delete Comment" onClick={() => handleDeleteComment(c.id)}>&#10060;</button>
                      </li>
                    ))}
                  </ul>
                  <form onSubmit={handleCommentSubmit} className="comment-form">
                    <input
                      type="text"
                      placeholder="Naya comment likho"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      required
                      className="comment-input"
                    />
                    <button type="submit" className="comment-btn" disabled={loading}>{loading ? 'Commenting...' : 'Comment Karo'}</button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
