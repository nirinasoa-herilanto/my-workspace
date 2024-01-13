import { Request } from 'express';
import { Model, Schema, HydratedDocument, model } from 'mongoose';

import { appConfig } from '@project/config';

import { IImage } from '@project/utils';

import { authCheck } from '@project/auth';

export interface IUser {
  username: string;
  email: string;
  title: string;
  summary: string;
  image: IImage;
  isGuest: boolean;
  isConnected: boolean;
  isDeleted: boolean; // if user delete his account
}

// instance methods interface
interface IUserMethods {
  isAdminUser(): boolean;
}

// statics interface
interface UserModel extends Model<IUser, {}, IUserMethods> {
  checkUserAccount(
    req: Request
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: [true, 'Username can not be empty!'],
      unique: true,
    },
    email: {
      type: String,
      required: [
        true,
        "User's email can not be empty. Please provide your email.",
      ],
      index: true,
      unique: true,
    },
    title: {
      type: String,
      default: 'Guest',
    },
    summary: String,
    image: {
      link: {
        type: String,
        default:
          'https://res.cloudinary.com/nhr/image/upload/v1704893029/images/profile.png',
      },
      alt: {
        type: String,
        default: 'profile',
      },
    },
    isGuest: {
      type: Boolean,
      default: false,
    },
    isConnected: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

userSchema.index({ username: 'text' });

userSchema.methods.isAdminUser = function () {
  return this.email.toString() === appConfig.adminUser.toString();
};

/**
 * Use to find `user` and check his account if it's not deleted yet.
 * @returns user
 */
userSchema.statics.checkUserAccount = async function (req: Request) {
  const currentUser = await authCheck(req);

  const user = await this.findOne({ email: currentUser.email })
    .select('+isDeleted')
    .exec();

  // console.log(user);

  if (!user) {
    throw new Error(
      `Account not found! Sign up for free or contact our agent 😃.`
    );
  }

  if (user.isDeleted) {
    throw new Error(
      `It seems that your account is closed. To reopen your account, please send us your report 😃.`
    );
  }

  return user;
};

/**
 * User model
 */
const User = model<IUser, UserModel>('User', userSchema);

export default User;
