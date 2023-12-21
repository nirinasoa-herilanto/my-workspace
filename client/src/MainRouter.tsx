import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  Homepage,
  ErrorPage,
  WorkspacePage,
  CompleteRegistrationPage,
  AuthPage,
  ForgotPasswordPage,
} from '@project/pages';

import { RootLayout, ProtectedRoute, PublicRoute } from '@project/components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout hasFooter />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: 'auth',
        element: <PublicRoute />,
        children: [
          {
            index: true,
            element: <AuthPage />,
          },
        ],
      },
      {
        path: 'forgot-password',
        element: <PublicRoute />,
        children: [
          {
            index: true,
            element: <ForgotPasswordPage />,
          },
        ],
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
