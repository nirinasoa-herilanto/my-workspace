import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@project/components';

export type RootLayoutProps = {
  hasFooter?: boolean;
};

/**
 * ### RootLayout component
 * A default layout component
 */
const RootLayout: React.FC<RootLayoutProps> = ({ hasFooter = false }) => {
  return (
    <Fragment>
      <main className="main-content">
        <Outlet />
      </main>
      {hasFooter && <Footer />}
    </Fragment>
  );
};

export default RootLayout;
