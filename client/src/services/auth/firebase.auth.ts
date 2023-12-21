import {
  Auth,
  User,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  updatePassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  deleteUser,
} from 'firebase/auth';

import { appConfig, googleProvider } from '@project/config';

/**
 * ### FirebaseAuth
 * All about users `authentication` system.
 */
export class FirebaseAuthApp {
  constructor(public auth: Auth) {
    this.auth = auth;
  }

  /**
   * Use to send signup link
   */
  async sendSignupLinkToUser(email: string): Promise<void> {
    try {
      const actionCodeSettings = {
        url: `${appConfig.signupLinkRedirection}?emailForSignup=${email}`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
    } catch (error) {
      console.log('💥 Firebase send signin link error 💥', error);

      throw new Error(
        '💥 Something went wrong when sending signin link. Please try again.'
      );
    }
  }

  /**
   * Use to signup with email & password
   * @returns User
   */
  async signupWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | undefined> {
    try {
      if (!isSignInWithEmailLink(this.auth, window.location.href)) return;

      const { user } = await signInWithEmailLink(
        this.auth,
        email,
        window.location.href
      );

      if (!user.emailVerified) {
        await deleteUser(user); // will delete user on firebase console

        throw new Error('Please use a valid email 😉');
      }

      await updatePassword(user, password);

      return user;
    } catch (error) {
      console.log('💥 Firebase signin with email & password error 💥', error);

      throw error;
    }
  }

  /**
   * Use to login with email & password
   * @returns User
   */
  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return user;
    } catch (error) {
      console.log('💥 Firebase login with email & password error 💥', error);

      throw error;
    }
  }

  /**
   * Use to reset password in case of user forgot it
   */
  async resetPassword(email: string) {
    try {
      const actionCodeSettings = {
        url: `${appConfig.forgotPasswordLinkRedirection}`,
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(this.auth, email, actionCodeSettings);
    } catch (error) {
      console.log('💥 Reset password error 💥', error);

      throw new Error(
        `💥 Something went wrong when reseting password. Please try later 😃.`
      );
    }
  }

  /**
   * Use to sign in with Google account
   * @returns User
   */
  async signinWithGoogleAccount(): Promise<User> {
    try {
      const { user } = await signInWithPopup(this.auth, googleProvider);
      return user;
    } catch (error) {
      console.log('💥 Firebase signin with Google error 💥', error);
      throw error;
    }
  }

  /**
   * Use to logout
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.log('💥 Firebase loggout error 💥', error);
      throw new Error(
        `💥 Something went wrong when logout. Please try again 😃.`
      );
    }
  }
}
