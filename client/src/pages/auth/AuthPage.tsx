import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useAppStore } from '@project/store/use-app-store';

import { AuthForm, PublicRoute } from '@project/components';

/**
 * ## Auth page
 * @todo updating AuthForm with tabs
 */
const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const tabValue = searchParams.get('tab');

  const {
    auth: { loginWithEmailAndPassword, sendSignupLinkTo },
  } = useAppStore();

  const submitLoginHandler = async (email: string, password: string) => {
    await loginWithEmailAndPassword(email, password);
  };

  const submitSignupHandler = async (email: string) => {
    await sendSignupLinkTo(email);
  };

  return (
    <PublicRoute>
      <AuthPageWrapper className="auth">
        {tabValue === 'login' && (
          <AuthForm
            title="Sign in to My workspace"
            displaySocialConnection
            onAuthSubmit={submitLoginHandler}
          />
        )}

        {tabValue === 'signup' && (
          <AuthForm
            title="Sign up to My workspace"
            isSignup
            onAuthSubmit={submitSignupHandler}
            displaySocialConnection
          />
        )}
      </AuthPageWrapper>
    </PublicRoute>
  );
};

const AuthPageWrapper = styled.section`
  &.auth {
    & {
      width: 100%;
      min-height: 100dvh;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default AuthPage;
