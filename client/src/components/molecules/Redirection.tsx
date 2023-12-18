import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export type RedirectionProps = {
  className?: string;
  redirectedTo: string;
};

const Redirection: React.FC<RedirectionProps> = ({
  className,
  redirectedTo,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(redirectedTo);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate, redirectedTo]);

  return (
    <RedirectionWrapper className={`redirection ${className || ''}`}>
      <h1>{`You are not allowed to access this route. Please sign-in on the application or sign-up for free 😃`}</h1>
    </RedirectionWrapper>
  );
};

const RedirectionWrapper = styled.section`
  &.redirection {
  }
`;

export default Redirection;
