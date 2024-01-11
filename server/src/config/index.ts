export const appConfig = {
  port: process.env.PORT || '',
  databaseLocal: process.env.DATABASE_LOCAL || '',
  databaseUrl: process.env.DATABASE_URL || '', // MongoDB Atlas endpoints
  admin: process.env.ADMIN_USER || '',
};
