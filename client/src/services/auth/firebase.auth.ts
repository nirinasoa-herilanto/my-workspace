import { appConfig, googleProvider } from '@project/config';
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
} from 'firebase/auth';

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
        url: appConfig.firebaseLinkRedirection,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      console.log('💥 Firebase send signin link error 💥', error);
      throw error;
    }
  }

  /**
   * Use to signup with email & password
   */
  async signupWithEmailAndPassword(
    password: string
  ): Promise<User | undefined> {
    try {
      if (!isSignInWithEmailLink(this.auth, window.location.href)) return;

      let email = window.localStorage.getItem('emailForSignIn') as string;

      if (!email) {
        email = window.prompt(
          'Please provide your email for confirmation'
        ) as string;
      }

      const { user } = await signInWithEmailLink(
        this.auth,
        email,
        window.location.href
      );

      window.localStorage.removeItem('emailForSignIn');

      // if (!user.emailVerified) return; // only google mail account

      await updatePassword(user, password);

      return user;
    } catch (error) {
      console.log('💥 Firebase signin with email & password error 💥', error);
      throw error;
    }
  }

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
   * Use to sign in with Google account
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
      throw error;
    }
  }
}
