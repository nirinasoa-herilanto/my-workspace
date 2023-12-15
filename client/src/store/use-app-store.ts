import React from 'react';
import { IAppContext, AppStoreContext } from './index';

/**
 * Use to consume store
 * ```
 * const {...} = useAppStore();
 * ```
 */
export const useAppStore = () => React.useContext<IAppContext>(AppStoreContext);
