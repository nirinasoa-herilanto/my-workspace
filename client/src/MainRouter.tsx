import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  Homepage,
  ErrorPage,
  WorkspacePage,
  CompleteRegistrationPage,
  AuthPage,
  ForgotPasswordPage,
} from '@project/pages';

import { ProtectedRoute, PublicRoute } from '@project/utils';

import { RootLayoutTemplate } from '@project/components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutTemplate hasFooter />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
  {
    path: '/auth',
    errorElement: <ErrorPage />,
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'complete-registration',
        element: <CompleteRegistrationPage />,
      },
    ],
  },
  {
    path: '/workspace',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WorkspacePage />,
      },
    ],
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
