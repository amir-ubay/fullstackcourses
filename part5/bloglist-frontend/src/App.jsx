import { useState, useEffect } from "react";
import {Blog, BlogQuery} from "./components/Blog";
import blogService from "./services/blogs";
// Updated Answers Task
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import {Success, Error} from "./components/Notifications";
import authService from "./services/auth";
import './App.css'
import Toggleable from "./components/Toggleable";

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
        blogService.getAll().then((blogs) => {
          setBlogs(blogs);
        });
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
    if(localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [])

  useEffect(() => {
    if(user) {
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
      });
    }
  }, [user]);

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.addLike(updatedBlog)
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }

  const handleRemove = async (blog) => {
    blogService.remove(blog)
      .then((response) =>
        {console.log("Response after deletion success: ", response)
        blogService.getAll().then((blogs) => {
          setBlogs(blogs);
        })}
      )
  }

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
      {user && (
        <Toggleable buttonLabel="new blog">
          <NewBlogForm addBlog={(blog) => handleSubmitBlog(blog)}/>
        </Toggleable>
      )}
      {user && <BlogQuery blogs={blogs} handleLike={handleLike} handleRemove={handleRemove}/>}
    </div>
  );
};

export default App;
