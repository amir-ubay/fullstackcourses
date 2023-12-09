import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initUserData, selectUserData } from '../redux/userDataSlice';
import { useParams } from 'react-router-dom';

const User = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const userData = useSelector(selectUserData);
  const theUser = userData.find((user) => user.id === id);

  console.log('userData >', userData);
  console.log('id >', id);
  console.log('theUser >', theUser);

  useEffect(() => {
    dispatch(initUserData());
  }, []);

  return (
    // <></>
    <div>
      <h2>{theUser.username}</h2>
      <p>added blogs</p>
      <ul>
        {theUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
