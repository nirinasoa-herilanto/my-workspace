import { useEffect, useState } from 'react';

import { useAppStore } from '@project/store/use-app-store';
import { Button } from '@project/components';
import { useNavigate } from 'react-router-dom';

const CompleteRegistrationPage = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const navigate = useNavigate();

  const {
    auth: { signupWithEmailAndPassword },
  } = useAppStore();

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await signupWithEmailAndPassword(enteredPassword);

    navigate('/workspace');
  };

  useEffect(() => {
    const email = localStorage.getItem('emailForSignIn');

    email && setEnteredEmail(email);
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          placeholder="example@mail.com"
          disabled
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
  );
};

export default CompleteRegistrationPage;
