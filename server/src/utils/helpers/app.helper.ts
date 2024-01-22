import { GraphQLError } from 'graphql';
import { AppError } from './error.helper';

/**
 * Use to wrap a resolver function to avoid the repetition of try/catch block.
 */
export const catchAsyncHandler = <T>(fn: any) => {
  return (...rest: any): Promise<T> =>
    fn(...rest).catch((err: GraphQLError | AppError | any) => {
      throw err;
    });
};
