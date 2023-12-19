import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  isSignup?: boolean;
  disabledEmail?: boolean;
  displaySocialConnection?: boolean;
  onAuthSubmit: (email: string, password: string) => Promise<void>;
};

/**
 * #### AuthForm component
 * Use to display user auth form on the UI:
 * - login
 * - signup
 * - complete registration
 * @todo refactor
 */
const AuthForm: React.FC<AuthFormProps> = ({
  className,
  title,
  isSignup = false,
  disabledEmail = false,
  displaySocialConnection = false,
  onAuthSubmit,
}) => {
  const [emailStorage, setEmailStorage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    value: enteredEmail,
    warningMessage: emailWarningMessage,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: isValidEmail,
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
  } = useInput({
    warningMessage: `Password can not be empty!`,
    validateInputFn: (value) => value.length !== 0,
  });

  let validForm: boolean = false;

  if (isSignup && isValidEmail) {
    validForm = true;
  }

  if (emailStorage && isValidPassword) {
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
      await onAuthSubmit(enteredEmail, '');
    } else if (emailStorage) {
      await onAuthSubmit(enteredEmail, enteredPassword);
    } else {
      await onAuthSubmit(enteredEmail, enteredPassword);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const email = localStorage.getItem('emailForSignIn');

    email && setEmailStorage(email);
  }, []);

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
          value={enteredEmail || emailStorage}
          hasError={emailHasError}
          warningMessage={emailWarningMessage}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          placeholder="example@mail.com"
          disabled={disabledEmail || emailStorage.length !== 0}
        />

        {!isSignup && (
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

    @media (min-width: 768px) {
      & {
        width: 500px;
        height: auto;
      }
    }
  }
`;

export default AuthForm;
