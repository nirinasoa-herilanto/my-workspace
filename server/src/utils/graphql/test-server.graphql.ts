import { ApolloServer } from '@apollo/server';
import { VariableValues } from '@apollo/server/dist/esm/externalTypes/graphql';

import { typeDefs } from '@project/schemas';
import { resolvers } from '@project/resolvers';

interface ITestContextValue {
  req: {
    headers: {
      authorization: string;
    };
  };
}

// Test Apollo server instance
const testServer = new ApolloServer<ITestContextValue>({
  typeDefs,
  resolvers,
});

/**
 * An abstraction of `executeOperation` function.
 * - used for testing query and mutation
 */
export const executeTestOperation = async <T>({
  query,
  variables,
  accessToken,
}: {
  query: string;
  variables?: VariableValues;
  accessToken: string;
}) => {
  const response = await testServer.executeOperation<T>(
    {
      query,
      variables,
    },
    {
      contextValue: {
        req: {
          headers: {
            authorization: accessToken,
          },
        },
      },
    }
  );

  return response;
};
