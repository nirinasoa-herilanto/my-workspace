import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useAppStore } from '@project/store/use-app-store';

import { AuthForm } from '@project/components';

/**
 * ## Complete registration page
 */
const CompleteRegistrationPage = () => {
  const navigate = useNavigate();

  const {
    auth: { signupWithEmailAndPassword },
  } = useAppStore();

  const submitSignupHandler = async (email: string, password: string) => {
    await signupWithEmailAndPassword(email, password);

    navigate('/workspace');
  };

  return (
    <CompleteRegistrationWrapper className="complete-registration">
      <AuthForm
        title="Complete registration"
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
  }
`;

export default CompleteRegistrationPage;
