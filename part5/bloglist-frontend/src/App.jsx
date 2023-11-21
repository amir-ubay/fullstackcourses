import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
// Updated Answers Task
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import {Success, Error} from "./components/Notifications";
import authService from "./services/auth";
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  // Updated Answers Task
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({type: null, message: null});

  // Event Handler
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, "-", password);

    try {
      const user = await authService.login(username, password);
      window.localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      console.log("exception handle login: ", exception);
      setNotification({
        type: "error",
        message: "Wrong username or password",
      })

      setTimeout(() => {
        setNotification({type: null, message: null});
      }, 5000)
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("user");
    setUser(null);
  }

  const handleSubmitBlog = async (blog) => {
    blogService.create(blog)
      .then((newBlog) => {
        setBlogs((blogs) => blogs.concat(newBlog));
        setNotification({
          type: "success-add-blog",
          message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        })
        setTimeout(() => {
          setNotification({type: null, message: null});
        }, 5000)
      })
  }

  useEffect(() => {
    console.log('I am use effect: ', new Date())
    if(user) {
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
      });
    }
  }, [user]);

  return (
    <div>
      <h2>blogs</h2>
      {notification.type == "error" && (
        <Error message={notification.message} />
      )}
      {notification.type == "success-add-blog" && (
        <Success message={notification.message} />
      )}
      {user && (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </>
      )}
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && <NewBlogForm addBlog={(blog) => handleSubmitBlog(blog)}/>}
      {user && <BlogQuery blogs={blogs} />}
    </div>
  );
};

const BlogQuery = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
