import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@project/components';

export type RootLayoutTemplateProps = {
  hasFooter?: boolean;
};

/**
 * ### RootLayoutTemplate component
 * A default layout component
 */
const RootLayoutTemplate: React.FC<RootLayoutTemplateProps> = ({
  hasFooter = false,
}) => {
  return (
    <Fragment>
      <main className="main-content">
        <Outlet />
      </main>
      {hasFooter && <Footer />}
    </Fragment>
  );
};

export default RootLayoutTemplate;
