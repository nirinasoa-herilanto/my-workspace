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

export type AuthFormProps = {
  className?: string;
  title: string;
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
 * Use to display user auth form on the UI:
 * - login
 * - signup
 * - forgot password
 * - complete registration
 * @todo refactor
 */
const AuthForm: React.FC<AuthFormProps> = ({
  className,
  title,
  emailForSignup = '',
  isLogin = false,
  isSignup = false,
  isForgotPassword = false,
  showPassword = false,
  disabledEmail = false,
  displaySocialConnection = false,
  onAuthSubmit,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  if (isSignup && isValidEmail) {
    validForm = true;
  }

  if (isForgotPassword && isValidEmail) {
    validForm = true;
  }

  if (
    emailForSignup?.length !== 0 &&
    emailForSignup?.includes('@') &&
    isValidPassword
  ) {
    validForm = true;
  }

  if (isValidEmail && isValidPassword) {
    validForm = true;
  }

  const submitAuthHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validForm) return;
    setIsLoading(true);

    if (isSignup) {
      // for signup
      await onAuthSubmit(enteredEmail, '');
    } else if (emailForSignup) {
      // for complete registration
      await onAuthSubmit(emailForSignup, enteredPassword);
    } else if (isForgotPassword) {
      // for forgot password
      await onAuthSubmit(enteredEmail, '');
    } else {
      // for login
      await onAuthSubmit(enteredEmail, enteredPassword);
    }

    resetEmailHandler();
    resetPasswordHandler();
    setIsLoading(false);
  };

  return (
    <AuthFormWrapper className={`auth-form ${className || ''}`}>
      <div className="auth-form__header">
        <h1>{title}</h1>
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
            <Link to={'/forgot-password'}>Forgot password?</Link>
          </div>
        )}

        {isLoading ? (
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
      padding: 50px;

      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .auth-form__header h1 {
      text-align: center;
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
      & {
        width: 500px;
        height: auto;
      }
    }
  }
`;

export default AuthForm;
