import { Meta, StoryObj } from '@storybook/react';

import { Tab } from '@project/components';
import { useState } from 'react';

const meta = {
  component: Tab,
  tags: ['autodocs'],
} satisfies Meta<typeof Tab>;

export default meta;

type TabStory = StoryObj<typeof Tab>;

const MOCK_NAV_DATA = [
  {
    item: 'A paragraph',
    link: 'paragraph',
  },
  {
    item: 'A list',
    link: 'list',
  },
];

const DynamicTab = () => {
  const [activeTab, setActiveTab] = useState<string>('paragraph');

  const switchtTabHandler = (item: string) => {
    setActiveTab(item);
  };

  let content = <p>Navigate on each tab</p>;

  if (activeTab === 'paragraph') {
    content = (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis neque
        deserunt numquam vel dignissimos, aliquam magni nihil cupiditate! Iusto
        deleniti id eum nostrum veritatis sit quas perspiciatis dolorum nam
        blanditiis!
      </p>
    );
  }

  if (activeTab === 'list') {
    content = (
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
    );
  }

  return (
    <Tab
      tabNavData={MOCK_NAV_DATA}
      activeTab={activeTab}
      $tab-width={520}
      onSelect={switchtTabHandler}
    >
      {content}
    </Tab>
  );
};

export const Base: TabStory = {
  render: () => <DynamicTab />,
};
