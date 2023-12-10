import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  selectBlogs,
  deleteBlog,
  initializeBlog,
  addLike,
} from '../redux/blogSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// UI Import
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';

const BlogQuery = () => {
  const blogs = useSelector(selectBlogs);
  const dispatch = useDispatch();

  const queryStyle = {
    padding: '8px, 0px, 8px, 0px',
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    gap: '4px',
    flexWrap: 'wrap',
    allignContent: 'center',
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
    dispatch(deleteBlog(blog));
  };

  const handleLike = (blog) => {
    dispatch(addLike(blog));
  };

  var sortedBlogs = [];

  if (blogs) {
    sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  }

  return (
    <div style={queryStyle} class="blogContainer">
      {sortedBlogs.map((blog) => (
        <Card sx={{ width: '32%' }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {blog.author}
            </Typography>
            <Typography variant="h5" component="div">
              {blog.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {blog.url}
            </Typography>
            <Typography variant="body2">
              <p>
                likes{' '}
                <span test-data="blog-likes" id="likes">
                  {blog.likes}
                </span>{' '}
                <button onClick={() => handleLike(blog)}>like</button>
              </p>
            </Typography>
            <CardActions>
              <Link to={`/blogs/${blog.id}`}>
                <Button size="small">View</Button>
              </Link>
              <Button
                size="small"
                onClick={() => {
                  handleRemove(blog);
                }}
              >
                Remove
              </Button>
            </CardActions>
          </CardContent>
        </Card>
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
