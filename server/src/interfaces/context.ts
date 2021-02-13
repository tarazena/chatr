import { PrismaClient } from "@prisma-generated";
import { Request } from "express";

export interface Context {
  db: PrismaClient;
  request: Request;
}
