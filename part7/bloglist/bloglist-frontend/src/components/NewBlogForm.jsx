import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectBlogs, createBlog } from '../redux/blogSlice';
import {
  showNotification,
  selectNotification,
} from '../redux/notificationSlice';
import { Button, TextField } from '@mui/material';

const NewBlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const notification = useSelector(selectNotification);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleSubmitBlog = (event) => {
    event.preventDefault();
    const newBlogData = {
      title,
      author,
      url,
    };
    resetForm();
    dispatch(createBlog(newBlogData));
    dispatch(
      showNotification('success', `a new blog ${title} by ${author} added`)
    );
    toggleVisibility();
  };

  return (
    <>
      <div id="new-blog-form">
        <form onSubmit={handleSubmitBlog}>
          <div>
            <p>Title</p>
            <TextField
              fullWidth
              variant="outlined"
              id="title"
              type="text"
              value={title}
              name="Title"
              placeholder="input blog title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <p>Autor</p>
            <TextField
              fullWidth
              id="author"
              type="text"
              value={author}
              name="Author"
              placeholder="input blog author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <p>URL</p>
            <TextField
              fullWidth
              id="url"
              type="text"
              value={url}
              name="Url"
              placeholder="input blog url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <Button
            variant="contained"
            size="small"
            color="primary"
            type="submit"
          >
            create
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewBlogForm;
