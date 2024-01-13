export const userSchema = `
  type User {
    _id: ID!
    username: String!
    email: String!
    title: String
    summary: String
    image: Image
    isGuest: Boolean
    isConnected: Boolean
    isDeleted: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }

  # INPUT
  input UpdateUserInput {
    username: String
    title: String
    summary: String
  }

  input Pagination {
    page: Int
    limit: Int
  }

  # QUERY
  type Query {
    viewMyProfile: User!
    allUsers(input: Pagination!): [User]!
  }

  # MUTATION
  type Mutation {
    addNewUser: User!
    switchConnectionMode(input: ConnectionMode!): User!
    updateUserAccount(input: UpdateUserInput!): User!
    disableUserAccount: User!
    deleteUser: [User]!
  }
`;
