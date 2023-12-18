import { Outlet } from 'react-router-dom';

import { useAppStore } from '@project/store/use-app-store';

import { Redirection } from '@project/components';

const ProtectedRoute = () => {
  const {
    auth: { user },
  } = useAppStore();

  if (!user) return <Redirection redirectedTo="/auth?tab=login" />;

  return <Outlet />;
};

export default ProtectedRoute;
