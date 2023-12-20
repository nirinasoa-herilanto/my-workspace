import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  Homepage,
  ErrorPage,
  WorkspacePage,
  CompleteRegistrationPage,
  AuthPage,
  ForgotPasswordPage,
} from '@project/pages';

import { RootLayout, ProtectedRoute } from '@project/components';

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
        index: true,
        element: <AuthPage />,
      },
      {
        path: 'forgot-password',
        index: true,
        element: <ForgotPasswordPage />,
      },
      {
        path: 'complete-registration',
        index: true,
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
