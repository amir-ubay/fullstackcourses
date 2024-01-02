import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
// Update Exercise 8b

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user-token");
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const setError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <div style={{ color: "red" }}>{errorMessage}</div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={() => setPage("logout")}>logout</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={setError} />
      <Recommend show={page === "recommend"} />
      <LoginForm
        show={page === "login" || (page === "logout" && token)}
        setToken={setToken}
        setError={setError}
        token={token}
      />
    </div>
  );
};

export default App;
