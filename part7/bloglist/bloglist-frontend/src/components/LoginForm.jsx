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
import { TextField, Button } from '@mui/material';

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

  const loginForm = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  };

  return (
    <div id="login-form" style={loginForm}>
      <h3>Log in to application</h3>
      <form onSubmit={handleLogin}>
        <div id="username-input">
          <p>Username</p>
          <TextField
            id="username"
            type="text"
            value={user.username}
            name="Username"
            onChange={({ target }) =>
              dispatch(setUser({ ...user, username: target.value }))
            }
          />
        </div>
        <div id="password-input" style={{ margin: '10px 0px' }}>
          <p>Password</p>
          <TextField
            variant="outlined"
            id="password"
            type="password"
            value={user.password}
            name="Password"
            onChange={({ target }) =>
              dispatch(setUser({ ...user, password: target.value }))
            }
          />
        </div>
        <Button variant="contained" id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
