import userService from '../services/users';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initUserData, selectUserData } from '../redux/userDataSlice';
import { Link } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUserData);

  useEffect(() => {
    dispatch(initUserData());
  }, []);

  return (
    <>
      <h2>Users List</h2>
      {users.map((user) => (
        <div key={user.id}>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default Users;
