require('module-alias/register');
import dotenv from 'dotenv';

process.on('uncaughtException', (error) => {
  console.log('💥 UNCAUGHT EXCEPTION ERROR 💥', error?.message);

  process.exit(1);
});

dotenv.config();

import http from 'http';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { appConfig } from '@project/config';

import app from '@project/app';

import { typeDefs } from '@project/schemas';
import { resolvers } from '@project/resolvers';

const httpServer = http.createServer(app);

// Database connection
const databaseConnectionHandler = async () => {
  try {
    await mongoose.connect(appConfig.databaseLocal!);

    console.log(`DB connected 😀`);
  } catch (error: any) {
    console.log(`💥 DB connection failed: ${error?.message}`);
  }
};

// Apollo Server connection
const apolloServerConnectionHandler = async (
  typeDefs: string,
  resolvers: any
) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req }),
    })
  );
};

databaseConnectionHandler();
apolloServerConnectionHandler(typeDefs, resolvers);

// Server connection
const server = app.listen(appConfig.port, () => {
  console.log(
    `Server is running on port http://localhost:${appConfig.port}/api/v1`
  );
  console.log(
    `Graphql server is running on port http://localhost:${appConfig.port}/graphql`
  );
});

process.on('unhandledRejection', (error: Error) => {
  console.log('💥 UNHANDLED REJECTION ERROR 💥', error?.message);

  server.close(() => process.exit(1));
});
