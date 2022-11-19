import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HeroResolver } from './resolvers/hero-resolver';

export const setupApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [HeroResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  return new ApolloServer({
    schema,
  });
};
