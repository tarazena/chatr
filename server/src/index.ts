/** Setup envs for local development */

import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { PrismaClient } from "./prisma-generated";
import { typeDefs } from "./typedefs";
import { resolvers } from "./resolvers";

const PORT = 8020;

/** Instantiate Apollo Server */
async function server() {
  const app = express();

  const httpServer = http.createServer(app);
  httpServer.listen(PORT);

  const db = new PrismaClient();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({
      request: req,
      db,
    }),
  });

  apolloServer.applyMiddleware({ app, path: "/graphql" });
  apolloServer.installSubscriptionHandlers(httpServer);
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
  );
}

try {
  server();
} catch (e) {
  throw e;
}
