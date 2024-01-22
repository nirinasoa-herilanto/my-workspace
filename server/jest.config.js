/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '@project/(.*)': '<rootDir>/src/$1',
  },
  preset: '@shelf/jest-mongodb',
};
