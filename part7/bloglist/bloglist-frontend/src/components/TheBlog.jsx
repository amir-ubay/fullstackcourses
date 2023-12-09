import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBlogs, initializeBlog, addComment } from '../redux/blogSlice';

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

  // const handleSubmitComment = (event) => {
  //   event.preventDefault();
  //   dispatch(addComment(theBlog, event.target.comment.value));
  //   event.target.comment.value = '';
  // };

  return (
    <>
      {theBlog && (
        <div key={theBlog.id}>
          <h3>{theBlog.title}</h3>
          <a href={theBlog.url}>{theBlog.url}</a>
          <p>
            {theBlog.likes} likes <button>like</button>
          </p>
          <p>added by {theBlog.user.name}</p>

          <h3>Comments</h3>
          <div>
            New comment: {/* <form onSubmit={handleSubmitComment}> */}
            <input name="comment" type="text" onKeyDown={handleKeyPress} />
            {/* <input
            type="submit"
            onClick={handleSubmitComment}
            value="add comment"
          /> */}
            {/* </form> */}
          </div>
          <ul>
            {theBlog.comments.map((comment) => (
              <li key={String(comment._id)}>{comment.text}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TheBlog;
