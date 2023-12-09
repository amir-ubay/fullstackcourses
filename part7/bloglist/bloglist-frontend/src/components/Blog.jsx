import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { selectBlogs, deleteBlog, initializeBlog, addLike } from '../redux/blogSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const BlogQuery = () => {
  const blogs = useSelector(selectBlogs);
  const dispatch = useDispatch()

  const queryStyle = {
    paddingTop: '8px',
  };

  const [visibleBlogId, setVisibleBlogId] = useState(null);

  const toggleVisibility = (blogId) => {
    if (visibleBlogId === blogId) {
      setVisibleBlogId(null);
    } else {
      setVisibleBlogId(blogId);
    }
  };


  const handleRemove = (blog) => {
    dispatch(deleteBlog(blog))
  }

  const handleLike = (blog) => {
    dispatch(addLike(blog))
  }

  var sortedBlogs = [] 

  if (blogs) {
    sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  }

  console.log("sortedBlogs >", sortedBlogs)


  return (
    <div style={queryStyle}>
      
      {sortedBlogs.map((blog) => (
        <div
          className="blogItem"
          blog-data={blog.title}
          key={blog.id}
          style={{
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5,
          }}
        >
          <Link to={`/blogs/${blog.id}`}>
            <span test-data="blog-title" id="title">
              {blog.title}{' '}
            </span>
            <span test-data="blog-author" id="author">
              {blog.author}
            </span>
          </Link>
          {visibleBlogId === blog.id ? (
            <>
              <button onClick={() => toggleVisibility(blog.id)}>Hide</button>
              <div>
                <p test-data="blog-url" id="url">
                  {blog.url}
                </p>
                <p>
                  likes{' '}
                  <span test-data="blog-likes" id="likes">
                    {blog.likes}
                  </span>{' '}
                  <button onClick={() => handleLike(blog)}>like</button>
                </p>
                <p test-data="blog-username">{blog.user.name}</p>
                <div>
                  <button
                    onClick={() => {
                      handleRemove(blog);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </>
          ) : (
            <button onClick={() => toggleVisibility(blog.id)}>View</button>
          )}
        </div>
      ))}
    </div>
  );
};

// BlogQuery.propTypes = {
//   blogs: PropTypes.array.isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleRemove: PropTypes.func.isRequired,
// };

export default BlogQuery;
