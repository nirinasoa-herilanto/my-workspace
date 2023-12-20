import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppStore } from '@project/store/use-app-store';

/**
 * ### PublicRoute component
 * A public layout for checking if the connected user tryed to connect or reset password again.
 */
const PublicRoute = () => {
  const navigate = useNavigate();

  const {
    auth: { user },
  } = useAppStore();

  useEffect(() => {
    if (user) {
      navigate('/workspace');
    }
  }, [navigate, user]);

  return <Outlet />;
};

export default PublicRoute;
