import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Homepage, ErrorPage } from '@project/pages';

import { RootLayout } from '@project/components';

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
    ],
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
