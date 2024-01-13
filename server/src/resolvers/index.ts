import { DateTimeResolver } from 'graphql-scalars';

import { welcoming } from './app.resolver';
import {
  viewMyProfile,
  allUsers,
  addNewUser,
  updateUserAccount,
  switchConnectionMode,
  disableUserAccount,
  deleteUser,
} from './user.resolver';

export const resolvers = {
  DateTime: DateTimeResolver,
  ConnectionMode: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  },
  Query: {
    welcoming,
    viewMyProfile,
    allUsers,
  },
  Mutation: {
    addNewUser,
    updateUserAccount,
    switchConnectionMode,
    disableUserAccount,
    deleteUser,
  },
};
