import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { assets } from '@project/assets';

import { useAppStore } from '@project/store/use-app-store';

export type LogoProps = {
  className?: string;
};

/**
 * ### Logo component
 */
const Logo: React.FC<LogoProps> = ({ className }) => {
  const {
    theme: { currentTheme },
  } = useAppStore();

  return (
    <LogoWrapper className={`logo ${className || ''}`} to="..">
      {currentTheme !== 'dark' ? (
        <img src={assets.lightModeLogo} alt="My workspace" />
      ) : (
        <img src={assets.darkModeLogo} alt="My workspace" />
      )}
    </LogoWrapper>
  );
};

const LogoWrapper = styled(Link)`
  &.logo {
    & img {
      width: 100%;
      height: inherit;
    }
  }
`;

export default Logo;
