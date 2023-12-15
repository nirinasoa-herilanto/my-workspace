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
    & {
      padding: 50px;

      display: flex;
      flex-direction: column;
      gap: 50px;
    }

    & p {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }

    .summary__image {
      width: 100%;
      height: inherit;
    }

    @media (min-width: 768px) {
      & {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
      }

      & p {
        max-width: 482px;
      }

      .summary__image {
        width: 500px;
        height: inherit;
      }
    }

    @media (min-width: 1024px) {
    }
  }
`;

export default Summary;
