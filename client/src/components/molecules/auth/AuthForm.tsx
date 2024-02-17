import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useInput } from '@project/hooks';

import {
  Button,
  Input,
  InputPassword,
  Loading,
  SocialConnection,
} from '@project/components';
// import { HTMLMotionProps,  } from 'framer-motion';

export type AuthFormProps = {
  className?: string;
  title?: string;
  message?: string;
  emailForSignup?: string;
  isLogin?: boolean;
  isSignup?: boolean;
  isForgotPassword?: boolean;
  showPassword?: boolean;
  disabledEmail?: boolean;
  displaySocialConnection?: boolean;
  onAuthSubmit: (email: string, password: string) => Promise<void>;
};

/**
 * #### AuthForm component
 *
 * Use to display user auth form on the UI.
 *
 * *Only used `title` and `message` props, if we want to display some information on the UI*
 *
 * - **login**, enable `isLogin`, `showPassword` props.
 * - **signup**, enable `isSignup` props.
 * - **forgot password**, enable `isForgotPassword` props.
 * - **complete registration**, enable `disabledEmail`, `emailForSignup` props.
 * - **social connection**, depends on our specific needs. We can enable it with `displaySocialConnection` props.
 *
 *
 */
const AuthForm: React.FC<AuthFormProps> = ({
  className,
  title = '',
  message = '',
  emailForSignup = '',
  isLogin = false,
  isSignup = false,
  isForgotPassword = false,
  showPassword = false,
  disabledEmail = false,
  displaySocialConnection = false,
  onAuthSubmit,
}) => {
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);

  const {
    value: enteredEmail,
    warningMessage: emailWarningMessage,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: isValidEmail,
    resetInputHandler: resetEmailHandler,
  } = useInput({
    warningMessage: `Please provide a valid email address`,
    validateInputFn: (value) => value.includes('@'),
  });

  const {
    value: enteredPassword,
    warningMessage: passwordWarningMessage,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValid: isValidPassword,
    resetInputHandler: resetPasswordHandler,
  } = useInput({
    warningMessage: `Password can not be empty!`,
    validateInputFn: (value) => value.length !== 0,
  });

  let validForm: boolean = false;

  // signup form validation
  if (isSignup && isValidEmail) {
    validForm = true;
  }

  // forgot password form validation
  if (isForgotPassword && isValidEmail) {
    validForm = true;
  }

  // signup form validation
  if (
    emailForSignup?.length !== 0 &&
    emailForSignup?.includes('@') &&
    isValidPassword
  ) {
    validForm = true;
  }

  // login form validation
  if (isValidEmail && isValidPassword) {
    validForm = true;
  }

  const submitAuthHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validForm) return;
    setIsLoadingForm(true);

    if (isSignup) {
      // for signup submit handler
      await onAuthSubmit(enteredEmail, '');
    } else if (emailForSignup) {
      // for complete registration submit handler
      await onAuthSubmit(emailForSignup, enteredPassword);
    } else if (isForgotPassword) {
      // for forgot password submit handler
      await onAuthSubmit(enteredEmail, '');
    } else {
      // for login submit handler
      await onAuthSubmit(enteredEmail, enteredPassword);
    }

    // reset loading & input state
    resetEmailHandler();
    resetPasswordHandler();
    setIsLoadingForm(false);
  };

  return (
    <AuthFormWrapper className={`auth-form ${className || ''}`}>
      <div className="auth-form__header">
        {title.length !== 0 && <h2>{title}</h2>}
        {message.length !== 0 && <p>{message}</p>}
      </div>

      <form onSubmit={submitAuthHandler}>
        <Input
          type="email"
          name="email"
          htmlFor="email"
          labelFor="Email"
          value={enteredEmail || emailForSignup}
          hasError={emailHasError}
          warningMessage={emailWarningMessage}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          placeholder="example@mail.com"
          disabled={disabledEmail}
        />

        {showPassword && (
          <InputPassword
            labelFor="Password"
            value={enteredPassword}
            hasError={passwordHasError}
            warningMessage={passwordWarningMessage}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            placeholder="Enter you password here"
          />
        )}

        {isLogin && (
          <div className="forgot-password">
            <Link to={'forgot-password'}>Forgot password?</Link>
          </div>
        )}

        {isLoadingForm ? (
          <Loading className="auth-loading" />
        ) : (
          <Button
            className="auth-btn auth-btn__form"
            type="submit"
            whileTap={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 500 }}
            disabled={!validForm}
          >
            Continue
          </Button>
        )}
      </form>

      {displaySocialConnection && <SocialConnection />}
    </AuthFormWrapper>
  );
};

const AuthFormWrapper = styled.div`
  &.auth-form {
    & {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .auth-form__header h2 {
      text-align: center;
    }
    .auth-form__header p {
      color: var(--gray);
      text-align: left;
    }

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

    .auth-loading {
      margin: 36px;

      display: flex;
      justify-content: center;
    }

    .forgot-password {
      margin: 12px;
      text-align: right;
    }
    .forgot-password a {
      color: var(--red-600);
    }

    @media (min-width: 768px) {
    }
  }
`;

export default AuthForm;
