import { ReactNode } from 'react';

/* eslint-disable @typescript-eslint/ban-types */

/**
 * ### CustomPropsType
 * A default component props type.
 * 
 * - Used to avoid `repetition` of declaring props `type` on each component.
 * 
 * Usage example
 * ```jsx
  import React from 'react';
  import type { ComponentPropsType } from '@project/types';

  const Layout: React.FC<ComponentPropsType> = ({ className, children }) => {
    return (<div className={`layout ${className || ''}`}>
      {children}
    </div>);
  };

  export default Layout;

 * ```
 */
declare type CustomPropsType<T = {}> = {
  className?: string;
  children?: ReactNode;
} & T;
