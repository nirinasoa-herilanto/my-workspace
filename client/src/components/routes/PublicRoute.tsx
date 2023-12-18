import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppStore } from '@project/store/use-app-store';

export type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  const {
    auth: { user },
  } = useAppStore();

  useEffect(() => {
    if (user) {
      navigate('/workspace');
    }
  }, [navigate, user]);

  return children;
};

export default PublicRoute;
