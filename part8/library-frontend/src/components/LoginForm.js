import { useState, useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ setToken, setError, show, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const client = useApolloClient();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("user-token");
    client.resetStore();
  };

  if (!show) {
    return null;
  }

  if (token) {
    return (
      <div>
        <h2>Logged in as {username}</h2>
        <button onClick={logout}>logout</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
