import { configEnvironmentVariable } from './config';
import express, { Express } from 'express';
import { createRoutes } from './config';
import { setupApolloServer } from './graphql/apollo-server';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json';

export const setupApp = async (): Promise<Express> => {
  //Set up environment variables
  configEnvironmentVariable();

  //Create express app
  const app = express();

  //Create routes
  const router = express.Router();
  createRoutes(router);

  //Config
  app.use(express.json());
  app.use(router);

  //Set up swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  //Add apollo server in express
  const apolloServer = await setupApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  return app;
};
