import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useAppStore } from '@project/store/use-app-store';

import { AuthForm, Tab, Logo } from '@project/components';

/**
 * ## Auth page
 */
const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const tabValue = searchParams.get('tab')!;

  const {
    auth: { loginWithEmailAndPassword, sendSignupLinkTo },
  } = useAppStore();

  const submitLoginHandler = async (email: string, password: string) => {
    await loginWithEmailAndPassword(email, password);
  };

  const submitSignupHandler = async (email: string) => {
    await sendSignupLinkTo(email);
  };

  let tabContentElement = (
    <div className="empty-content">
      <h1>👋 Hello</h1>
      <p>
        You can switch on this tab for sign in to your account or to create a
        new account on My workspace 😉.
      </p>
    </div>
  );

  if (tabValue === 'sign-in') {
    tabContentElement = (
      <AuthForm
        title="Sign in to your account"
        onAuthSubmit={submitLoginHandler}
        displaySocialConnection
        showPassword
        isLogin
      />
    );
  }

  if (tabValue === 'sign-up') {
    tabContentElement = (
      <AuthForm
        title="Create your account for free"
        onAuthSubmit={submitSignupHandler}
        displaySocialConnection
        isSignup
      />
    );
  }

  return (
    <AuthPageWrapper className="auth">
      <Logo className="auth-logo" />

      <Tab activeTab={tabValue}>{tabContentElement}</Tab>
    </AuthPageWrapper>
  );
};

const AuthPageWrapper = styled.section`
  &.auth {
    & {
      width: 100%;
      height: auto;
      margin-top: 50px;
      margin-bottom: 50px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 50px;
    }

    & .auth-logo {
      width: 100%;
      height: inherit;
    }

    @media (min-width: 768px) {
      & .auth-logo {
        width: 350px;
        height: inherit;
      }
    }

    @media (min-width: 1024px) {
      /* & .auth-logo {
        width: 500px;
        height: inherit;
      } */
    }
  }
`;

export default AuthPage;
