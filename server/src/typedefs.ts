import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const schema = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()]
});

export const typeDefs = mergeTypeDefs([schema]);