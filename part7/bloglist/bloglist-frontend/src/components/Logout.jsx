import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setLogout } from '../redux/userSlice';

const Logout = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch(setLogout());
    window.location.reload();
  };

  return (
    <p>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </p>
  );
};

export default Logout;
