import { Request } from 'express';
import { Types } from 'mongoose';

import { authCheck } from '@project/auth';

import { ICustomInput, catchAsyncHandler } from '@project/utils';

import { User } from '@project/models';
import { IUser, User } from '@project/models';

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
export const viewMyProfile = catchAsyncHandler<IUser>(
  async (parent: any, args: any, { req }: { req: Request }) => {
    const profile = await User.checkUserAccount(req);

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
    const user = await User.checkUserAccount(req);

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
export const addNewUser = catchAsyncHandler<IUser>(
  async (parent: any, args: any, { req }: { req: Request }) => {
    const currentUser = await authCheck(req);
    const existingUser = await User.findOne({
      email: currentUser.email,
    }).exec();

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
export const updateUserAccount = catchAsyncHandler<IUser>(
  async (
    parent: any,
    args: ICustomInput<IUserInput>,
    { req }: { req: Request }
  ) => {
    const currentUser = await authCheck(req);
    const prevUser = await User.checkUserAccount(req);

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
export const disableUserAccount = catchAsyncHandler<IUser>(
  async (parent: any, args: any, { req }: { req: Request }) => {
    const currentUser = await authCheck(req);
    const prevUser = await User.checkUserAccount(req);

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
