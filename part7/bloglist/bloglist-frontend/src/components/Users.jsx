import userService from '../services/users';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initUserData, selectUserData } from '../redux/userDataSlice';
import { Link } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUserData);

  useEffect(() => {
    dispatch(initUserData());
  }, []);

  return (
    <>
      <h2>Users List</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Users;
