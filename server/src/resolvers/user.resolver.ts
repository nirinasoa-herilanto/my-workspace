import { Request } from 'express';
import { Types } from 'mongoose';

import { authCheck } from '@project/auth';

import { ICustomInput, catchAsyncHandler } from '@project/utils';

import { IUser, User } from '@project/models';

interface IPagination {
  page: number;
  limit: number;
}

interface IUserInput {
  _id?: Types.ObjectId | null;
  username: string;
  title: string;
  summary: string;
}

/**
 * Use to check `user` the current logged-in user if it's an `admin`.
 */
const restrictToAdmin = async (req: Request): Promise<IUser | null> => {
  const currentUser = await authCheck(req);
  const user = await User.findOne({ email: currentUser.email }).exec();

  const isAdmin = user?.isAdminUser();

  if (!isAdmin) {
    throw new Error(`💥 Sorry, you are not allowed to perform this action.`);
  }

  return user;
};

/**
 * Use to view all users profile
 * - reserved to `admin`
 * @todo update result response to {total: 100, page: 1, limit: 10, data: []}
 */
export const allUsers = catchAsyncHandler<IUser[]>(
  async (
    parent: any,
    args: ICustomInput<IPagination>,
    { req }: { req: Request }
  ) => {
    const currentPage = args.input.page || 1;
    const limitRes = args.input.limit || 10;

    await restrictToAdmin(req);

    const allUsers = await User.find()
      .select('+isDeleted')
      .skip((currentPage - 1) * limitRes)
      .limit(limitRes)
      .exec();

    return allUsers;
  }
);

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

/**
 * Use to delete user definitely.
 * - reserved to `admin`
 * @todo in progress
 */
export const deleteUser = catchAsyncHandler<IUser[]>(
  async (parent: any, args: any, { req }: { req: Request }) => {
    await restrictToAdmin(req);

    // check if it is a valid ID

    const users = await User.find({
      _id: { $in: ['65a285ee2329fbf9be9d998e', '659fd4562a6bf8d6e7884d4e'] },
    }).exec();

    // const results = await User.deleteMany({
    //   _id: { $in: ['65a285ee2329fbf9be9d998e', '659fd4562a6bf8d6e7884d4e'] },
    // });

    // console.log('Delete_results', results);

    return users;
  }
);
