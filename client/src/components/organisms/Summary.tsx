import React from 'react';
import styled from 'styled-components';

import { assets } from '@project/assets';

import { wordingConfig } from '@project/config';

import { Image } from '@project/components';

export type SummaryProps = {
  className?: string;
};

/**
 * ### Summary component
 * A brief introduction of My workspace application
 */
const Summary: React.FC<SummaryProps> = ({ className }) => {
  return (
    <SummaryWrapper className={`summary ${className || ''}`}>
      <p>{wordingConfig.summary}</p>

      <Image
        className="summary__image"
        src={assets.meetups}
        alt="team breakout room"
      />
    </SummaryWrapper>
  );
};

const SummaryWrapper = styled.section`
  &.summary {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    & p {
      width: 580px;
      height: auto;

      font-size: 22px;
      font-weight: bold;
      text-align: center;
    }

    .summary__image {
      width: 620px;
      height: inherit;
    }

    @media (min-width: 1024px) {
      & {
        padding: 52px;
      }
    }
  }
`;

export default Summary;
