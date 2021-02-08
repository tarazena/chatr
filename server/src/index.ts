/** Setup envs for local development */

import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { PrismaClient } from "./prisma-generated";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";

const app = express();

const httpServer = http.createServer(app);

httpServer.listen(8020);

const db = new PrismaClient();

/** Instantiate Apollo Server */
async function server() {
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
  console.log("Go to http://localhost:8020/graphql to run queries!");
}

try {
  server();
} catch (e) {
  throw e;
}
