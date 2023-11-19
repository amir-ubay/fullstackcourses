import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
// Updated Answers Task
import LoginForm from "./components/LoginForm";
import authService from "./services/auth";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  // Updated Answers Task
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Event Handler
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, "-", password);

    try {
      const user = await authService.login(username, password);
      window.localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
    } catch (exception) {
      console.log("exception handle login: ", exception);
    }
  };

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, [user]);

  return (
    <div>
      <h2>blogs</h2>
      {user && (
        <>
          <p>
            {user.name} logged in <button>logout</button>
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