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

  # FORMATTED DATA RESPONSE
  type UserResponse {
    page: Int!
    limit: Int!
    total: Int!
    data: [User]!
  }

  type DeleteUserResponse {
    total: Int
    data: [User]!
  }

  # INPUT
  input UpdateUserInput {
    username: String
    title: String
    summary: String
  }

  input DeleteUserInput {
    userId: [ID!]
  }

  # QUERY
  type Query {
    viewMyProfile: User!
    allUsers(input: Pagination!): UserResponse!
  }

  # MUTATION
  type Mutation {
    addNewUser: User!
    switchConnectionMode(input: ConnectionMode!): User!
    updateUserAccount(input: UpdateUserInput!): User!
    disableUserAccount: User!
    deleteUser(input: DeleteUserInput!): DeleteUserResponse!
  }
`;
