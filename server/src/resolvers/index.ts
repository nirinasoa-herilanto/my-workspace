import { DateTimeResolver } from 'graphql-scalars';

import { welcoming } from './app.resolver';
import {
  viewMyProfile,
  addNewUser,
  updateUserAccount,
  switchConnectionMode,
  disableUserAccount,
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
  },
  Mutation: {
    addNewUser,
    updateUserAccount,
    switchConnectionMode,
    disableUserAccount,
  },
};
