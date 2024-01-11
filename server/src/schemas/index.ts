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
