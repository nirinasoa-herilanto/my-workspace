import { useNavigate } from 'react-router-dom';

import { useAppStore } from '@project/store/use-app-store';

import { Button } from '@project/components';

const WorspacePage = () => {
  const navigate = useNavigate();

  const {
    auth: { user, logout },
  } = useAppStore();

  console.log(user);

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {user && (
        <>
          <h1>{`Welcome ${user.displayName || user.email?.split('@')[0]}`}</h1>

          <Button onClick={logoutHandler}>Logout</Button>
        </>
      )}
    </div>
  );
};

export default WorspacePage;
