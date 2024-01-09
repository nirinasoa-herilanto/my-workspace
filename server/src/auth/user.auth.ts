import { Request, Response, NextFunction } from 'express';
import admin, { ServiceAccount } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import serviceAccount from '../firebase-admin/firebase-admin.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

// use to get user access token from headers
const getUserToken = (req: Request): string => {
  const accessToken = req.headers.authorization;
  const token = accessToken?.replace('Bearer ', '') as string;

  return token;
};

/**
 * #### authCheck
 * A middleware allows us to get the current user logged in to the application.
 *
 * - Used on resolver function (.i.e. on Graphql API)
 *
 * @returns DecodedIdToken, an user information parsed by Firebase admin
 */
export const authCheck = async (req: Request): Promise<DecodedIdToken> => {
  try {
    const token = getUserToken(req);

    const currentUser = await admin.auth().verifyIdToken(token);

    console.log('😃 current user', currentUser);

    return currentUser;
  } catch (error) {
    throw new Error('💥 Invalid or expire token!');
  }
};

/**
 * #### authCheckMiddleware
 * A middleware allows us to check if the current user logged in to the application is allowed to perform certain actions.
 *
 * - Used on Rest API
 *
 */
export const authCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getUserToken(req);

    await admin.auth().verifyIdToken(token);

    // check user identity

    next();
  } catch (error) {
    res.status(401).json({
      status: 'Unauthorized',
      message: '💥 Invalid or expire token!',
    });
  }
};
