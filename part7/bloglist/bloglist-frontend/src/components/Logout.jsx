import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setLogout } from '../redux/userSlice';
import { Button } from '@mui/material';

const Logout = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch(setLogout());
    window.location.reload();
  };

  return (
    <div className="loginStatus">
      <h3>
        {user.username} logged in{' '}
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={handleLogout}
        >
          logout
        </Button>
      </h3>
    </div>
  );
};

export default Logout;
