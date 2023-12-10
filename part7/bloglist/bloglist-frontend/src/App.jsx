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
import { initUserData } from './redux/userDataSlice';
// CSS
import { Container, Button } from '@mui/material';

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
      dispatch(initUserData());
    }
  }, [user.isLogin]);

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

  return (
    <Container>
      <Router>
        <div className="main-content">
          {user.isLogin && (
            <div className="nav-container">
              <Link to="/">Blogs</Link>
              <Link to="/users">Users</Link>
            </div>
          )}
          <div className="header">
            <h1>Blogs App</h1>
            {notification.type == 'error' && (
              <Error message={notification.message} />
            )}
            {notification.type == 'success' && (
              <Success message={notification.message} />
            )}
            {user.isLogin && <></>}
            {!user.isLogin ? (
              <>
                <LoginForm />
                {/* <RegisterForm /> */}
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
                <NewBlogForm toggleVisibility={toggleVisibility} />
              </Toggleable>
            )}
          </div>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/" element={<BlogQuery />} />
            <Route path="/blogs/:id" element={<TheBlog />} />
          </Routes>
        </div>
      </Router>
    </Container>
  );
};

export default App;
