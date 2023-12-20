import React, { useState } from 'react';
import styled from 'styled-components';

import { useAppStore } from '@project/store/use-app-store';

import { Button, Loading } from '@project/components';

export type SocialConnectionProps = {
  className?: string;
};

/**
 * #### SocialConnection component
 * Use to display all social connection button like Google, Facebook, more
 *
 * Connection's provider available:
 * - Google
 */
const SocialConnection: React.FC<SocialConnectionProps> = ({ className }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const {
    auth: { loginWithGoogle },
  } = useAppStore();

  const googleConnectionHandler = async () => {
    setIsGoogleLoading(true);
    await loginWithGoogle();
    setIsGoogleLoading(false);
  };

  let content = <Loading className="auth-loading" />;

  if (!isGoogleLoading) {
    content = (
      <Button
        className="auth-btn auth-btn__social"
        whileTap={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 500 }}
        onClick={googleConnectionHandler}
      >
        Continue with Google
      </Button>
    );
  }

  return (
    <SocialConnectionWrapper className={`social-connection ${className || ''}`}>
      <p style={{ textAlign: 'center' }}>or</p>
      <>{content}</>
    </SocialConnectionWrapper>
  );
};

const SocialConnectionWrapper = styled.div`
  &.social-connection {
    .auth-btn:disabled {
      cursor: not-allowed;
    }
    .auth-btn {
      width: 100%;
      height: inherit;
      font-size: 18px;
    }

    .auth-btn__form {
      margin-top: 16px;
    }
    .auth-btn__social {
      background: #4caf50;
    }

    .auth-loading {
      margin: 36px;

      display: flex;
      justify-content: center;
    }
  }
`;

export default SocialConnection;
