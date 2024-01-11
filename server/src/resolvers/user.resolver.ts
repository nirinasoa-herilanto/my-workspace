import { Request } from 'express';
import { Types } from 'mongoose';

import { authCheck } from '@project/auth';

import { ICustomInput, catchAsyncHandler } from '@project/utils';

import { User } from '@project/models';

interface IUserInput {
  _id?: Types.ObjectId | null;
  username: string;
  title: string;
  summary: string;
}

/**
 * Use to view user profile
 * @todo done
 */
export const viewMyProfile = catchAsyncHandler(
  async (parent: any, args: any, { req }: { req: Request }) => {
    const currentUser = await authCheck(req);

    const profile = await User.findOne({ email: currentUser.email }).exec();

    if (!profile) {
      throw new Error(
        `Account not found! Sign up for free or contact our agent 😃.`
      );
    }

    // TODO, check if the user hasn't deleted his account yet. `isDeleted: true`

    return profile;
  }
);

/**
 * Use to switch user connection mode if `connected` or not
 */
export const switchConnectionMode = catchAsyncHandler(
  async (
    parent: any,
    args: ICustomInput<'active' | 'inactive'>,
    { req }: { req: Request }
  ) => {
    const currentUser = await authCheck(req);

    const user = await User.findOne({ email: currentUser.email }).exec();

    if (!user) {
      throw new Error(
        `Account not found! Sign up for free or contact our agent 😃.`
      );
    }

    // TODO, check if the user hasn't deleted his account yet. `isDeleted: true`

    let userMode = true;

    if (args.input === 'inactive') {
      userMode = false;
    }

    user.isConnected = userMode;
    await user.save();

    return user;
  }
);

/**
 * Use to add new user
 * @todo done
 */
export const addNewUser = catchAsyncHandler<{ email: string }>(
  async (parent: any, args: any, { req }: { req: Request }) => {
    const currentUser = await authCheck(req);

    const existingUser = await User.findOne({
      email: currentUser.email,
    }).exec();

    // TODO, check if the user hasn't deleted his account yet. `isDeleted: true`

    if (existingUser) {
      // switch user connection to be `active` mode
      existingUser.isConnected = true;
      await existingUser.save();

      return existingUser;
    }

    return User.create({
      username: `user-${Date.now()}`,
      email: currentUser.email,
    });
  }
);

/**
 * Use to update user information
 *  - @todo done
 */
export const updateUserAccount = catchAsyncHandler(
  async (
    parent: any,
    args: ICustomInput<IUserInput>,
    { req }: { req: Request }
  ) => {
    const currentUser = await authCheck(req);

    const prevUser = await User.findOne({ email: currentUser.email }).exec();

    // TODO, check if the user hasn't deleted his account yet. `isDeleted: true`

    if (prevUser?.email.toString() !== currentUser.email?.toString()) {
      throw new Error(`
        Sorry, you are not allowed to update the information on this account.
      `);
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: prevUser?._id },
      {
        ...args.input,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedUser;
  }
);

/**
 * Use to delete user by disabling his account
 * - @todo done
 */
export const disableUserAccount = catchAsyncHandler(
  async (parent: any, args: any, { req }: { req: Request }) => {
    const currentUser = await authCheck(req);

    const prevUser = await User.findOne({ email: currentUser.email }).exec();

    // TODO, check if the user hasn't deleted his account yet. `isDeleted: true`

    if (prevUser?.email.toString() !== currentUser.email?.toString()) {
      throw new Error(`
        Sorry, you are not allowed to update the information on this account.
      `);
    }

    if (prevUser) {
      prevUser.isDeleted = true;
      await prevUser.save();
    }

    return prevUser;
  }
);
