const LoginForm = ({
  username,
  password,
  handleLogin,
  setUsername,
  setPassword,
}) => {
  return (
    <div id="login-form">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div id="username-input">
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div id="password-input">
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
      {/* <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="login-button" type="submit">login</button>
      </form> */}
    </div>
  );
};

export default LoginForm;
