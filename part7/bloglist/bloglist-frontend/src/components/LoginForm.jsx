import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLogin, setLogout, selectUser } from '../redux/userSlice';
import authService from '../services/auth';
import blogService from '../services/blogs';
import {
  showNotification,
  selectNotification,
} from '../redux/notificationSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const notification = useSelector(selectNotification);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginResult = await authService.login(user.username, user.password);
      window.localStorage.setItem('user', JSON.stringify(loginResult));

      dispatch(setLogin({ token: loginResult.token }));
      blogService.setToken(loginResult.token);
    } catch (exception) {
      console.log('exception handle login: ', exception);
      dispatch(showNotification('error', 'wrong username or password'));
    } finally {
    }
  };

  return (
    <div id="login-form">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div id="username-input">
          username
          <input
            id="username"
            type="text"
            value={user.username}
            name="Username"
            onChange={({ target }) =>
              dispatch(setUser({ ...user, username: target.value }))
            }
          />
        </div>
        <div id="password-input">
          password
          <input
            id="password"
            type="password"
            value={user.password}
            name="Password"
            onChange={({ target }) =>
              dispatch(setUser({ ...user, password: target.value }))
            }
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
