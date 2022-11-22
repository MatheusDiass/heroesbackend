import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HeroResolver, FavoriteResolver } from './resolvers';

export const setupApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [HeroResolver, FavoriteResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  return new ApolloServer({
    schema,
  });
};
