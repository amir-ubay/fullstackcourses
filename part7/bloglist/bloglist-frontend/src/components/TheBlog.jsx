import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBlogs, initializeBlog } from '../redux/blogSlice';

const TheBlog = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const theBlog = blogs[0].find((n) => n.id === id);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(initializeBlog());
    }
  }, []);

  console.log('id >', id);
  console.log('blogs >', blogs);
  console.log('theBlog >', theBlog);

  return (
    <>
      <h3>{theBlog.title}</h3>
      <a href={theBlog.url}>{theBlog.url}</a>
      <p>
        {theBlog.likes} likes <button>like</button>
      </p>
      <p>added by {theBlog.user.name}</p>

      <h3>Comments</h3>
    </>
  );
};

export default TheBlog;
