import React, { useState } from 'react';
import styled from 'styled-components';

import { AnimatePresence, motion } from 'framer-motion';

export type TabNavType = {
  item: string;
  link: string;
};

export type TabAttrStyleProps = {
  ['$tab-lengths']: number;
  ['$tab-width']: number;
};

export type TabProps = {
  className?: string;
  activeTab?: string;
  tabNavData: TabNavType[];
  onSelect: (select: string) => void;
  children: React.ReactNode;
} & Omit<TabAttrStyleProps, '$tab-lengths'>;

/**
 * Use to display tab element on the UI.
 * - Already animated by `framer motion`.
 *
 * **Tab Props**
 * @param activeTab  optional, but we can use it to set a default active tab
 * @param tabNavData  your tab navigation items data
 * @param $tab-width  will be applied on tablet screen `768px`, example `$tab-width={520}`
 * @param onSelect    a method for switching on each tabs
 *
 */
const Tab: React.FC<TabProps> = ({
  className,
  activeTab = '',
  tabNavData,
  onSelect,
  children,
  ...rest
}) => {
  const [activeTabItem, setActiveTabItem] = useState<string>(activeTab);

  const isActiveTabHandler = (item: string): string => {
    return activeTabItem === item ? 'active' : '';
  };

  const switchTabHandler = (selectTab: string) => {
    setActiveTabItem(selectTab);
    onSelect(selectTab);
  };

  return (
    <TabWrapper
      className={`tab ${className || ''}`}
      $tab-lengths={tabNavData.length}
      {...rest}
    >
      <menu className="tab-header">
        <ul className="tab-lists">
          {tabNavData.map((tab) => (
            <li key={tab.item}>
              <button
                className={isActiveTabHandler(tab.link)}
                onClick={switchTabHandler.bind(null, tab.link)}
              >
                {tab.item}
              </button>
            </li>
          ))}
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

const TabWrapper = styled.div<TabAttrStyleProps>`
  &.tab {
    & {
      padding-left: 20px;
      padding-right: 20px;

      /* box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1); */
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
      width: calc(100% - 40px);
      height: auto;
      background: var(--white);
    }

    .tab-lists {
      margin: 0;
      display: flex;
      flex-direction: column;
    }

    .tab-lists li button {
      width: 100%;
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
      & {
        padding: 0;
      }

      .tab-lists {
        display: flex;
        flex-direction: row;
      }

      .tab-lists li button {
        /* width: calc(520px / 3); // tab item length */
        width: ${(props) =>
          `calc(${props['$tab-width']}px / ${props['$tab-lengths']})`};
        height: 48px;
      }

      & .tab-content {
        /* width: calc(520px - 40px); */
        width: ${(props) => `calc(${props['$tab-width']}px - 40px)`};
        height: auto;
      }
    }

    @media (min-width: 1024px) {
    }
  }
`;

export default Tab;
