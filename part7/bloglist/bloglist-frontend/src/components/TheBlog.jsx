import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBlogs, initializeBlog, addComment } from '../redux/blogSlice';
import {
  Typography,
  Link,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';

const TheBlog = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const theBlog = blogs.find((n) => n.id === id);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(addComment(theBlog, event.target.value));
      event.target.value = '';
    }
  };

  return (
    <>
      {theBlog && (
        <Box marginTop={2}>
          <Typography variant="h3" marginBottom={1}>
            {theBlog.title}
          </Typography>
          <Link href={theBlog.url} marginBottom={1}>
            {theBlog.url}
          </Link>
          <Typography marginBottom={1}>
            {theBlog.likes} likes <Button variant="contained">like</Button>
          </Typography>
          <Typography marginBottom={1}>added by {theBlog.user.name}</Typography>

          <Typography variant="h3" marginBottom={1}>
            Comments
          </Typography>
          <Box marginBottom={2}>
            New comment:
            <TextField name="comment" type="text" onKeyDown={handleKeyPress} />
          </Box>
          <List>
            {theBlog.comments.map((comment) => (
              <ListItem key={String(comment._id)}>
                <ListItemText primary={comment.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default TheBlog;
