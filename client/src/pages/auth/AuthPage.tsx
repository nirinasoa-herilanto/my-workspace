import { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useAppStore } from '@project/store/use-app-store';

import { Button, PublicRoute } from '@project/components';

const AuthPage = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [searchParams] = useSearchParams();
  const tabValue = searchParams.get('tab');

  const {
    auth: { loginWithGoogle, sendSignupLinkTo, loginWithEmailAndPassword },
  } = useAppStore();

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await loginWithEmailAndPassword(enteredEmail, enteredPassword);
    console.log('Login successful 😃');
  };

  const submitSignupHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await sendSignupLinkTo(enteredEmail);
    console.log('Sign-up link sended successful 😃');
  };

  return (
    <PublicRoute>
      <AuthPageWrapper className="auth">
        {tabValue === 'login' && (
          <div>
            <h1>Signin to the app 😃</h1>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                  placeholder="example@mail.com"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={enteredPassword}
                  onChange={passwordChangeHandler}
                  placeholder="Your password"
                />
              </div>

              <Button type="submit">Log in</Button>
            </form>

            <br />
            <br />
            <br />

            <Button
              whileTap={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 500 }}
              onClick={loginWithGoogle}
            >
              Continue with Google
            </Button>
          </div>
        )}

        {tabValue === 'signup' && (
          <div>
            <h1>Sign up to the app 😃</h1>
            <form onSubmit={submitSignupHandler}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                  placeholder="example@mail.com"
                />
              </div>

              <Button type="submit">Sign up</Button>
            </form>

            <br />
            <br />
            <br />
            <Button onClick={loginWithGoogle}>Continue with Google</Button>
          </div>
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
