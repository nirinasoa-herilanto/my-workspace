import { appSchema } from './app.schema';
import { userSchema } from './user.schema';

export const typeDefs = `
  # Scalar DateTime
  scalar DateTime

  # Enum Connection mode
  enum ConnectionMode {
    ACTIVE
    INACTIVE
  }

  # Pagination input
  input Pagination {
    page: Int
    limit: Int
  }

  # Image schema
  type Image {
    link: String
    alt: String
  }

  # App schema
  ${appSchema}

  # User schema
  ${userSchema}
`;
