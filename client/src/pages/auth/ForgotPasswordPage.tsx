import styled from 'styled-components';

import { useAppStore } from '@project/store/use-app-store';

import { AuthForm, PublicRoute } from '@project/components';

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
    <PublicRoute>
      <ForgotPasswordWrapper className="forgot-password">
        <AuthForm
          title="Forgot password"
          onAuthSubmit={submitForgotPasswordHandler}
          isForgotPassword
        />
      </ForgotPasswordWrapper>
    </PublicRoute>
  );
};

const ForgotPasswordWrapper = styled.section`
  &.forgot-password {
    & {
      width: 100%;
      min-height: 100dvh;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default ForgotPasswordPage;
