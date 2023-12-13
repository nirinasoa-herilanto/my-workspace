import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <Fragment>
      <main className="main-content">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default RootLayout;
