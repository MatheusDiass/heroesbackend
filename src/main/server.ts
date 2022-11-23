import { configEnvironmentVariable } from './config';
import express, { Express } from 'express';
import { createRoutes } from './config';
import { setupApolloServer } from './graphql/apollo-server';

export const setupApp = async (): Promise<Express> => {
  //Configure environment variables
  configEnvironmentVariable();

  //Create express app
  const app = express();

  //Create routes
  const router = express.Router();
  createRoutes(router);

  //Config
  app.use(express.json());
  app.use(router);

  //Add apollo server in express
  const apolloServer = await setupApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  return app;
};
