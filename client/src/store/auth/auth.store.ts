import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '@project/config';

import { FirebaseAuthApp } from '@project/services';

export type AuthStoreType = {
  user: User | null;
  logout: () => Promise<void>;
  sendSignupLinkTo: (email: string) => Promise<void>;
  signupWithEmailAndPassword: (password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
};

const firebaseAuthApp = new FirebaseAuthApp(auth);

/**
 * Use to handle user authentication
 */
export const useAuthStore = () => {
  const [user, setUser] = useState<User | null>(null);

  /**
   * Use to send signup link to user email
   */
  const sendSignupLinkTo = async (email: string) => {
    await firebaseAuthApp.sendSignupLinkToUser(email);
  };

  const signupWithEmailAndPassword = async (password: string) => {
    const user = await firebaseAuthApp.signupWithEmailAndPassword(password);
    user && setUser(user);
  };

  /**
   * Use to connect on the app by email & password
   */
  const loginWithEmailAndPassword = async (email: string, password: string) => {
    const user = await firebaseAuthApp.loginWithEmailAndPassword(
      email,
      password
    );
    user && setUser(user);
  };

  /**
   * Use to connect with Google account
   */
  const loginWithGoogle = async () => {
    const user = await firebaseAuthApp.signinWithGoogleAccount();
    user && setUser(user);
  };

  /**
   * Use to logout from the app
   */
  const logout = async () => {
    await firebaseAuthApp.logout();
    localStorage.removeItem('accessToken');
    redirect('/');
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unSubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);

        localStorage.setItem('accessToken', `Bearer ${user.accessToken}`);
      } else {
        setUser(null);
        localStorage.removeItem('accessToken');
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return {
    user,
    logout,
    loginWithGoogle,
    sendSignupLinkTo,
    signupWithEmailAndPassword,
    loginWithEmailAndPassword,
  } as AuthStoreType;
};
