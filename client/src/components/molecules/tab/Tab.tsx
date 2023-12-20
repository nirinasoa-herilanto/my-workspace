import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

export type TabProps = {
  className?: string;
  activeTab: string;
  children: React.ReactNode;
};

/**
 * ### Tab component
 * Use to display tab element on the UI.
 * - already animated by `framer motion`
 * @todo refactor
 */
const Tab: React.FC<TabProps> = ({ className, activeTab, children }) => {
  const navigate = useNavigate();

  const isActiveTabHandler = (item: string): string => {
    return activeTab === item ? 'active' : '';
  };

  const switchTabHandler = (item: string) => {
    navigate(item);
  };

  return (
    <TabWrapper className={`tab ${className || ''}`}>
      <menu className="tab-header">
        <ul className="tab-lists">
          <li>
            <button
              className={isActiveTabHandler('sign-in')}
              onClick={switchTabHandler.bind(null, '/auth?tab=sign-in')}
            >
              Sign in
            </button>
          </li>
          <li>
            <button
              className={isActiveTabHandler('sign-up')}
              onClick={switchTabHandler.bind(null, '/auth?tab=sign-up')}
            >
              Sign up
            </button>
          </li>
        </ul>
      </menu>

      <AnimatePresence mode="wait">
        <motion.div
          className="tab-content"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <AnimatePresence>{children}</AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  &.tab {
    & {
      background: var(--white);
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    }

    & .tab-header {
      padding: 0;
      margin: 0;
    }

    .tab-lists li button.active {
      background: #64748b;
    }

    & .tab-content {
      padding: 20px;
      width: calc(375px - 40px); // sum of tab with button
      height: auto;
    }

    .tab-lists {
      margin: 0;
      display: flex;
    }

    .tab-lists li button {
      width: calc(375px / 2);
      height: 52px;

      border: none;
      outline: none;
      font-size: 18px;
      color: var(--white);
      background: var(--gray);
      text-transform: uppercase;
      font-family: 'Nunito', sans-serif;
      cursor: pointer;
    }
    .tab-lists li button:hover {
      background: #475569;
    }

    @media (min-width: 768px) {
      & .tab-content {
        padding: 20px;
        width: 480px;
        height: auto;
      }

      .tab-lists li button {
        width: calc(520px / 2);
        height: 48px;
      }
    }

    @media (min-width: 1024px) {
      /* .tab-lists li button {
        width: calc(750px / 2);
        height: 52px;
      } */
    }
  }
`;

export default Tab;
