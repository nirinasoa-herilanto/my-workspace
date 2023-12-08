export const appSchema = `
  type Welcoming {
    message: String
  }

  type Query {
    welcoming: Welcoming!
  }
`;
