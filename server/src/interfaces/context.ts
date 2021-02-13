import { PrismaClient } from "@prisma-generated";
import { Request } from "express";
import { PubSub } from "graphql-subscriptions";

export interface Context {
  db: PrismaClient;
  request: Request;
  pubSub: PubSub;
}
