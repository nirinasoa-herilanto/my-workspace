import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useAppStore } from '@project/store/use-app-store';

import { AuthForm } from '@project/components';

/**
 * ## Forgot password page
 */
const ForgotPasswordPage = () => {
  const {
    auth: { forgotPassword },
  } = useAppStore();

  const submitForgotPasswordHandler = async (email: string) => {
    await forgotPassword(email);
    console.log('Forgot password instruction sended 😃');
  };

  return (
    <ForgotPasswordWrapper className="forgot-password">
      <Link to={`/auth?tab=sign-in`}>Cancel</Link>
      <AuthForm
        title="Forgot password"
        message="Please provide your email in order to complete the operation 😃."
        onAuthSubmit={submitForgotPasswordHandler}
        isForgotPassword
      />
    </ForgotPasswordWrapper>
  );
};

const ForgotPasswordWrapper = styled.section`
  &.forgot-password {
    & {
      /* width: 100%; */
      min-height: 100dvh;
      padding: 50px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    & a {
      font-size: 18px;
      font-weight: bold;
      color: var(--red-600);
    }
  }
`;

export default ForgotPasswordPage;
