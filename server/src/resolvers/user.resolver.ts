import { Request } from 'express';
import { Types } from 'mongoose';

import { authCheck } from '@project/auth';

import { IResults, ICustomInput, catchAsyncHandler } from '@project/utils';

import { IUser, User } from '@project/models';

interface IPagination {
  page: number;
  limit: number;
}

interface IDeleteUserInput {
  userId: Types.ObjectId[];
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
 */
export const allUsers = catchAsyncHandler<IResults<IUser[]>>(
  async (
    parent: any,
    args: ICustomInput<IPagination>,
    { req }: { req: Request }
  ) => {
    const currentPage = args.input.page || 1;
    const limitRes = args.input.limit || 10;

    await restrictToAdmin(req);

    const totalUsers = await User.find()
      .select('+isDeleted')
      .where({ isDeleted: { $ne: true } })
      .countDocuments();

    const allUsers = await User.find()
      .select('+isDeleted')
      .where({ isDeleted: { $ne: true } })
      .skip((currentPage - 1) * limitRes)
      .limit(limitRes)
      .exec();

    const results = {
      page: currentPage,
      limit: limitRes,
      total: totalUsers,
      data: allUsers,
    };

    return results;
  }
);

/**
 * Use to view user profile
 */
export const viewMyProfile = catchAsyncHandler<IUser>(
  async (parent: any, args: any, { req }: { req: Request }) => {
    const profile = await User.checkUserAccount(req);

    return profile;
  }
);

/**
 * Use to switch user connection mode if `connected` or not
 * @todo done
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
 */
export const deleteUser = catchAsyncHandler<IUser[]>(
  async (
    parent: any,
    args: ICustomInput<IDeleteUserInput>,
    { req }: { req: Request }
  ) => {
    const inputIds = args.input.userId;

    await restrictToAdmin(req);

    // check if it is a valid ID
    const isValid = inputIds.every((id) => Types.ObjectId.isValid(id));

    if (!isValid) {
      throw new Error('Invalid input ID! Please, verify it again 😉.');
    }

    const users = await User.find({ _id: { $in: inputIds } }).exec();

    const res = await User.deleteMany({ _id: { $in: inputIds } });

    const results = {
      total: res.deletedCount,
      data: users,
    };

    return results;
  }
);
