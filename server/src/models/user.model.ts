import { Model, Schema, HydratedDocument, model } from 'mongoose';

import { IImage } from '@project/utils';

interface IUser {
  username: string;
  email: string;
  title: string;
  summary: string;
  image: IImage;
  isGuest: boolean;
  isConnected: boolean;
  isDeleted: boolean; // if user delete his account
}

interface IUserMethods {}

interface UserModel extends Model<IUser, {}, IUserMethods> {}

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
      url: {
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
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

userSchema.index({ username: 'text' });

/**
 * User model
 */
const User = model<IUser, UserModel>('User', userSchema);

export default User;
