import { useState, useEffect } from 'react';
import BlogQuery from './components/Blog';
import blogService from './services/blogs';
// Updated Answers Task
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import { Success, Error } from './components/Notifications';
import './App.css';
import Toggleable from './components/Toggleable';
import RegisterForm from './components/RegisterForm';
import { setUser, setLogin, selectUser } from './redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Logout from './components/Logout';
import { selectNotification } from './redux/notificationSlice';
import { selectBlogs, initializeBlog } from './redux/blogSlice';
// Start React Router
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import TheBlog from './components/TheBlog';

const App = () => {
  const user = useSelector(selectUser);
  const notification = useSelector(selectNotification);
  const blogs = useSelector(selectBlogs);

  const dispatch = useDispatch();

  // Updated Answers Task
  const [newFormView, setNewFormView] = useState(false);

  // Event Handler
  const toggleVisibility = () => {
    setNewFormView(!newFormView);
  };

  const handleSubmitBlog = async (blog) => {
    blogService.create(blog).then((newBlog) => {
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
        setNewFormView(false);
      });
      setNotification({
        type: 'success-add-blog',
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
      });
      setTimeout(() => {
        setNotification({ type: null, message: null });
      }, 5000);
    });
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const data = JSON.parse(localStorage.getItem('user'));
      dispatch(setUser({ username: data.username }));
      dispatch(setLogin({ token: data.token }));
    }
  }, []);

  useEffect(() => {
    if (user.isLogin) {
      blogService.setToken(user.token);
      dispatch(initializeBlog());
    }
  }, [user]);

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    blogService.addLike(updatedBlog);
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  };

  const handleRemove = async (blog) => {
    blogService.remove(blog).then((response) => {
      console.log('Response after deletion success: ', response);
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
      });
    });
  };

  return (
    <div>
      <Router>
        <div id="menu">
          <Link to="/users">Users</Link>
          <Link to="/blogs">Blogs</Link>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs" element={<BlogQuery />} />
            <Route path="/blogs/:id" element={<TheBlog />} />
          </Routes>
        </div>
      </Router>
      <h2>blogs</h2>
      {notification.type == 'error' && <Error message={notification.message} />}
      {notification.type == 'success-add-blog' && (
        <Success message={notification.message} />
      )}
      {user.isLogin && <></>}
      {!user.isLogin ? (
        <>
          <LoginForm />
          <RegisterForm />
        </>
      ) : (
        <Logout />
      )}
      {user.isLogin && (
        <Toggleable
          buttonLabel="new blog"
          visible={newFormView}
          toggleVisibility={toggleVisibility}
        >
          <NewBlogForm addBlog={(blog) => handleSubmitBlog(blog)} />
        </Toggleable>
      )}
      {/* {user.isLogin && <BlogQuery />} */}
      {/* {user.isLogin && <Users />} */}
    </div>
  );
};

export default App;
