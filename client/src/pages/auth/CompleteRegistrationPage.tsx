import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isSignInWithEmailLink } from 'firebase/auth';

import { auth } from '@project/config';

import { useAppStore } from '@project/store/use-app-store';

import { AuthForm, Redirection } from '@project/components';

/**
 * ## Complete registration page
 */
const CompleteRegistrationPage = () => {
  const [searchParams] = useSearchParams();
  const emailForSignup = searchParams.get('emailForSignup') as string;

  const navigate = useNavigate();

  const {
    auth: { signupWithEmailAndPassword },
  } = useAppStore();

  const submitSignupHandler = async (email: string, password: string) => {
    await signupWithEmailAndPassword(email, password);
    navigate('/workspace');
  };

  if (!isSignInWithEmailLink(auth, window.location.href)) {
    return (
      <div
        className="redirection-wrapper"
        style={{
          width: '100%',
          height: '100dvh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Redirection
          message="You are not allowed to perform this operation. Please sign-up 😃."
          redirectedTo="/auth?tab=sign-up"
        />
      </div>
    );
  }

  return (
    <CompleteRegistrationWrapper className="complete-registration">
      <AuthForm
        title="Complete registration"
        emailForSignup={emailForSignup}
        onAuthSubmit={submitSignupHandler}
        disabledEmail
      />
    </CompleteRegistrationWrapper>
  );
};

const CompleteRegistrationWrapper = styled.section`
  &.complete-registration {
    & {
      width: 100%;
      min-height: 100dvh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .signup-redirection {
      width: 100%;
      height: 100dvh;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default CompleteRegistrationPage;
